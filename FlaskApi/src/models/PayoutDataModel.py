from flask_sqlalchemy import SQLAlchemy
from models.User import db  

class Payout_Data(db.Model):
    __tablename__= 'Payout_Data'

    PayoutDataId = db.Column(db.Integer, primary_key = True)
    WithDrawId = db.Column(db.Integer, db.ForeignKey('banned_accounts.UserId'))
    Name = db.Column(db.String(20), nullable = False)
    Method = db.Column(db.String(10), nullable = False)
    AccountNumber = db.Column(db.String(20), nullable = False)
    PayoutAmount = db.Column(db.Numeric(precision=10, scale=2), nullable = False)
    PayoutCurrency = db.Column(db.String(200))
    CreateAt = db.Column(db.DateTime, default=db.func.now())

    def __init__(self, Name, Method, AccountNumber, PayoutAmount, PayoutCurrency):
        self.Name = Name
        self.Method = Method
        self.AccountNumber = AccountNumber
        self.PayoutAmount = PayoutAmount
        self.PayoutCurrency = PayoutCurrency
