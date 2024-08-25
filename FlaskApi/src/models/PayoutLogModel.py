from flask_sqlalchemy import SQLAlchemy
from models.User import db  

class PayoutLog(db.Model):
    __tablename__ = 'Payout_Log'

    PayoutLogId = db.Column(db.Integer, primary_key = True)
    PayoutConfigId = db.Column(db.Integer, db.ForeignKey('Payout_Data.PayoutDataId'))
    UserId = db.Column(db.Integer, db.ForeignKey('user.id'))
    CreatedAt = db.Column(db.DateTime, default=db.func.now())
    PayoutAmount = db.Column(db.Numeric(precision=10, scale=2), nullable = False)

    def __init__(self, PayoutAmount):

        self.PayoutAmount = PayoutAmount
 

    