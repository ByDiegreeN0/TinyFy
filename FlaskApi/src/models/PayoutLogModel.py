from flask_sqlalchemy import SQLAlchemy
from models.User import db  

class PayoutLog(db.PayoutLog):
    __tablename__ = 'Payout_Log'

    PayoutLogId = db.column(db.Integer, PrimaryKey = True)
    PayoutConfigId = db.column(db.Integer, db.Foreign_Key('Payout_Data.PayoutDataId'))
    UserId = db.column(db.Integer, db.Foreign_Key('user.id'))
    CreatedAt = db.column(db.datetime, default=db.func.now())
    PayoutAmount = db.column(db.Numeric(precision=10, scale=2), nullable = False)

    def __init__(self, PayoutAmount):

        self.PayoutAmount = PayoutAmount
 

    