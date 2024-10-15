from flask import Flask, request, jsonify
from flask_cors import cross_origin # Implementa cross_origin para hacer peticiones desde afuera del api (esto deberia arreglar el app)
import bcrypt
from models.User import User, db
from app import app

# Create
@cross_origin # implementa CORS
@app.route('/users', methods=['POST'])
def create_user():
    data = request.json
    hashed_password = bcrypt.hashpw(data['password'].encode('utf-8'), bcrypt.gensalt())
    new_user = User(username=data['username'], email=data['email'], password=hashed_password, RoleId=data['RoleId'])
    db.session.add(new_user)
    db.session.commit()
    return jsonify({'message': 'User created successfully'}), 201

# Read
@cross_origin # implementa CORS
@app.route('/users', methods=['GET'])
def get_users():
    
    users = User.query.all()
    return jsonify([{'id': user.id, 'username': user.username, 'email': user.email} for user in users])

@cross_origin # implementa CORS
@app.route('/users/<int:user_id>', methods=['GET'])
def get_user(user_id):
    user = User.query.get_or_404(user_id)
    return jsonify({'id': user.id, 'username': user.username, 'email': user.email})

# Update
@cross_origin # implementa CORS
@app.route('/users/<int:user_id>', methods=['PUT'])
def update_user(user_id):
    user = User.query.get_or_404(user_id)
    data = request.json
    user.username = data.get('username', user.username)
    user.email = data.get('email', user.email)
    if 'password' in data:
        user.password = bcrypt.hashpw(data['password'].encode('utf-8'), bcrypt.gensalt())
    user.RoleId = data.get('RoleId', user.RoleId)
    db.session.commit()
    return jsonify({'message': 'User updated successfully'})

# Delete
@cross_origin # implementa CORS
@app.route('/users/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    user = User.query.get_or_404(user_id)
    db.session.delete(user)
    db.session.commit()
    return jsonify({'message': 'User deleted successfully'})

if __name__ == '__main__':
    app.run(debug=True)
