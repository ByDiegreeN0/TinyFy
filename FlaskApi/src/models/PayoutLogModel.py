from models.User import db

class PayoutLog(db.Model):
    __tablename__ = 'Payout_Log'

    PayoutLogId = db.Column('PayoutLogId', db.Integer, primary_key=True)
    PayoutAmount = db.Column('PayoutAmount', db.Numeric(precision=10, scale=2), nullable=False)
    PayoutRequestedAt = db.Column('PayoutRequestedAt', db.DateTime, default=db.func.now())
    PayoutDoneAt = db.Column('PayoutDoneAt', db.DateTime)
    PayoutStatus = db.Column('PayoutStatus', db.String(15))
    PayoutConfigId = db.Column('PayoutConfigId', db.Integer, db.ForeignKey('Payout_Data.PayoutDataId'))
    UserId = db.Column('UserId', db.Integer, db.ForeignKey('user.id'))

    