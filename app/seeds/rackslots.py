from app.models import db, Rack, RackSlot, environment, SCHEMA
from sqlalchemy.sql import text
import random
from datetime import datetime, timezone

def seed_rack_slots():
    # Fetch all racks from the database
    racks = Rack.query.all()

    # List of server types
    server_types = [
        {'gen': 9, 'ru': 1, 'watts': 400, 'normalized_cpu': 1},
        {'gen': 10, 'ru': 1, 'watts': 400, 'normalized_cpu': 1.3},
        {'gen': 11, 'ru': 1, 'watts': 500, 'normalized_cpu': 2},
        {'gen': 12, 'ru': 2, 'watts': 600, 'normalized_cpu': 4}
    ]

    for rack in racks:
        # Determine the number of rack slots and rack utilization
        num_slots = random.randint(1, 10)  # Maximum of 10 slots per rack
        utilization = random.uniform(0.5, 0.9)  # Utilization between 50% and 90%
        filled_slots = int(num_slots * utilization)  # Number of filled slots

        if filled_slots == 0:
            continue  # Skip racks with no filled slots

        # Randomly select two consecutive server types
        selected_types = random.sample(server_types, 2)
        current_type_index = 0
        current_type = selected_types[current_type_index]

        used_slots = set()  # To keep track of used slot_ids

        for i in range(filled_slots):
            if i > 0 and i % (filled_slots // 2) == 0:  # Switch type after half of the slots
                current_type_index = 1 - current_type_index
                current_type = selected_types[current_type_index]

            # Generate a unique slot_id within the available range
            while True:
                slot_id = random.randint(1, num_slots)
                if slot_id not in used_slots:
                    used_slots.add(slot_id)
                    break

            rack_slot = RackSlot(
                rack_id=rack.id,
                slot_id=slot_id,
                server=f'Server Gen {current_type["gen"]}',
                created_at=datetime.now(timezone.utc),
                updated_at=datetime.now(timezone.utc)
            )
            db.session.add(rack_slot)

    db.session.commit()

# Undo function for rack_slots
def undo_rack_slots():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.rack_slots RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM rack_slots"))

    db.session.commit()
