from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from datetime import datetime, timezone
from sqlalchemy import Numeric




class RackSlot(db.Model):
    __tablename__ = 'rack_slots'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    rack_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('racks.id')), nullable=False)
    slot_id = db.Column(db.String, nullable=False)
    server = db.Column(db.String, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now(timezone.utc), nullable=False)
    updated_at = db.Column(db.DateTime, default=datetime.now(timezone.utc), onupdate=datetime.now(timezone.utc), nullable=False)

    # Relationships
    rack = db.relationship('Rack', back_populates='rack_slots')

    def to_dict(self):
        return {
            'id': self.id,
            'rack_id': self.rack_id,
            'slot_id':self.slot_id,
            'server': self.server,
            'created_at': self.created_at.isoformat(),
            'updated_at': self.updated_at.isoformat()
        }
