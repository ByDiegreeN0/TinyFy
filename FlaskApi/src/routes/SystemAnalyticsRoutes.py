from flask import request, jsonify
from flask_jwt_extended import jwt_required # libreria de flask para proteger rutas
from flask_cors import cross_origin # Implementa cross_origin para hacer peticiones desde afuera del api (esto deberia arreglar el app)

from models.User import db
from app import app

from models.SystemAnalyticsModel import SystemAnalytics

# Create
@cross_origin # implementa CORS
@app.route('/system-analytics', methods=['POST'])
@jwt_required() # con este metodo se protege la ruta

def create_system_analytics():
    data = request.json
    new_analytics = SystemAnalytics(
        AmountEarned=data['AmountEarned'],
        NewUserCount=data['NewUserCount'],
        DeletedUserCount=data['DeletedUserCount']
    )
    db.session.add(new_analytics)
    db.session.commit()
    return jsonify({'message': 'System Analytics created successfully'}), 201

# Read
@cross_origin # implementa CORS
@app.route('/system-analytics', methods=['GET'])
@jwt_required() # con este metodo se protege la ruta

def get_system_analytics():
    analytics = SystemAnalytics.query.all()
    return jsonify([{
        'SystemAnalyticsId': a.SystemAnalyticsId,
        'AmountEarned': a.AmountEarned,
        'NewUserCount': a.NewUserCount,
        'DeletedUserCount': a.DeletedUserCount,
        'CreatedAt': a.CreatedAt
    } for a in analytics])

@cross_origin # implementa CORS
@app.route('/system-analytics/<int:analytics_id>', methods=['GET'])
@jwt_required() # con este metodo se protege la ruta

def get_system_analytics_by_id(analytics_id):
    analytics = SystemAnalytics.query.get_or_404(analytics_id)
    return jsonify({
        'SystemAnalyticsId': analytics.SystemAnalyticsId,
        'AmountEarned': analytics.AmountEarned,
        'NewUserCount': analytics.NewUserCount,
        'DeletedUserCount': analytics.DeletedUserCount,
        'CreatedAt': analytics.CreatedAt
    })

# Update
@cross_origin # implementa CORS
@app.route('/system-analytics/<int:analytics_id>', methods=['PUT'])
@jwt_required() # con este metodo se protege la ruta

def update_system_analytics(analytics_id):
    analytics = SystemAnalytics.query.get_or_404(analytics_id)
    data = request.json
    if 'AmountEarned' in data:
        analytics.AmountEarned = data['AmountEarned']
    if 'NewUserCount' in data:
        analytics.NewUserCount = data['NewUserCount']
    if 'DeletedUserCount' in data:
        analytics.DeletedUserCount = data['DeletedUserCount']
    db.session.commit()
    return jsonify({'message': 'System Analytics updated successfully'})

# Delete
@cross_origin # implementa CORS
@app.route('/system-analytics/<int:analytics_id>', methods=['DELETE'])
@jwt_required() # con este metodo se protege la ruta

def delete_system_analytics(analytics_id):
    analytics = SystemAnalytics.query.get_or_404(analytics_id)
    db.session.delete(analytics)
    db.session.commit()
    return jsonify({'message': 'System Analytics deleted successfully'})
