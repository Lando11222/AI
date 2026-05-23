from flask import Blueprint, request, jsonify

from models.recommender import get_recommendation

recommendation_bp = Blueprint("recommendation", __name__)

@recommendation_bp.route("/recommend", methods=["POST"])
def recommend():

    data = request.json

    answers = data["answers"]

    result = get_recommendation(answers)

    return jsonify(result)