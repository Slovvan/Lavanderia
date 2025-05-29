from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash
from app.models.user import User
from app.database.db import db

user_bp = Blueprint("users", __name__, url_prefix="/users")

@user_bp.route("/register", methods=["POST"])
def create_user(): 
    data = request.get_json()
    
    name = data.get("name")
    email = data.get("email")
    role = data.get("role")
    password = data.get("password")
    
    if not name or not email or not password: 
        return jsonify({
            'error': "Completa todos los datos." 
        }), 400
        
    if User.query.filter_by(email = email).first():
        return jsonify({
            'error': "El correo ya está registrado." 
        }), 400
        
    password_hash = generate_password_hash(password)
    
    new_user = User(name = name, email = email, role = role, password = password_hash)
    
    db.session.add(new_user)
    
    # Commit -> Es igual en GitHub
    db.session.commit()
    return jsonify({
        'msg': 'Usuario creado con éxtio' 
    }), 200
        