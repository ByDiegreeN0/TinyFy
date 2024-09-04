from flask import request, jsonify
from app import app
from models.User import db

from models.RestrictedUserModel import RestrictedAccount


# Create
@app.route('/restricted_accounts', methods=['POST'])
def create_restricted_account():
    data = request.json
    new_restricted_account = RestrictedAccount(UserId=data['UserId'], RestrictReason=data['RestrictReason'])
    db.session.add(new_restricted_account)
    db.session.commit()
    return jsonify({'message': 'RestrictedAccount created successfully'}), 201

# Read
@app.route('/restricted_accounts', methods=['GET'])
def get_restricted_accounts():
    restricted_accounts = RestrictedAccount.query.all()
    return jsonify([{'RestrictedAccountId': ra.RestrictedAccountId, 'UserId': ra.UserId, 'RestrictReason': ra.RestrictReason, 'CreatedAt': ra.CreatedAt} for ra in restricted_accounts])

@app.route('/restricted_accounts/<int:restricted_account_id>', methods=['GET'])
def get_restricted_account(restricted_account_id):
    restricted_account = RestrictedAccount.query.get_or_404(restricted_account_id)
    return jsonify({'RestrictedAccountId': restricted_account.RestrictedAccountId, 'UserId': restricted_account.UserId, 'RestrictReason': restricted_account.RestrictReason, 'CreatedAt': restricted_account.CreatedAt})

# Update
@app.route('/restricted_accounts/<int:restricted_account_id>', methods=['PUT'])
def update_restricted_account(restricted_account_id):
    restricted_account = RestrictedAccount.query.get_or_404(restricted_account_id)
    data = request.json
    restricted_account.UserId = data.get('UserId', restricted_account.UserId)
    restricted_account.RestrictReason = data.get('RestrictReason', restricted_account.RestrictReason)
    db.session.commit()
    return jsonify({'message': 'RestrictedAccount updated successfully'})

# Delete
@app.route('/restricted_accounts/<int:restricted_account_id>', methods=['DELETE'])
def delete_restricted_account(restricted_account_id):
    restricted_account = RestrictedAccount.query.get_or_404(restricted_account_id)
    db.session.delete(restricted_account)
    db.session.commit()
    return jsonify({'message': 'RestrictedAccount deleted successfully'})
