from flask import request, jsonify
from app import app
from models.User import db

from models.RolesModel import Roles
# Create
@app.route('/roles', methods=['POST'])
def create_role():
    data = request.json
    new_role = Roles(Role=data['Role'])
    db.session.add(new_role)
    db.session.commit()
    return jsonify({'message': 'Role created successfully'}), 201

# Read
@app.route('/roles', methods=['GET'])
def get_roles():
    roles = Roles.query.all()
    return jsonify([{'RoleId': r.RoleId, 'Role': r.Role} for r in roles])

@app.route('/roles/<int:role_id>', methods=['GET'])
def get_role(role_id):
    role = Roles.query.get_or_404(role_id)
    return jsonify({'RoleId': role.RoleId, 'RoleName': role.RoleName})

# Update
@app.route('/roles/<int:role_id>', methods=['PUT'])
def update_role(role_id):
    role = Roles.query.get_or_404(role_id)
    data = request.json
    role.RoleName = data.get('RoleName', role.RoleName)
    db.session.commit()
    return jsonify({'message': 'Role updated successfully'})

# Delete
@app.route('/roles/<int:role_id>', methods=['DELETE'])
def delete_role(role_id):
    role = Roles.query.get_or_404(role_id)
    db.session.delete(role)
    db.session.commit()
    return jsonify({'message': 'Role deleted successfully'})
