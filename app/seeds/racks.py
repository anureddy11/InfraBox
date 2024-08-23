from app.models import db, Pop, Rack, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime, timezone

pops = [
        {'name': 'IAD', 'city': 'Washington D.C.', 'country': 'USA', 'region': 'North America'},
        {'name': 'EWR', 'city': 'Newark', 'country': 'USA', 'region': 'North America'},
        {'name': 'ORD', 'city': 'Chicago', 'country': 'USA', 'region': 'North America'},
        {'name': 'MIA', 'city': 'Miami', 'country': 'USA', 'region': 'North America'},
        {'name': 'DFW', 'city': 'Dallas', 'country': 'USA', 'region': 'North America'},
        {'name': 'ATL', 'city': 'Atlanta', 'country': 'USA', 'region': 'North America'},
        {'name': 'LAX', 'city': 'Los Angeles', 'country': 'USA', 'region': 'North America'},
        {'name': 'SJC', 'city': 'San Jose', 'country': 'USA', 'region': 'North America'},
        {'name': 'SEA', 'city': 'Seattle', 'country': 'USA', 'region': 'North America'},
        {'name': 'GRU', 'city': 'São Paulo', 'country': 'Brazil', 'region': 'South America'},
        {'name': 'GIG', 'city': 'Rio de Janeiro', 'country': 'Brazil', 'region': 'South America'},
        {'name': 'EZE', 'city': 'Buenos Aires', 'country': 'Argentina', 'region': 'South America'},
        {'name': 'SCL', 'city': 'Santiago', 'country': 'Chile', 'region': 'South America'},
        {'name': 'LHR', 'city': 'London', 'country': 'United Kingdom', 'region': 'Europe'},
        {'name': 'FRA', 'city': 'Frankfurt', 'country': 'Germany', 'region': 'Europe'},
        {'name': 'CDG', 'city': 'Paris', 'country': 'France', 'region': 'Europe'},
        {'name': 'AMS', 'city': 'Amsterdam', 'country': 'Netherlands', 'region': 'Europe'},
        {'name': 'MAD', 'city': 'Madrid', 'country': 'Spain', 'region': 'Europe'},
        {'name': 'DME', 'city': 'Moscow', 'country': 'Russia', 'region': 'Europe'},
        {'name': 'IST', 'city': 'Istanbul', 'country': 'Turkey', 'region': 'Europe'},
        {'name': 'DUB', 'city': 'Dublin', 'country': 'Ireland', 'region': 'Europe'},
        {'name': 'SIN', 'city': 'Singapore', 'country': 'Singapore', 'region': 'Asia'},
        {'name': 'NRT', 'city': 'Tokyo', 'country': 'Japan', 'region': 'Asia'},
        {'name': 'KIX', 'city': 'Osaka', 'country': 'Japan', 'region': 'Asia'},
        {'name': 'ICN', 'city': 'Seoul', 'country': 'South Korea', 'region': 'Asia'},
        {'name': 'SYD', 'city': 'Sydney', 'country': 'Australia', 'region': 'Oceania'},
        {'name': 'HKF', 'city': 'Hong Kong', 'country': 'Hong Kong', 'region': 'Asia'},
        {'name': 'BOM', 'city': 'Mumbai', 'country': 'India', 'region': 'Asia'},
        {'name': 'DEL', 'city': 'New Delhi', 'country': 'India', 'region': 'Asia'},
        {'name': 'MAA', 'city': 'Chennai', 'country': 'India', 'region': 'Asia'},
        {'name': 'AKL', 'city': 'Auckland', 'country': 'New Zealand', 'region': 'Oceania'}
    ]
def seed_racks():
    pops = Pop.query.all()

    for pop in pops:
        if pop.country == 'USA':
            maxKW = 12
            maxRU = 45
        elif pop.region == 'Asia' or pop.region == 'Oceania':
            maxKW = 8
            maxRU = 30
        else:
            maxKW = 5
            maxRU = 20

        for i in range(10):
            rack = Rack(
                pop_id=pop.id,
                name=f'Rack {i + 1} - {pop.name}',
                max_ru=maxRU,
                max_kw=maxKW
            )
            db.session.add(rack)

    db.session.commit()

# Undo function for racks
def undo_racks():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.racks RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM racks"))

    db.session.commit()
