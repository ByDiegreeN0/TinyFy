from models.User import db

class PayoutLog(db.Model):
    __tablename__ = 'Payout_Log'

    _PayoutLogId = db.Column('PayoutLogId', db.Integer, primary_key=True)
    _PayoutAmount = db.Column('PayoutAmount', db.Numeric(precision=10, scale=2), nullable=False)
    _PayoutRequestedAt = db.Column('PayoutRequestedAt', db.DateTime, default=db.func.now())
    _PayoutDoneAt = db.Column('PayoutDoneAt', db.DateTime)
    _PayoutStatus = db.Column('PayoutStatus', db.String(15))
    _PayoutConfigId = db.Column('PayoutConfigId', db.Integer, db.ForeignKey('Payout_Data.PayoutDataId'))
    _UserId = db.Column('UserId', db.Integer, db.ForeignKey('user.id'))

    def __init__(self, PayoutAmount, PayoutRequestedAt, PayoutDoneAt, PayoutStatus):
        self._PayoutAmount = PayoutAmount
        self._PayoutRequestedAt = PayoutRequestedAt
        self._PayoutDoneAt = PayoutDoneAt
        self._PayoutStatus = PayoutStatus

    @property
    def PayoutLogId(self):
        return self._PayoutLogId

    @property
    def PayoutAmount(self):
        return self._PayoutAmount

    @PayoutAmount.setter
    def PayoutAmount(self, value):
        self._PayoutAmount = value

    @property
    def PayoutRequestedAt(self):
        return self._PayoutRequestedAt

    @property
    def PayoutDoneAt(self):
        return self._PayoutDoneAt

    @PayoutDoneAt.setter
    def PayoutDoneAt(self, value):
        self._PayoutDoneAt = value

    @property
    def PayoutStatus(self):
        return self._PayoutStatus

    @PayoutStatus.setter
    def PayoutStatus(self, value):
        self._PayoutStatus = value
