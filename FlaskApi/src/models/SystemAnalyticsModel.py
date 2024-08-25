from flask_sqlalchemy import SQLAlchemy
from models.User import db  

class SystemAnalytics(db.SystemAnalytics):
    __tablename__ = ('System Analytics')


    SystemAnalyticsId = db.column(db.Integer, PrimaryKey = True)
    AmountEarned = db.column(db.Integer, nullable = False)
    NewUserCount = db.column(db.Integer, nullable = False)
    DeletedUserCount = db.column(db.Integer, nullable = False)
    CreatedAt = db.column(db.Datetime, default=db.func.now())

    def __init__(self, AmountEarned, NewUserCount, DeletedUserCount):

        self.AmountEarned = AmountEarned
        self.NewUserCount = NewUserCount
        self.DeletedUserCount = DeletedUserCount