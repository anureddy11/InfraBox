from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from datetime import datetime, timezone
from sqlalchemy import Numeric




class Rack(db.Model):
    __tablename__ = 'racks'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    pop_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('pops.id')), nullable=False)
    name = db.Column(db.String, nullable=False)
    max_ru = db.Column(db.Integer, nullable=False)
    max_kw = db.Column(db.Float, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now(timezone.utc), nullable=False)
    updated_at = db.Column(db.DateTime, default=datetime.now(timezone.utc), onupdate=datetime.now(timezone.utc), nullable=False)

    # Relationships
    pop = db.relationship('Pop', back_populates='racks')
    rack_slots = db.relationship('RackSlot', back_populates='rack')


    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "max_ru": self.max_ru,
            "max_kw": self.max_kw,
            'rack_slots': [rack_slot.to_dict() for rack_slot in self.rack_slots],
            "created_at": self.created_at.isoformat() if self.created_at else None,
            "updated_at": self.updated_at.isoformat() if self.updated_at else None
        }
