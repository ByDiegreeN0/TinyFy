from flask_sqlalchemy import SQLAlchemy
from models.User import db  

class SystemAnalytics(db.Model):
    __tablename__ = 'System_Analytics' 

    SystemAnalyticsId = db.Column(db.Integer, primary_key=True)
    AmountEarned = db.Column(db.Integer, nullable=False)
    NewUserCount = db.Column(db.Integer, nullable=False)
    DeletedUserCount = db.Column(db.Integer, nullable=False)
    CreatedAt = db.Column(db.DateTime, default=db.func.now()) 

    def __init__(self, AmountEarned, NewUserCount, DeletedUserCount):
        self.AmountEarned = AmountEarned
        self.NewUserCount = NewUserCount
        self.DeletedUserCount = DeletedUserCount
