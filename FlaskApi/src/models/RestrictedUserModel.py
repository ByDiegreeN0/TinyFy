from models.User import db

class RestrictedAccount(db.Model):
    __tablename__ = 'restricted_account'

    _RestrictedAccountId = db.Column('RestrictedAccountId', db.Integer, primary_key=True)
    _UserId = db.Column('UserId', db.Integer, db.ForeignKey('user.id'))
    _RestrictReason = db.Column('RestrictReason', db.String(100), nullable=False)
    _CreatedAt = db.Column('CreatedAt', db.DateTime, default=db.func.now())

    def __init__(self, UserId, RestrictReason):
        self._UserId = UserId
        self._RestrictReason = RestrictReason

    @property
    def RestrictedAccountId(self):
        return self._RestrictedAccountId

    @property
    def UserId(self):
        return self._UserId

    @UserId.setter
    def UserId(self, value):
        self._UserId = value

    @property
    def RestrictReason(self):
        return self._RestrictReason

    @RestrictReason.setter
    def RestrictReason(self, value):
        self._RestrictReason = value

    @property
    def CreatedAt(self):
        return self._CreatedAt
