from models.User import db

class Messages(db.Model):
    __tablename__ = 'messages'

    _MessageId = db.Column('MessageId', db.Integer, primary_key=True)
    _TicketId = db.Column('TicketId', db.Integer, db.ForeignKey('support_ticket.TicketId'))
    _Message = db.Column('Message', db.String(250), nullable=False)
    _CreatedAt = db.Column('CreatedAt', db.DateTime, default=db.func.now())

    def __init__(self, TicketId, Message):
        self._TicketId = TicketId
        self._Message = Message

    @property
    def MessageId(self):
        return self._MessageId

    @property
    def TicketId(self):
        return self._TicketId

    @TicketId.setter
    def TicketId(self, value):
        self._TicketId = value

    @property
    def Message(self):
        return self._Message

    @Message.setter
    def Message(self, value):
        self._Message = value

    @property
    def CreatedAt(self):
        return self._CreatedAt
