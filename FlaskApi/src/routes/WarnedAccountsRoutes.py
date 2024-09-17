from flask import request, jsonify
from flask_jwt_extended import jwt_required # libreria de flask para proteger rutas
from app import app
from models.User import db

from models.WarnedAccountsModel import WarnedAccount

# Create
@app.route('/warned_accounts', methods=['POST'])
@jwt_required() # con este metodo se protege la ruta

def create_warned_account():
    data = request.json
    new_warned_account = WarnedAccount(UserId=data['UserId'], WarnedDate=data.get('WarnedDate'))
    db.session.add(new_warned_account)
    db.session.commit()
    return jsonify({'message': 'WarnedAccount created successfully'}), 201

# Read
@app.route('/warned_accounts', methods=['GET'])
@jwt_required() # con este metodo se protege la ruta

def get_warned_accounts():
    warned_accounts = WarnedAccount.query.all()
    return jsonify([{'WarnedAccountsId': wa.WarnedAccountsId, 'UserId': wa.UserId, 'WarnedDate': wa.WarnedDate} for wa in warned_accounts])

@app.route('/warned_accounts/<int:warned_accounts_id>', methods=['GET'])
@jwt_required() # con este metodo se protege la ruta

def get_warned_account(warned_accounts_id):
    warned_account = WarnedAccount.query.get_or_404(warned_accounts_id)
    return jsonify({'WarnedAccountsId': warned_account.WarnedAccountsId, 'UserId': warned_account.UserId, 'WarnedDate': warned_account.WarnedDate})

# Update
@app.route('/warned_accounts/<int:warned_accounts_id>', methods=['PUT'])
@jwt_required() # con este metodo se protege la ruta

def update_warned_account(warned_accounts_id):
    warned_account = WarnedAccount.query.get_or_404(warned_accounts_id)
    data = request.json
    warned_account.UserId = data.get('UserId', warned_account.UserId)
    warned_account.WarnedDate = data.get('WarnedDate', warned_account.WarnedDate)
    db.session.commit()
    return jsonify({'message': 'WarnedAccount updated successfully'})

# Delete
@app.route('/warned_accounts/<int:warned_accounts_id>', methods=['DELETE'])
@jwt_required() # con este metodo se protege la ruta

def delete_warned_account(warned_accounts_id):
    warned_account = WarnedAccount.query.get_or_404(warned_accounts_id)
    db.session.delete(warned_account)
    db.session.commit()
    return jsonify({'message': 'WarnedAccount deleted successfully'})
