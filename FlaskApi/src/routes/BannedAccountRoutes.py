from flask import request, jsonify
from flask_jwt_extended import jwt_required # libreria de flask para proteger rutas

from app import app
from models.User import db
from models.BannedAccountsModel import BannedAccount


# Create
@app.route('/banned_accounts', methods=['POST'])
@jwt_required() # con este metodo se protege la ruta

def create_banned_account():
    data = request.json
    new_banned_account = BannedAccount(UserId=data['UserId'], BanReason=data['BanReason'])
    db.session.add(new_banned_account)
    db.session.commit()
    return jsonify({'message': 'BannedAccount created successfully'}), 201

# Read
@app.route('/banned_accounts', methods=['GET'])
@jwt_required() # con este metodo se protege la ruta

def get_banned_accounts():
    banned_accounts = BannedAccount.query.all()
    return jsonify([{'BannedAccountId': ba.BannedAccountId, 'UserId': ba.UserId, 'BanReason': ba.BanReason, 'CreatedAt': ba.CreatedAt} for ba in banned_accounts])

@app.route('/banned_accounts/<int:banned_account_id>', methods=['GET'])
@jwt_required() # con este metodo se protege la ruta

def get_banned_account(banned_account_id):
    banned_account = BannedAccount.query.get_or_404(banned_account_id)
    return jsonify({'BannedAccountId': banned_account.BannedAccountId, 'UserId': banned_account.UserId, 'BanReason': banned_account.BanReason, 'CreatedAt': banned_account.CreatedAt})

# Update
@app.route('/banned_accounts/<int:banned_account_id>', methods=['PUT'])
@jwt_required() # con este metodo se protege la ruta

def update_banned_account(banned_account_id):
    banned_account = BannedAccount.query.get_or_404(banned_account_id)
    data = request.json
    banned_account.UserId = data.get('UserId', banned_account.UserId)
    banned_account.BanReason = data.get('BanReason', banned_account.BanReason)
    db.session.commit()
    return jsonify({'message': 'BannedAccount updated successfully'})

# Delete
@app.route('/banned_accounts/<int:banned_account_id>', methods=['DELETE'])
@jwt_required() # con este metodo se protege la ruta

def delete_banned_account(banned_account_id):
    banned_account = BannedAccount.query.get_or_404(banned_account_id)
    db.session.delete(banned_account)
    db.session.commit()
    return jsonify({'message': 'BannedAccount deleted successfully'})
