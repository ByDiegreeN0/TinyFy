from flask import request, jsonify
from flask_jwt_extended import jwt_required # libreria de flask para proteger rutas
from flask_cors import cross_origin # Implementa cross_origin para hacer peticiones desde afuera del api (esto deberia arreglar el app)

from app import app
from models.User import db

from models.warningsModel import Warnings

# Create
@cross_origin # implementa CORS
@app.route('/warnings', methods=['POST'])
@jwt_required() # con este metodo se protege la ruta

def create_warning():
    data = request.json
    new_warning = Warnings(Message=data['Message'], userId=data['userId'])
    db.session.add(new_warning)
    db.session.commit()
    return jsonify({'message': 'Warning created successfully'}), 201

# Read
@cross_origin # implementa CORS
@app.route('/warnings', methods=['GET'])
@jwt_required() # con este metodo se protege la ruta

def get_warnings():
    warnings = Warnings.query.all()
    return jsonify([{'WarningId': w.WarningId, 'Message': w.Message, 'CreatedAt': w.CreatedAt, 'userId': w.userId} for w in warnings])

@cross_origin # implementa CORS
@app.route('/warnings/<int:warning_id>', methods=['GET'])
@jwt_required() # con este metodo se protege la ruta

def get_warning(warning_id):
    warning = Warnings.query.get_or_404(warning_id)
    return jsonify({'WarningId': warning.WarningId, 'Message': warning.Message, 'CreatedAt': warning.CreatedAt, 'userId': warning.userId})

# Update
@cross_origin # implementa CORS
@app.route('/warnings/<int:warning_id>', methods=['PUT'])
@jwt_required() # con este metodo se protege la ruta

def update_warning(warning_id):
    warning = Warnings.query.get_or_404(warning_id)
    data = request.json
    warning.Message = data.get('Message', warning.Message)
    warning.userId = data.get('userId', warning.userId)
    db.session.commit()
    return jsonify({'message': 'Warning updated successfully'})

# Delete
@cross_origin # implementa CORS
@app.route('/warnings/<int:warning_id>', methods=['DELETE'])
@jwt_required() # con este metodo se protege la ruta

def delete_warning(warning_id):
    warning = Warnings.query.get_or_404(warning_id)
    db.session.delete(warning)
    db.session.commit()
    return jsonify({'message': 'Warning deleted successfully'})
