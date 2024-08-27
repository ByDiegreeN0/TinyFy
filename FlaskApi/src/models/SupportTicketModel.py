from flask_sqlalchemy import SQLAlchemy
from models.User import db  



class SupportTicket(db.Model):
    __tablename__ = 'support_ticket'

    TicketId = db.Column(db.Integer, primary_key=True)
    UserId = db.Column(db.Integer, db.ForeignKey('user.id'))
    CreatedAt = db.Column(db.DateTime, default=db.func.now())
    Status = db.Column(db.Boolean, default=False)
    messages = db.relationship('Messages', backref='support_ticket')

    def __init__(self, UserId, Status=False):
        self.UserId = UserId
        self.Status = Status
