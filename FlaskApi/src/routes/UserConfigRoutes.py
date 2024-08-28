from flask import request, jsonify
from app import app
from models.User import db

from models.UserConfigModel import UserConfig
# Create


@app.route('/user_config', methods=['POST'])
def create_user_config():
    data = request.json
    new_user_config = UserConfig(TwoFactor=data['TwoFactor'])
    new_user_config.UserId = data.get('UserId', None)
    db.session.add(new_user_config)
    db.session.commit()
    return jsonify({'message': 'UserConfig created successfully'}), 201

# Read
@app.route('/user_config', methods=['GET'])
def get_user_configs():
    user_configs = UserConfig.query.all()
    return jsonify([{'configId': uc.configId, 'TwoFactor': uc.TwoFactor, 'UserId': uc.UserId} for uc in user_configs])

@app.route('/user_config/<int:config_id>', methods=['GET'])
def get_user_config(config_id):
    user_config = UserConfig.query.get_or_404(config_id)
    return jsonify({'configId': user_config.configId, 'TwoFactor': user_config.TwoFactor, 'UserId': user_config.UserId})

# Update
@app.route('/user_config/<int:config_id>', methods=['PUT'])
def update_user_config(config_id):
    user_config = UserConfig.query.get_or_404(config_id)
    data = request.json
    user_config.TwoFactor = data.get('TwoFactor', user_config.TwoFactor)
    user_config.UserId = data.get('UserId', user_config.UserId)
    db.session.commit()
    return jsonify({'message': 'UserConfig updated successfully'})

# Delete
@app.route('/user_config/<int:config_id>', methods=['DELETE'])
def delete_user_config(config_id):
    user_config = UserConfig.query.get_or_404(config_id)
    db.session.delete(user_config)
    db.session.commit()
    return jsonify({'message': 'UserConfig deleted successfully'})
