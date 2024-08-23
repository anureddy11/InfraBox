from flask.cli import AppGroup
from .users import seed_users, undo_users
from .pops import seed_pops, undo_pops
from .racks import seed_racks, undo_racks
from .rackslots import seed_rack_slots, undo_rack_slots

from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo
        # command, which will  truncate all tables prefixed with
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_users()
    seed_users()
    # Add other seed functions here
    seed_pops()
    seed_racks()
    seed_rack_slots()


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_pops()
    undo_racks()
    undo_rack_slots()
    # Add other undo functions here
