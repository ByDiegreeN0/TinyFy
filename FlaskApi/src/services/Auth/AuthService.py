from flask import Flask, request, jsonify
from flask_jwt_extended import create_access_token
import bcrypt
from flask_cors import CORS
from models.User import User, db
from app import app

CORS(app)

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    request_email = data.get('email')
    request_password = data.get('password')

    # Buscar el usuario por correo electrónico
    user = User.query.filter_by(_email=request_email).first()
    
    # Verificar si el usuario existe y la contraseña es correcta
    if user and bcrypt.checkpw(request_password.encode('utf-8'), user.password.encode('utf-8')):
        # Crear un token de acceso
        access_token = create_access_token(identity=user.id)
        return jsonify(access_token=access_token)
    
    # Responder con un error si la autenticación falla
    return jsonify({"msg": "Bad email or password"}), 401
