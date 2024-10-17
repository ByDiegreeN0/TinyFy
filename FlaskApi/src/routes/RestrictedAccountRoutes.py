from flask import request, jsonify
from flask_jwt_extended import jwt_required # libreria de flask para proteger rutas
from flask_cors import cross_origin # Implementa cross_origin para hacer peticiones desde afuera del api (esto deberia arreglar el app)


from app import app
from models.User import db

from models.RestrictedUserModel import RestrictedAccount


# Create
@cross_origin # implementa CORS
@app.route('/restricted_accounts', methods=['POST'])
@jwt_required() # con este metodo se protege la ruta

def create_restricted_account():
    data = request.json
    new_restricted_account = RestrictedAccount(UserId=data['UserId'], RestrictReason=data['RestrictReason'])
    db.session.add(new_restricted_account)
    db.session.commit()
    return jsonify({'message': 'RestrictedAccount created successfully'}), 201

# Read
@cross_origin # implementa CORS
@app.route('/restricted_accounts', methods=['GET'])
@jwt_required() # con este metodo se protege la ruta

def get_restricted_accounts():
    restricted_accounts = RestrictedAccount.query.all()
    return jsonify([{'RestrictedAccountId': ra.RestrictedAccountId, 'UserId': ra.UserId, 'RestrictReason': ra.RestrictReason, 'CreatedAt': ra.CreatedAt} for ra in restricted_accounts])

@cross_origin # implementa CORS
@app.route('/restricted_accounts/<int:restricted_account_id>', methods=['GET'])
@jwt_required() # con este metodo se protege la ruta

def get_restricted_account(restricted_account_id):
    restricted_account = RestrictedAccount.query.get_or_404(restricted_account_id)
    return jsonify({'RestrictedAccountId': restricted_account.RestrictedAccountId, 'UserId': restricted_account.UserId, 'RestrictReason': restricted_account.RestrictReason, 'CreatedAt': restricted_account.CreatedAt})

# Update
@cross_origin # implementa CORS
@app.route('/restricted_accounts/<int:restricted_account_id>', methods=['PUT'])
@jwt_required() # con este metodo se protege la ruta

def update_restricted_account(restricted_account_id):
    restricted_account = RestrictedAccount.query.get_or_404(restricted_account_id)
    data = request.json
    restricted_account.UserId = data.get('UserId', restricted_account.UserId)
    restricted_account.RestrictReason = data.get('RestrictReason', restricted_account.RestrictReason)
    db.session.commit()
    return jsonify({'message': 'RestrictedAccount updated successfully'})

# Delete
@cross_origin # implementa CORS
@app.route('/restricted_accounts/<int:restricted_account_id>', methods=['DELETE'])
@jwt_required() # con este metodo se protege la ruta

def delete_restricted_account(restricted_account_id):
    restricted_account = RestrictedAccount.query.get_or_404(restricted_account_id)
    db.session.delete(restricted_account)
    db.session.commit()
    return jsonify({'message': 'RestrictedAccount deleted successfully'})
