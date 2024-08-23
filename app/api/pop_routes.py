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


# Query the pop by name
@pop_routes.route('/<string:city>', methods=["GET"])
@login_required
def get_pop_by_city(city):
    pop = Pop.query.filter_by(city=city).first()

    if pop:
        return jsonify(pop.to_dict()), 200  # Assuming your Pop model has a to_dict method
    else:
        return jsonify({"error": "Pop not found"}), 404


#create a pop
@pop_routes.route('/', methods=["POST"])
@login_required
def create_pop():
    data = request.json
    new_pop = Pop(
        name=data.get('name'),
        city=data.get('city'),
        country=data.get('country'),
        region=data.get('region'),
        status=data.get('status')
    )
    db.session.add(new_pop)
    db.session.commit()

    return jsonify(new_pop.to_dict()), 201

#update a pop
@pop_routes.route('/<string:city>', methods=["PUT"])
@login_required
def update_pop_by_city(city):
    pop = Pop.query.filter_by(city=city).first()
    if not pop:
        return jsonify({"error": f"Pop in {city} not found"}), 404

    data = request.json
    pop.name = data.get('name', pop.name)
    pop.city = data.get('city', pop.city)
    pop.country = data.get('country', pop.country)
    pop.region = data.get('region', pop.region)
    pop.status = data.get('status', pop.status)

    db.session.commit()

    return jsonify(pop.to_dict()), 200


#delete a pop
@pop_routes.route('/<string:city>', methods=["DELETE"])
@login_required
def delete_pop_by_city(city):
    pop = Pop.query.filter_by(city=city).first()
    if pop:
        db.session.delete(pop)
        db.session.commit()
        return jsonify({"message": f"Pop in {city} deleted successfully"}), 200
    else:
        return jsonify({"error": f"Pop in {city} not found"}), 404
