from flask import Blueprint, jsonify, request, abort, render_template, redirect, url_for
from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField
from wtforms.validators import DataRequired
from app.models.db import db
from app.models.rack import Rack
from app.models.rack_slot import RackSlot
from app.forms.rack_slot_form import AddSlotForm, UpdateSlotForm

rack_routes = Blueprint('rack', __name__, url_prefix='/rack')


@rack_routes.route('/<int:rack_id>/slot/add', methods=['GET', 'POST'])
def add_slot(rack_id):
    form = AddSlotForm()
    if form.validate_on_submit():
        slot_id = form.slot_id.data
        server = form.server.data

        rack = Rack.query.get(rack_id)
        if not rack:
            abort(404, description="Rack not found")

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

        return  jsonify(new_slot.to_dict(),), 201

    return jsonify({"errors": form.errors}), 400
