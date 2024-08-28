from models.User import db

class WarnedAccount(db.Model):
    __tablename__ = 'warned_accounts'

    _WarnedAccountsId = db.Column('WarnedAccountsId', db.Integer, primary_key=True)
    _UserId = db.Column('UserId', db.Integer, db.ForeignKey('user.id'), nullable=False)
    _WarnedDate = db.Column('WarnedDate', db.DateTime, default=db.func.now())

    def __init__(self, UserId, WarnedDate=None):
        self._UserId = UserId
        if WarnedDate:
            self._WarnedDate = WarnedDate

    @property
    def WarnedAccountsId(self):
        return self._WarnedAccountsId

    @property
    def UserId(self):
        return self._UserId

    @UserId.setter
    def UserId(self, value):
        self._UserId = value

    @property
    def WarnedDate(self):
        return self._WarnedDate

    @WarnedDate.setter
    def WarnedDate(self, value):
        self._WarnedDate = value
