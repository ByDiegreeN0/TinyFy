from flask_sqlalchemy import SQLAlchemy
from models.User import db  



class UserReferralLink(db.Model):
    __tablename__ = 'user_referral_link'

    ReferralLinkId = db.Column(db.Integer, primary_key=True)
    UserId = db.Column(db.Integer, db.ForeignKey('user.id'))
    ReferralLink = db.Column(db.String(100), unique=True)
    ReferralCount = db.Column(db.Integer, default=0)
    CreatedAt = db.Column(db.DateTime, default=db.func.now())

    def __init__(self, UserId, ReferralLink, ReferralCount=0):
        self.UserId = UserId
        self.ReferralLink = ReferralLink
        self.ReferralCount = ReferralCount
