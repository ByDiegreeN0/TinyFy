from models.User import db

class BannedAccount(db.Model):
    __tablename__ = 'banned_accounts'

    _BannedAccountId = db.Column('BannedAccountId', db.Integer, primary_key=True)
    _UserId = db.Column('UserId', db.Integer, db.ForeignKey('user.id'))
    _BanReason = db.Column('BanReason', db.String(100), nullable=False)
    _CreatedAt = db.Column('CreatedAt', db.DateTime, default=db.func.now())

    def __init__(self, UserId, BanReason):
        self._UserId = UserId
        self._BanReason = BanReason

    @property
    def BannedAccountId(self):
        return self._BannedAccountId

    @property
    def UserId(self):
        return self._UserId

    @UserId.setter
    def UserId(self, value):
        self._UserId = value

    @property
    def BanReason(self):
        return self._BanReason

    @BanReason.setter
    def BanReason(self, value):
        self._BanReason = value

    @property
    def CreatedAt(self):
        return self._CreatedAt
