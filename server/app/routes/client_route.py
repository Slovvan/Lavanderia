from flask import jsonify, request, Blueprint
from app.controllers.client_controller import create_client

client_bp = Blueprint("client_bp", __name__, url_prefix="/clients")

@client_bp.route("/create", methods=["POST"])
def create():
    data = request.json
    
    name = data.get("name")
    phone_number = data.get("phone_number")
    address = data.get("address")

    if not name or not phone_number or not address:
        return jsonify({
            "error": "Los datos basicos de un cliente son obligatorios"

        }), 400
    
    client = create_client(name, phone_number, address)
    return jsonify({
        "msg": "Cliente creado con exito!",
        "client": client.to_dict()
    }), 200
