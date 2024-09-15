from flask import Blueprint, jsonify, request, abort, render_template, redirect, url_for
from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField
from wtforms.validators import DataRequired
from app.models.db import db
from app.models.rack import Rack
from app.models.rack_slot import RackSlot
from app.forms.rack_slot_form import AddSlotForm, UpdateSlotForm
from sqlalchemy.orm import joinedload



rack_routes = Blueprint('rack-slots', __name__, url_prefix='/rack-slots')

@rack_routes.route('/<int:rack_id>/slots', methods=['GET'])
def get_all_rack_slots(rack_id):
    # Fetch all slots for the given rack_id
    slots = RackSlot.query.filter_by(rack_id=rack_id).all()

    if not slots:
        return jsonify({"message": "No slots found for the given rack_id"}), 404

    # Convert the slots to a dictionary
    slots_data = [slot.to_dict() for slot in slots]

    return jsonify(slots_data), 200


@rack_routes.route('/<int:rack_id>/slot/add', methods=['POST'])
def add_slot(rack_id):
    form = AddSlotForm()
    form.csrf_token.data = request.cookies.get('csrf_token')
    if form.validate_on_submit():
        slot_id = str(form.slot_id.data)
        server = form.server.data


        # rack = Rack.query.get(rack_id)
        # if not rack:
        #     abort(404, description="Rack not found")

        # Check if slot already exists
        existing_slot = RackSlot.query.filter_by(rack_id=rack_id, slot_id=slot_id).first()
        if existing_slot:
            abort(400, description="Slot ID already exists")

        new_slot = RackSlot(
            rack_id=rack_id,
            slot_id=slot_id,
            server=server
        )
        db.session.add(new_slot)
        db.session.commit()

        return  jsonify(new_slot.to_dict()), 201

    return jsonify({"errors": form.errors}), 400

# Delete a slot from the rack
@rack_routes.route('/<int:rack_id>/slot/<string:slot_id>', methods=['DELETE'])
def delete_slot(rack_id, slot_id):
    slot = RackSlot.query.filter_by(rack_id=rack_id, slot_id=slot_id).first()

    if not slot:
        return jsonify({"message": "Slot not found"}), 404

    db.session.delete(slot)
    db.session.commit()

    return jsonify({"message": "Slot deleted successfully"}), 200

# Update a slot in the rack
@rack_routes.route('/<int:rack_id>/slot/<string:slot_id>', methods=['PUT'])
def update_slot(rack_id, slot_id):
    form = UpdateSlotForm()
    form.csrf_token.data = request.cookies.get('csrf_token')

    if form.validate_on_submit():
        slot = RackSlot.query.filter_by(rack_id=rack_id, slot_id=slot_id).first()

        if not slot:
            return jsonify({"message": "Slot not found"}), 404

        # Update slot details
        slot.server = form.server.data

        db.session.commit()

        return jsonify(slot.to_dict()), 200

    return jsonify({"errors": form.errors}), 400
