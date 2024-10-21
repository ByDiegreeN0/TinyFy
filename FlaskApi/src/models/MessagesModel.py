from models.User import db

class Messages(db.Model):
    __tablename__ = 'messages'

    MessageId = db.Column('MessageId', db.Integer, primary_key=True)
    TicketId = db.Column('TicketId', db.Integer, db.ForeignKey('support_ticket.TicketId'))
    Message = db.Column('Message', db.String(250), nullable=False)
    CreatedAt = db.Column('CreatedAt', db.DateTime, default=db.func.now())

    