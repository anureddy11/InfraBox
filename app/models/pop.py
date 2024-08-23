from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from datetime import datetime, timezone
from sqlalchemy import Numeric




class Pop(db.Model):
    __tablename__ = 'pops'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    city = db.Column(db.String, nullable=False)
    country = db.Column(db.String, nullable=False)
    region = db.Column(db.String, nullable=False)
    status = db.Column(db.String, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now(timezone.utc), nullable=False)
    updated_at = db.Column(db.DateTime, default=datetime.now(timezone.utc), onupdate=datetime.now(timezone.utc), nullable=False)

    # Relationships
    racks = db.relationship('Rack', back_populates='pop')

    # Method to convert model instance to dictionary
    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'city': self.city,
            'country': self.country,
            'region': self.region,
            'status': self.status,
            'racks': [rack.to_dict() for rack in self.racks],
            'created_at': self.created_at.isoformat(),
            'updated_at': self.updated_at.isoformat()
        }
