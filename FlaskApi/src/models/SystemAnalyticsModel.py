from models.User import db

class SystemAnalytics(db.Model):
    __tablename__ = 'System_Analytics'

    SystemAnalyticsId = db.Column('SystemAnalyticsId', db.Integer, primary_key=True)
    AmountEarned = db.Column('AmountEarned', db.Integer, nullable=False)
    NewUserCount = db.Column('NewUserCount', db.Integer, nullable=False)
    DeletedUserCount = db.Column('DeletedUserCount', db.Integer, nullable=False)
    CreatedAt = db.Column('CreatedAt', db.DateTime, default=db.func.now())

    def __init__(self, AmountEarned, NewUserCount, DeletedUserCount):
        self._AmountEarned = AmountEarned
        self._NewUserCount = NewUserCount
        self._DeletedUserCount = DeletedUserCount
