from flask_sqlalchemy import SQLAlchemy
from models.User import db  



class Referrals(db.Model):
    __tablename__ = 'referrals'

    ReferralId = db.Column(db.Integer, primary_key=True)
    UserId = db.Column(db.Integer, db.ForeignKey('user.id'))
    CreatedAt = db.Column(db.DateTime, default=db.func.now())

    def __init__(self, UserId):
        self.UserId = UserId
