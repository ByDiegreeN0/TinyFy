from flask import request, jsonify
from app import app
from models.User import db

from models.warningsModel import Warnings

# Create
@app.route('/warnings', methods=['POST'])
def create_warning():
    data = request.json
    new_warning = Warnings(Message=data['Message'], userId=data['userId'])
    db.session.add(new_warning)
    db.session.commit()
    return jsonify({'message': 'Warning created successfully'}), 201

# Read
@app.route('/warnings', methods=['GET'])
def get_warnings():
    warnings = Warnings.query.all()
    return jsonify([{'WarningId': w.WarningId, 'Message': w.Message, 'CreatedAt': w.CreatedAt, 'userId': w.userId} for w in warnings])

@app.route('/warnings/<int:warning_id>', methods=['GET'])
def get_warning(warning_id):
    warning = Warnings.query.get_or_404(warning_id)
    return jsonify({'WarningId': warning.WarningId, 'Message': warning.Message, 'CreatedAt': warning.CreatedAt, 'userId': warning.userId})

# Update
@app.route('/warnings/<int:warning_id>', methods=['PUT'])
def update_warning(warning_id):
    warning = Warnings.query.get_or_404(warning_id)
    data = request.json
    warning.Message = data.get('Message', warning.Message)
    warning.userId = data.get('userId', warning.userId)
    db.session.commit()
    return jsonify({'message': 'Warning updated successfully'})

# Delete
@app.route('/warnings/<int:warning_id>', methods=['DELETE'])
def delete_warning(warning_id):
    warning = Warnings.query.get_or_404(warning_id)
    db.session.delete(warning)
    db.session.commit()
    return jsonify({'message': 'Warning deleted successfully'})
