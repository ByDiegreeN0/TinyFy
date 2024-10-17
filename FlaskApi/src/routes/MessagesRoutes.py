from flask import request, jsonify
from app import app
from models.User import db
from flask_jwt_extended import jwt_required # libreria de flask para proteger rutas
from flask_cors import cross_origin # Implementa cross_origin para hacer peticiones desde afuera del api (esto deberia arreglar el app)


from models.MessagesModel import Messages

# Create
@cross_origin # implementa CORS
@app.route('/messages', methods=['POST'])
@jwt_required() # con este metodo se protege la ruta

def create_message():
    data = request.json
    new_message = Messages(TicketId=data['TicketId'], Message=data['Message'])
    db.session.add(new_message)
    db.session.commit()
    return jsonify({'message': 'Message created successfully'}), 201

# Read
@cross_origin # implementa CORS
@app.route('/messages', methods=['GET'])
@jwt_required() # con este metodo se protege la ruta
def get_messages():
    messages = Messages.query.all()
    return jsonify([{'MessageId': m.MessageId, 'TicketId': m.TicketId, 'Message': m.Message, 'CreatedAt': m.CreatedAt} for m in messages])

@cross_origin # implementa CORS
@app.route('/messages/<int:message_id>', methods=['GET'])
@jwt_required() # con este metodo se protege la ruta

def get_message(message_id):
    message = Messages.query.get_or_404(message_id)
    return jsonify({'MessageId': message.MessageId, 'TicketId': message.TicketId, 'Message': message.Message, 'CreatedAt': message.CreatedAt})

# Update
@cross_origin # implementa CORS
@app.route('/messages/<int:message_id>', methods=['PUT'])
@jwt_required() # con este metodo se protege la ruta

def update_message(message_id):
    message = Messages.query.get_or_404(message_id)
    data = request.json
    message.TicketId = data.get('TicketId', message.TicketId)
    message.Message = data.get('Message', message.Message)
    db.session.commit()
    return jsonify({'message': 'Message updated successfully'})

# Delete
@cross_origin # implementa CORS
@app.route('/messages/<int:message_id>', methods=['DELETE'])
@jwt_required() # con este metodo se protege la ruta

def delete_message(message_id):
    message = Messages.query.get_or_404(message_id)
    db.session.delete(message)
    db.session.commit()
    return jsonify({'message': 'Message deleted successfully'})
