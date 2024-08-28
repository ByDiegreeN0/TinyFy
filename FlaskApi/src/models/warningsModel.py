from models.User import db

class Warnings(db.Model):
    __tablename__ = 'Warnings'

    _WarningId = db.Column('WarningId', db.Integer, primary_key=True)
    _Message = db.Column('Message', db.String(200), nullable=False)
    _CreatedAt = db.Column('CreatedAt', db.DateTime, default=db.func.now())
    _userId = db.Column('userId', db.Integer, db.ForeignKey('user.id'))

    def __init__(self, Message, userId):
        self._Message = Message
        self._userId = userId

    @property
    def WarningId(self):
        return self._WarningId

    @property
    def Message(self):
        return self._Message

    @Message.setter
    def Message(self, value):
        self._Message = value

    @property
    def CreatedAt(self):
        return self._CreatedAt

    @property
    def userId(self):
        return self._userId

    @userId.setter
    def userId(self, value):
        self._userId = value
