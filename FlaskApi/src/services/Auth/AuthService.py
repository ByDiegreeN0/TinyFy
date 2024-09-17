from flask import Flask, request, jsonify
from flask_jwt_extended import create_access_token
import bcrypt
from models.User import User, db
from app import app

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    request_email = data.get('email')
    request_password = data.get('password')
    
    # Buscar el usuario por correo electrónico
    user = User.query.filter_by(email=request_email).first()
    
    # Verificar si el usuario existe y la contraseña es correcta
    if user and user.password == request_password:
        # Crear un token de acceso
        access_token = create_access_token(identity=user.email)
        return jsonify(access_token=access_token)
    
    # Responder con un error si la autenticación falla
    return jsonify({"msg": "Bad username or password"}), 401
