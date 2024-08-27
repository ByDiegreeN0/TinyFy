from models.User import db  

class PayoutLog(db.Model):
    __tablename__ = 'Payout_Log'

    PayoutLogId = db.Column(db.Integer, primary_key = True)

    PayoutAmount = db.Column(db.Numeric(precision=10, scale=2), nullable = False)
    PayoutRequestedAt = db.Column(db.DateTime, default=db.func.now())
    PayoutDoneAt = db.Column(db.DateTime)
    PayoutStatus = db.Column(db.String(15))
    
    PayoutConfigId = db.Column(db.Integer, db.ForeignKey('Payout_Data.PayoutDataId'))
    UserId = db.Column(db.Integer, db.ForeignKey('user.id'))

    def __init__(self, PayoutAmount, PayoutRequestedAt, PayoutDoneAt, PayoutStatus):

        self.PayoutAmount = PayoutAmount
        self.PayoutRequestedAt = PayoutRequestedAt
        self.PayoutDoneAt = PayoutDoneAt
        self.PayoutStatus = PayoutStatus
 

    