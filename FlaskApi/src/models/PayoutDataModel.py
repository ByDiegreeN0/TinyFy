from flask_sqlalchemy import SQLAlchemy
from models.User import db  

class Payout_Data(db.Model):
    __tablename__= 'Payout_Data'

    PayoutDataId = db.column(db.Integer, Primary_Key = True)
    WithDrawId = db.column(db.Integer, db.Foreign_key())
    Name = db.column(db.String(20), nullable = False)
    Method = db.column(db.String(10), nullable = False)
    AccountNumber = db.column(db.String(20), nullable = False)
    PayoutAmount = db.column(db.Numeric(precision=10, scale=2), nullable = False)
    PayoutCurrency = db.column(db.String(200))
    CreateAt = db.column(db.datetime, default=db.func.now())

    def __init__(self, Name, Method, AccountNumber, PayoutAmount, PayoutCurrency):
        self.Name = Name
        self.Method = Method
        self.AccountNumber = AccountNumber
        self.PayoutAmount = PayoutAmount
        self.PayoutCurrency = PayoutCurrency
