from models.User import db

class UserConfig(db.Model):
    __tablename__ = 'userConfig'

    _configId = db.Column('configId', db.Integer, primary_key=True)
    _TwoFactor = db.Column('TwoFactor', db.Boolean)
    _CreatedAt = db.Column('CreatedAt', db.DateTime, default=db.func.now())
    _UserId = db.Column('UserId', db.Integer, db.ForeignKey('user.id'))

    def __init__(self, TwoFactor):
        self._TwoFactor = TwoFactor

    @property
    def configId(self):
        return self._configId

    @property
    def TwoFactor(self):
        return self._TwoFactor

    @TwoFactor.setter
    def TwoFactor(self, value):
        self._TwoFactor = value

    @property
    def CreatedAt(self):
        return self._CreatedAt

    @property
    def UserId(self):
        return self._UserId

    @UserId.setter
    def UserId(self, value):
        self._UserId = value
