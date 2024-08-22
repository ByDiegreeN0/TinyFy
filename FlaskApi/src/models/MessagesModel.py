from flask_sqlalchemy import SQLAlchemy
from models.User import db  



class Messages(db.Model):
    __tablename__ = 'messages'

    MessageId = db.Column(db.Integer, primary_key=True)
    TicketId = db.Column(db.Integer, db.ForeignKey('support_ticket.TicketId'))
    Message = db.Column(db.String(250), nullable=False)
    CreatedAt = db.Column(db.DateTime, default=db.func.now())

    def __init__(self, TicketId, Message):
        self.TicketId = TicketId
        self.Message = Message
