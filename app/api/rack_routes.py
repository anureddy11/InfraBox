from flask import Blueprint, jsonify, request, abort, render_template, redirect, url_for, flash
from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField
from wtforms.validators import DataRequired
from app.models.db import db
from app.models.rack import Rack
from app.models.rack_slot import RackSlot
from app.forms.rack_slot_form import AddSlotForm, UpdateSlotForm
from sqlalchemy.orm import joinedload
from app.forms.rack_form import AddRackForm, UpdateRackForm


rack_routes = Blueprint('racks', __name__, url_prefix='/racks')

# Route to create a new rack
@rack_routes.route('/add', methods=['POST'])
def create_rack():
    data = request.json

    # Perform validation
    if not data:
        return jsonify({'error': 'No input data provided'}), 400

    try:
        new_rack = Rack(
            pop_id=data.get('pop_id'),
            name=data.get('name'),
            max_ru=data.get('max_ru'),
            max_kw=data.get('max_kw')
        )
        db.session.add(new_rack)
        db.session.commit()
        return jsonify(new_rack.to_dict()), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

# Route to update an existing rack by ID
@rack_routes.route('/<int:rack_id>/edit', methods=['GET', 'POST'])
def update_rack(rack_id):
    rack = Rack.query.get_or_404(rack_id)
    form = UpdateRackForm(obj=rack)

    if form.validate_on_submit():
        rack.name = form.name.data
        rack.max_ru = form.max_ru.data
        rack.max_kw = form.max_kw.data
        try:
            db.session.commit()
            flash('Rack updated successfully!', 'success')
            return redirect(url_for('rack.list_racks'))
        except Exception as e:
            db.session.rollback()
            flash(f'Error updating rack: {e}', 'danger')

    return render_template('update_rack.html', form=form, rack=rack)

# Route to delete a rack by ID
@rack_routes.route('/<int:rack_id>/delete', methods=['POST'])
def delete_rack(rack_id):
    rack = Rack.query.get_or_404(rack_id)

    try:
        db.session.delete(rack)
        db.session.commit()
        flash('Rack deleted successfully!', 'success')
    except Exception as e:
        db.session.rollback()
        flash(f'Error deleting rack: {e}', 'danger')

    return redirect(url_for('rack.list_racks'))
