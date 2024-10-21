from models.User import db

class SupportTicket(db.Model):
    __tablename__ = 'support_ticket'

    TicketId = db.Column('TicketId', db.Integer, primary_key=True)
    UserId = db.Column('UserId', db.Integer, db.ForeignKey('user.id'))
    CreatedAt = db.Column('CreatedAt', db.DateTime, default=db.func.now())
    Status = db.Column('Status', db.String(20), default=False)
    messages = db.relationship('Messages', backref='support_ticket')

  