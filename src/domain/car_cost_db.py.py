#!/usr/bin/env python3
"""
car_cost_db.py — small SQLite “database” + monthly cost calculator for cars.

Goal:
- Store cars (purchase price, age, mileage, annual km, etc.)
- Compute clean monthly ownership cost breakdown

No external dependencies (only Python standard library).
Works on macOS + VS Code.

DISCLAIMER:
- Outputs are only as good as your inputs/assumptions.
- For used cars, depreciation is the #1 lever. If you can, enter an expected resale value.

ADD NEW CARS:

python3 car_cost_db.py add \
  --name "Porsche Boxster (10y, 70k km)" \
  --purchase 42000 \
  --age 10 \
  --mileage 70000 \
  --annual-km 8000 \
  --months-used 12 \
  --insurance 1600 \
  --maintenance 2500 \
  --road-tax 650 \
  --parking 150 \
  --energy-type petrol \
  --consumption 10.5 \
  --energy-price 1.95 \
  --horizon 5 \
  --resale 32000 \
  --oneoff-buffer 2000
"""

from __future__ import annotations
import argparse
import sqlite3
from dataclasses import dataclass, asdict
from typing import Optional, Dict, Any, Tuple
from datetime import datetime
import json
import os
import re


# -----------------------------
# Data models
# -----------------------------
@dataclass(frozen=True)
class Car:
    name: str

    # Core
    purchase_price_chf: float
    age_years: float
    mileage_km: int

    # Usage
    annual_km: int
    months_used_per_year: int = 12  # seasonal plates? set e.g. 6

    # Running costs (annual unless noted)
    insurance_chf_per_year: float = 1500.0
    maintenance_chf_per_year: float = 2000.0
    road_tax_chf_per_year: float = 650.0
    parking_chf_per_month: float = 0.0

    # Energy
    energy_type: str = "petrol"  # petrol | diesel | ev
    consumption_per_100km: float = 10.0  # L/100km for petrol/diesel; kWh/100km for EV
    energy_price_chf: float = 1.90  # CHF/L for petrol/diesel; CHF/kWh for EV

    # Tires / misc
    tyres_chf_per_year: float = 600.0
    other_fixed_chf_per_year: float = 0.0  # e.g., membership, wash plan, tolls, etc.

    # One-offs (amortized over ownership horizon)
    one_off_purchase_fees_chf: float = 0.0  # inspection, registration, dealer fees
    one_off_repairs_buffer_chf: float = 0.0  # “first year surprises”, amortized

    # Depreciation input: prefer resale_value. If unknown, use annual_depr_rate.
    ownership_horizon_years: float = 5.0
    expected_resale_value_chf: Optional[float] = None
    annual_depreciation_rate: Optional[float] = 0.06  # 6%/year fallback if resale unknown

    # Capital / financing (optional)
    # If you buy cash, you can treat opportunity cost as "capital interest".
    # If you finance, set financing_interest_rate and financed_amount.
    capital_interest_rate: float = 0.0  # e.g. 0.03 = 3% opportunity cost (optional)
    financed_amount_chf: float = 0.0
    financing_interest_rate: float = 0.0  # e.g. 0.049 = 4.9%


@dataclass(frozen=True)
class CostBreakdown:
    depreciation_chf_per_month: float
    energy_chf_per_month: float
    insurance_chf_per_month: float
    maintenance_chf_per_month: float
    road_tax_chf_per_month: float
    tyres_chf_per_month: float
    other_fixed_chf_per_month: float
    parking_chf_per_month: float
    one_offs_chf_per_month: float
    capital_cost_chf_per_month: float  # opportunity cost OR financing interest
    total_chf_per_month: float


# -----------------------------
# Calculator
# -----------------------------

def _safe_filename(s: str) -> str:
    s = s.strip().lower()
    s = re.sub(r"[^a-z0-9]+", "_", s)
    return s.strip("_") or "car"

def export_car_to_json(car: Car, out_dir: str = "cars") -> str:
    os.makedirs(out_dir, exist_ok=True)
    filename = _safe_filename(car.name) + ".json"
    path = os.path.join(out_dir, filename)
    with open(path, "w", encoding="utf-8") as f:
        json.dump(asdict(car), f, ensure_ascii=False, indent=2)
    return path

def _clamp_months_used(months_used_per_year: int) -> int:
    return max(1, min(12, int(months_used_per_year)))


def estimate_depreciation_monthly(car: Car) -> float:
    """
    Depreciation per month over the ownership horizon.
    Prefer explicit expected resale value. Otherwise, apply annual depreciation rate.
    """
    months = max(1, int(round(car.ownership_horizon_years * 12)))
    if car.expected_resale_value_chf is not None:
        resale = max(0.0, float(car.expected_resale_value_chf))
    else:
        # Fallback: compound annual depreciation from purchase price
        if car.annual_depreciation_rate is None:
            raise ValueError("Need either expected_resale_value_chf or annual_depreciation_rate.")
        r = float(car.annual_depreciation_rate)
        resale = car.purchase_price_chf * ((1.0 - r) ** car.ownership_horizon_years)

    depreciation_total = max(0.0, car.purchase_price_chf - resale)
    return depreciation_total / months


def estimate_energy_monthly(car: Car) -> float:
    """
    Energy cost driven by annual km, consumption and energy price.
    Scales with months_used_per_year (seasonal plates).
    """
    months_used = _clamp_months_used(car.months_used_per_year)

    km_per_month_when_used = car.annual_km / months_used  # months where you actually drive it
    # consumption_per_100km is L/100km or kWh/100km
    units_per_month = (km_per_month_when_used / 100.0) * car.consumption_per_100km
    return units_per_month * car.energy_price_chf


def estimate_capital_cost_monthly(car: Car) -> float:
    """
    Two optional views:
    - Opportunity cost for tying up cash: purchase_price * capital_interest_rate / 12
    - Financing interest: financed_amount * financing_interest_rate / 12

    If both set, we take financing as primary (because it's a real cash cost),
    and ignore opportunity cost unless you want to model both (then add it into other_fixed).
    """
    if car.financed_amount_chf > 0 and car.financing_interest_rate > 0:
        return (car.financed_amount_chf * car.financing_interest_rate) / 12.0
    if car.capital_interest_rate > 0:
        return (car.purchase_price_chf * car.capital_interest_rate) / 12.0
    return 0.0


def monthly_costs(car: Car) -> CostBreakdown:
    months_used = _clamp_months_used(car.months_used_per_year)

    depreciation = estimate_depreciation_monthly(car)
    energy = estimate_energy_monthly(car)

    # Annual costs: insurance, road tax often pro-rated for seasonal plates in many setups.
    # To keep it conservative and simple, we pro-rate by months_used/12.
    prorate = months_used / 12.0

    insurance = (car.insurance_chf_per_year * prorate) / 12.0
    maintenance = (car.maintenance_chf_per_year * prorate) / 12.0
    road_tax = (car.road_tax_chf_per_year * prorate) / 12.0
    tyres = (car.tyres_chf_per_year * prorate) / 12.0
    other_fixed = (car.other_fixed_chf_per_year * prorate) / 12.0

    # Parking is monthly, usually not pro-rated (you pay the spot all year)
    parking = float(car.parking_chf_per_month)

    # One-offs amortized over the ownership horizon months
    horizon_months = max(1, int(round(car.ownership_horizon_years * 12)))
    one_offs_total = float(car.one_off_purchase_fees_chf) + float(car.one_off_repairs_buffer_chf)
    one_offs = one_offs_total / horizon_months

    capital = estimate_capital_cost_monthly(car)

    total = (
        depreciation + energy + insurance + maintenance + road_tax + tyres + other_fixed
        + parking + one_offs + capital
    )

    return CostBreakdown(
        depreciation_chf_per_month=round(depreciation, 2),
        energy_chf_per_month=round(energy, 2),
        insurance_chf_per_month=round(insurance, 2),
        maintenance_chf_per_month=round(maintenance, 2),
        road_tax_chf_per_month=round(road_tax, 2),
        tyres_chf_per_month=round(tyres, 2),
        other_fixed_chf_per_month=round(other_fixed, 2),
        parking_chf_per_month=round(parking, 2),
        one_offs_chf_per_month=round(one_offs, 2),
        capital_cost_chf_per_month=round(capital, 2),
        total_chf_per_month=round(total, 2),
    )


# -----------------------------
# SQLite “database”
# -----------------------------
DB_SCHEMA = """
CREATE TABLE IF NOT EXISTS cars (
    name TEXT PRIMARY KEY,
    payload_json TEXT NOT NULL,
    created_at TEXT NOT NULL
);
"""


def init_db(db_path: str) -> None:
    with sqlite3.connect(db_path) as con:
        con.execute(DB_SCHEMA)
        con.commit()


def upsert_car(db_path: str, car: Car) -> None:
    import json
    init_db(db_path)
    payload = json.dumps(asdict(car), ensure_ascii=False)
    created_at = datetime.utcnow().isoformat()
    with sqlite3.connect(db_path) as con:
        con.execute(
            "INSERT INTO cars(name, payload_json, created_at) VALUES(?,?,?) "
            "ON CONFLICT(name) DO UPDATE SET payload_json=excluded.payload_json",
            (car.name, payload, created_at),
        )
        con.commit()


def get_car(db_path: str, name: str) -> Car:
    import json
    init_db(db_path)
    with sqlite3.connect(db_path) as con:
        row = con.execute("SELECT payload_json FROM cars WHERE name=?", (name,)).fetchone()
    if not row:
        raise KeyError(f"Car '{name}' not found in DB.")
    data = json.loads(row[0])
    return Car(**data)


def list_cars(db_path: str) -> Tuple[str, ...]:
    init_db(db_path)
    with sqlite3.connect(db_path) as con:
        rows = con.execute("SELECT name FROM cars ORDER BY name").fetchall()
    return tuple(r[0] for r in rows)


def quote(db_path: str, name: str) -> Dict[str, Any]:
    car = get_car(db_path, name)
    breakdown = monthly_costs(car)
    return {"car": asdict(car), "monthly_breakdown": asdict(breakdown)}


# -----------------------------
# CLI (so you can type one line to add/quote)
# -----------------------------
def _parse_args() -> argparse.Namespace:
    p = argparse.ArgumentParser(description="Car cost database + monthly cost calculator (SQLite).")
    p.add_argument("--db", default="cars.db", help="SQLite DB path (default: cars.db)")

    sub = p.add_subparsers(dest="cmd", required=True)

    sub.add_parser("init", help="Initialize the database")
    sub.add_parser("list", help="List cars in DB")

    ap = sub.add_parser("add", help="Add/update a car")
    ap.add_argument("--name", required=True)

    ap.add_argument("--purchase", type=float, required=True, help="Purchase price CHF")
    ap.add_argument("--age", type=float, required=True, help="Age in years")
    ap.add_argument("--mileage", type=int, required=True, help="Mileage km")
    ap.add_argument("--annual-km", type=int, required=True, help="Annual km driven")
    ap.add_argument("--months-used", type=int, default=12, help="Months used per year (seasonal plates)")

    ap.add_argument("--insurance", type=float, default=1500.0, help="Insurance CHF/year")
    ap.add_argument("--maintenance", type=float, default=2000.0, help="Maintenance CHF/year")
    ap.add_argument("--road-tax", type=float, default=650.0, help="Road tax CHF/year")
    ap.add_argument("--parking", type=float, default=0.0, help="Parking CHF/month")

    ap.add_argument("--energy-type", choices=["petrol", "diesel", "ev"], default="petrol")
    ap.add_argument("--consumption", type=float, default=10.0, help="L/100km or kWh/100km")
    ap.add_argument("--energy-price", type=float, default=1.90, help="CHF/L or CHF/kWh")

    ap.add_argument("--tyres", type=float, default=600.0, help="Tyres CHF/year")
    ap.add_argument("--other-fixed", type=float, default=0.0, help="Other fixed CHF/year")

    ap.add_argument("--oneoff-fees", type=float, default=0.0, help="One-off purchase fees CHF")
    ap.add_argument("--oneoff-buffer", type=float, default=0.0, help="One-off repair buffer CHF")

    ap.add_argument("--horizon", type=float, default=5.0, help="Ownership horizon years")
    ap.add_argument("--resale", type=float, default=None, help="Expected resale value CHF (preferred)")
    ap.add_argument("--depr-rate", type=float, default=0.06, help="Annual depreciation rate fallback (e.g. 0.06)")

    ap.add_argument("--capital-rate", type=float, default=0.0, help="Opportunity cost rate (e.g. 0.03)")
    ap.add_argument("--financed", type=float, default=0.0, help="Financed amount CHF")
    ap.add_argument("--fin-rate", type=float, default=0.0, help="Financing interest rate (e.g. 0.049)")

    qp = sub.add_parser("quote", help="Compute monthly costs for a stored car")
    qp.add_argument("--name", required=True)

    ep = sub.add_parser("export-json", help="Export a stored car as JSON (cars/<name>.json)")
    ep.add_argument("--name", required=True)
    ep.add_argument("--out-dir", default="cars")

    return p.parse_args()


def _print_quote(q: Dict[str, Any]) -> None:
    car = q["car"]
    b = q["monthly_breakdown"]
    print("\n=== CAR ===")
    print(f"Name: {car['name']}")
    print(f"Purchase: CHF {car['purchase_price_chf']:.0f} | Age: {car['age_years']}y | Mileage: {car['mileage_km']} km")
    print(f"Annual km: {car['annual_km']} | Months used: {car['months_used_per_year']}/12 | Energy: {car['energy_type']}")
    print("\n=== MONTHLY COST BREAKDOWN (CHF) ===")
    print(f"Depreciation:      {b['depreciation_chf_per_month']:>8}")
    print(f"Energy:            {b['energy_chf_per_month']:>8}")
    print(f"Insurance:         {b['insurance_chf_per_month']:>8}")
    print(f"Maintenance:       {b['maintenance_chf_per_month']:>8}")
    print(f"Road tax:          {b['road_tax_chf_per_month']:>8}")
    print(f"Tyres:             {b['tyres_chf_per_month']:>8}")
    print(f"Other fixed:       {b['other_fixed_chf_per_month']:>8}")
    print(f"Parking:           {b['parking_chf_per_month']:>8}")
    print(f"One-offs amort.:   {b['one_offs_chf_per_month']:>8}")
    print(f"Capital/interest:  {b['capital_cost_chf_per_month']:>8}")
    print("------------------------------")
    print(f"TOTAL / month:     {b['total_chf_per_month']:>8}\n")


def main() -> None:
    args = _parse_args()

    if args.cmd == "export-json":
        car = get_car(args.db, args.name)
        path = export_car_to_json(car, args.out_dir)
        print(f"Exported JSON to: {path}")
        return

    if args.cmd == "init":
        init_db(args.db)
        print(f"Initialized DB at {args.db}")
        return

    if args.cmd == "list":
        names = list_cars(args.db)
        if not names:
            print("No cars stored yet.")
        else:
            for n in names:
                print(n)
        return

    if args.cmd == "add":
        car = Car(
            name=args.name,
            purchase_price_chf=args.purchase,
            age_years=args.age,
            mileage_km=args.mileage,
            annual_km=args.annual_km,
            months_used_per_year=args.months_used,

            insurance_chf_per_year=args.insurance,
            maintenance_chf_per_year=args.maintenance,
            road_tax_chf_per_year=args.road_tax,
            parking_chf_per_month=args.parking,

            energy_type=args.energy_type,
            consumption_per_100km=args.consumption,
            energy_price_chf=args.energy_price,

            tyres_chf_per_year=args.tyres,
            other_fixed_chf_per_year=args.other_fixed,

            one_off_purchase_fees_chf=args.oneoff_fees,
            one_off_repairs_buffer_chf=args.oneoff_buffer,

            ownership_horizon_years=args.horizon,
            expected_resale_value_chf=args.resale,
            annual_depreciation_rate=args.depr_rate,

            capital_interest_rate=args.capital_rate,
            financed_amount_chf=args.financed,
            financing_interest_rate=args.fin_rate,
        )
        upsert_car(args.db, car)
        q = quote(args.db, args.name)
        _print_quote(q)
        return

    if args.cmd == "quote":
        q = quote(args.db, args.name)
        _print_quote(q)
        return


if __name__ == "__main__":
    main()