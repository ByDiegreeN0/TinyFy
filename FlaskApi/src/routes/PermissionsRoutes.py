from flask import request, jsonify
from flask_jwt_extended import jwt_required # libreria de flask para proteger rutas
from app import app
from models.User import db

from models.PermissionModel import Permissions

# Create
@app.route('/permissions', methods=['POST'])
@jwt_required() # con este metodo se protege la ruta

def create_permission():
    data = request.json
    new_permission = Permissions(Permission_Desc=data['Permission_Desc'])
    new_permission.userId = data.get('userId', None)
    db.session.add(new_permission)
    db.session.commit()
    return jsonify({'message': 'Permission created successfully'}), 201

# Read
@app.route('/permissions', methods=['GET'])
@jwt_required() # con este metodo se protege la ruta

def get_permissions():
    permissions = Permissions.query.all()
    return jsonify([{'PermissionsId': p.PermissionsId, 'Permission_Desc': p.Permission_Desc, 'CreatedAt': p.CreatedAt, 'userId': p.userId} for p in permissions])

@app.route('/permissions/<int:permission_id>', methods=['GET'])
@jwt_required() # con este metodo se protege la ruta

def get_permission(permission_id):
    permission = Permissions.query.get_or_404(permission_id)
    return jsonify({'PermissionsId': permission.PermissionsId, 'Permission_Desc': permission.Permission_Desc, 'CreatedAt': permission.CreatedAt, 'userId': permission.userId})

# Update
@app.route('/permissions/<int:permission_id>', methods=['PUT'])
@jwt_required() # con este metodo se protege la ruta

def update_permission(permission_id):
    permission = Permissions.query.get_or_404(permission_id)
    data = request.json
    permission.Permission_Desc = data.get('Permission_Desc', permission.Permission_Desc)
    permission.userId = data.get('userId', permission.userId)
    db.session.commit()
    return jsonify({'message': 'Permission updated successfully'})

# Delete
@app.route('/permissions/<int:permission_id>', methods=['DELETE'])
@jwt_required() # con este metodo se protege la ruta

def delete_permission(permission_id):
    permission = Permissions.query.get_or_404(permission_id)
    db.session.delete(permission)
    db.session.commit()
    return jsonify({'message': 'Permission deleted successfully'})
