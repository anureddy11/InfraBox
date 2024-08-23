from app.models import db, Pop, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime, timezone

# Adds entries to the pops table
def seed_pops():
    IAD = Pop(
        name='IAD', city='Washington D.C.', country='USA', region='North America', status='Active')
    EWR = Pop(
        name='EWR', city='Newark', country='USA', region='North America', status='Active')
    ORD = Pop(
        name='ORD', city='Chicago', country='USA', region='North America', status='Active')
    MIA = Pop(
        name='MIA', city='Miami', country='USA', region='North America', status='Active')
    DFW = Pop(
        name='DFW', city='Dallas', country='USA', region='North America', status='Active')
    ATL = Pop(
        name='ATL', city='Atlanta', country='USA', region='North America', status='Active')
    LAX = Pop(
        name='LAX', city='Los Angeles', country='USA', region='North America', status='Active')
    SJC = Pop(
        name='SJC', city='San Jose', country='USA', region='North America', status='Active')
    SEA = Pop(
        name='SEA', city='Seattle', country='USA', region='North America', status='Active')
    GRU = Pop(
        name='GRU', city='São Paulo', country='Brazil', region='South America', status='Active')
    GIG = Pop(
        name='GIG', city='Rio de Janeiro', country='Brazil', region='South America', status='Active')
    EZE = Pop(
        name='EZE', city='Buenos Aires', country='Argentina', region='South America', status='Active')
    SCL = Pop(
        name='SCL', city='Santiago', country='Chile', region='South America', status='Active')
    LHR = Pop(
        name='LHR', city='London', country='United Kingdom', region='Europe', status='Active')
    FRA = Pop(
        name='FRA', city='Frankfurt', country='Germany', region='Europe', status='Active')
    CDG = Pop(
        name='CDG', city='Paris', country='France', region='Europe', status='Active')
    AMS = Pop(
        name='AMS', city='Amsterdam', country='Netherlands', region='Europe', status='Active')
    MAD = Pop(
        name='MAD', city='Madrid', country='Spain', region='Europe', status='Active')
    DME = Pop(
        name='DME', city='Moscow', country='Russia', region='Europe', status='Active')
    IST = Pop(
        name='IST', city='Istanbul', country='Turkey', region='Europe', status='Active')
    DUB = Pop(
        name='DUB', city='Dublin', country='Ireland', region='Europe', status='Active')
    SIN = Pop(
        name='SIN', city='Singapore', country='Singapore', region='Asia', status='Active')
    NRT = Pop(
        name='NRT', city='Tokyo', country='Japan', region='Asia', status='Active')
    KIX = Pop(
        name='KIX', city='Osaka', country='Japan', region='Asia', status='Active')
    ICN = Pop(
        name='ICN', city='Seoul', country='South Korea', region='Asia', status='Active')
    SYD = Pop(
        name='SYD', city='Sydney', country='Australia', region='Oceania', status='Active')
    HKF = Pop(
        name='HKF', city='Hong Kong', country='Hong Kong', region='Asia', status='Active')
    BOM = Pop(
        name='BOM', city='Mumbai', country='India', region='Asia', status='Active')
    DEL = Pop(
        name='DEL', city='New Delhi', country='India', region='Asia', status='Active')
    MAA = Pop(
        name='MAA', city='Chennai', country='India', region='Asia', status='Active')
    AKL = Pop(
        name='AKL', city='Auckland', country='New Zealand', region='Oceania', status='Active')

    db.session.add_all([IAD, EWR, ORD, MIA, DFW, ATL, LAX, SJC, SEA, GRU, GIG, EZE, SCL, LHR, FRA, CDG, AMS, MAD, DME, IST, DUB, SIN, NRT, KIX, ICN, SYD, HKF, BOM, DEL, MAA, AKL])
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the pops table
def undo_pops():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.pops RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM pops"))

    db.session.commit()
