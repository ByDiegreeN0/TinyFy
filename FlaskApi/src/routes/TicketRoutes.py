from flask import request, jsonify
from flask_jwt_extended import jwt_required # libreria de flask para proteger rutas

from app import app
from models.User import db

from models.SupportTicketModel import SupportTicket

# Create
@app.route('/tickets', methods=['POST'])
@jwt_required() # con este metodo se protege la ruta

def create_ticket():
    data = request.json
    new_ticket = SupportTicket(
        UserId=data.get('UserId'),
        Status=data.get('Status')
    )
    new_ticket.UserId = data.get('UserId', None)
    db.session.add(new_ticket)
    db.session.commit()
    return jsonify({'message': 'Ticket created successfully'}), 201

# Read
@app.route('/tickets', methods=['GET'])
@jwt_required() # con este metodo se protege la ruta

def get_tickets():
    tickets = SupportTicket.query.all()
    return jsonify([{
        'TicketId': t.TicketId,
        'Status': t.Status,
        'UserId': t.UserId,
        'CreatedAt': t.CreatedAt,

    } for t in tickets])

@app.route('/tickets/<int:ticket_id>', methods=['GET'])
@jwt_required() # con este metodo se protege la ruta

def get_ticket(ticket_id):
    ticket = SupportTicket.query.get_or_404(ticket_id)
    return jsonify({
        'TicketId': ticket.TicketId,
        'Status': ticket.Status,
        'UserId': ticket.UserId,
        'CreatedAt': ticket.CreatedAt,
    })

# Update
@app.route('/tickets/<int:ticket_id>', methods=['PUT'])
@jwt_required() # con este metodo se protege la ruta

def update_ticket(ticket_id):
    ticket = SupportTicket.query.get_or_404(ticket_id)
    data = request.json
    ticket.CreatedAt = data.get('CreatedAt', ticket.CreatedAt)
    ticket.Status = data.get('Status', ticket.Status)
    ticket.UserId = data.get('UserId', ticket.UserId)
    db.session.commit()
    return jsonify({'message': 'Ticket updated successfully'})

# Delete
@app.route('/tickets/<int:ticket_id>', methods=['DELETE'])
@jwt_required() # con este metodo se protege la ruta

def delete_ticket(ticket_id):
    ticket = SupportTicket.query.get_or_404(ticket_id)
    db.session.delete(ticket)
    db.session.commit()
    return jsonify({'message': 'Ticket deleted successfully'})
