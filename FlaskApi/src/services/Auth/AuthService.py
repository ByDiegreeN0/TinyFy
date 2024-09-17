# services.py
from flask import jsonify, request
from flask_jwt_extended import create_access_token
from models.User import User
from app import app, db  # Importa la instancia de Flask y db desde app.py


@app.route('/login', methods=['POST'])
def login():
    # Obtener datos del cuerpo de la solicitud
    data = request.get_json()
    request_email = data.get('email')
    request_password = data.get('password')

    # Buscar el usuario por correo electrónico
    user = User.query.filter_by(_email=request_email).first()

    if not user:
        return jsonify({"msg": "User not found"}), 404

    # Verificar si la contraseña es correcta
    if user.password == request_password:
        # Crear un token de acceso
        access_token = create_access_token(identity=user.email)
        return jsonify(access_token=access_token)

    # Responder con un error si la autenticación falla
    return jsonify({"msg": "Bad username or password"}), 401
