from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField
from wtforms.validators import DataRequired

class AddSlotForm(FlaskForm):
    slot_id = StringField('Slot ID', validators=[DataRequired()])
    server = StringField('Server', validators=[DataRequired()])
    submit = SubmitField('Add Slot')

class UpdateSlotForm(FlaskForm):
    server = StringField('Server', validators=[DataRequired()])
    submit = SubmitField('Update Slot')
