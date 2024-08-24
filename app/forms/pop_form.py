from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired

class PopForm(FlaskForm):
    name = StringField('Name', validators=[DataRequired()])
    city = StringField('City', validators=[DataRequired()])
    country = StringField('Country', validators=[DataRequired()])
    region = StringField('Region', validators=[DataRequired()])
    status = StringField('Status', validators=[DataRequired()])
