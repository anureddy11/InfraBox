from flask import Blueprint, jsonify, request, abort, render_template, redirect, url_for
from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField
from wtforms.validators import DataRequired
from app.models.db import db
from app.models.rack import Rack
from app.models.rack_slot import RackSlot
from app.forms.rack_slot_form import AddSlotForm, UpdateSlotForm
from sqlalchemy.orm import joinedload
