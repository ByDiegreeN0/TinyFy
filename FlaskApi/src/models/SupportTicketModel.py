from models.User import db

class SupportTicket(db.Model):
    __tablename__ = 'support_ticket'

    _TicketId = db.Column('TicketId', db.Integer, primary_key=True)
    _UserId = db.Column('UserId', db.Integer, db.ForeignKey('user.id'))
    _CreatedAt = db.Column('CreatedAt', db.DateTime, default=db.func.now())
    _Status = db.Column('Status', db.Boolean, default=False)
    messages = db.relationship('Messages', backref='support_ticket')

    def __init__(self, UserId, Status=False):
        self._UserId = UserId
        self._Status = Status

    @property
    def TicketId(self):
        return self._TicketId

    @property
    def UserId(self):
        return self._UserId

    @UserId.setter
    def UserId(self, value):
        self._UserId = value

    @property
    def CreatedAt(self):
        return self._CreatedAt

    @property
    def Status(self):
        return self._Status

    @Status.setter
    def Status(self, value):
        self._Status = value
