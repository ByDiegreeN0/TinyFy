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

    print(f"Request Email: {request_email}")
    print(f"Request Password: {request_password}")

    user = User.query.filter_by(email=request_email).first()
    if user:
        print(f"User Found: {user.username}")
        print(f"Stored Password: {user.password}")

        if bcrypt.checkpw(request_password.encode('utf-8'), user.password):
            access_token = create_access_token(identity=user.email)
            return jsonify(access_token=access_token)
        else:
            return jsonify({"msg": "Bad password"}), 401
    else:
        return jsonify({"msg": "Bad email"}), 401

