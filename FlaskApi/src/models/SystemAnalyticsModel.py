from models.User import db

class SystemAnalytics(db.Model):
    __tablename__ = 'System_Analytics'

    _SystemAnalyticsId = db.Column('SystemAnalyticsId', db.Integer, primary_key=True)
    _AmountEarned = db.Column('AmountEarned', db.Integer, nullable=False)
    _NewUserCount = db.Column('NewUserCount', db.Integer, nullable=False)
    _DeletedUserCount = db.Column('DeletedUserCount', db.Integer, nullable=False)
    _CreatedAt = db.Column('CreatedAt', db.DateTime, default=db.func.now())

    def __init__(self, AmountEarned, NewUserCount, DeletedUserCount):
        self._AmountEarned = AmountEarned
        self._NewUserCount = NewUserCount
        self._DeletedUserCount = DeletedUserCount

    @property
    def SystemAnalyticsId(self):
        return self._SystemAnalyticsId

    @property
    def AmountEarned(self):
        return self._AmountEarned

    @AmountEarned.setter
    def AmountEarned(self, value):
        self._AmountEarned = value

    @property
    def NewUserCount(self):
        return self._NewUserCount

    @NewUserCount.setter
    def NewUserCount(self, value):
        self._NewUserCount = value

    @property
    def DeletedUserCount(self):
        return self._DeletedUserCount

    @DeletedUserCount.setter
    def DeletedUserCount(self, value):
        self._DeletedUserCount = value

    @property
    def CreatedAt(self):
        return self._CreatedAt
