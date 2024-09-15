from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, FloatField, SubmitField
from wtforms.validators import DataRequired, NumberRange

class AddRackForm(FlaskForm):
    pop_id = IntegerField('Pop ID', validators=[DataRequired()])
    name = StringField('Rack Name', validators=[DataRequired()])
    max_ru = IntegerField('Max RU', validators=[DataRequired(), NumberRange(min=1)])
    max_kw = FloatField('Max kW', validators=[DataRequired(), NumberRange(min=0)])
    submit = SubmitField('Add Rack')

class UpdateRackForm(FlaskForm):
    name = StringField('Rack Name', validators=[DataRequired()])
    max_ru = IntegerField('Max RU', validators=[DataRequired(), NumberRange(min=1)])
    max_kw = FloatField('Max kW', validators=[DataRequired(), NumberRange(min=0)])
    submit = SubmitField('Update Rack')
