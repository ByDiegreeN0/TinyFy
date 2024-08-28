from flask import request, jsonify
from app import app
from models.User import db

from models.MessagesModel import Messages

# Create
@app.route('/messages', methods=['POST'])
def create_message():
    data = request.json
    new_message = Messages(TicketId=data['TicketId'], Message=data['Message'])
    db.session.add(new_message)
    db.session.commit()
    return jsonify({'message': 'Message created successfully'}), 201

# Read
@app.route('/messages', methods=['GET'])
def get_messages():
    messages = Messages.query.all()
    return jsonify([{'MessageId': m.MessageId, 'TicketId': m.TicketId, 'Message': m.Message, 'CreatedAt': m.CreatedAt} for m in messages])

@app.route('/messages/<int:message_id>', methods=['GET'])
def get_message(message_id):
    message = Messages.query.get_or_404(message_id)
    return jsonify({'MessageId': message.MessageId, 'TicketId': message.TicketId, 'Message': message.Message, 'CreatedAt': message.CreatedAt})

# Update
@app.route('/messages/<int:message_id>', methods=['PUT'])
def update_message(message_id):
    message = Messages.query.get_or_404(message_id)
    data = request.json
    message.TicketId = data.get('TicketId', message.TicketId)
    message.Message = data.get('Message', message.Message)
    db.session.commit()
    return jsonify({'message': 'Message updated successfully'})

# Delete
@app.route('/messages/<int:message_id>', methods=['DELETE'])
def delete_message(message_id):
    message = Messages.query.get_or_404(message_id)
    db.session.delete(message)
    db.session.commit()
    return jsonify({'message': 'Message deleted successfully'})
