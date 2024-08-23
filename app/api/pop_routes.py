from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models.db import db, environment, SCHEMA
from app.models.pop import Pop

pop_routes = Blueprint('pop', __name__, url_prefix='/pop')


#get all pops
@pop_routes.route('/all', methods=["GET"])
@login_required
def get_all_pops():
    pops = Pop.query.all()

    # Convert each Pop object to a dictionary
    pops_list = [pop.to_dict() for pop in pops]

    return jsonify(pops_list)
#get pop by pop name

#create a pop

#update a pop

#delete a pop
