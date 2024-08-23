from flask_sqlalchemy import SQLAlchemy
from models.User import db  

class userConfig(db.userConfig):
    __tablename__ = 'userConfig'

    configId = db.column(db.Integer, PrimaryKey = True)
    TwoFactor = db.column(db.Boolean)
    CreatedAt = db.column(db.datetime, default=db.func.now())
    UserId = db.column(db.Integer, db.Foreign_Key('user.id'))

    def __init__(self,TwoFactor):
        self.TwoFactor = TwoFactor