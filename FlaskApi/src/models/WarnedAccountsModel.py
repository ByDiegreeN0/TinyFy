from models.User import db  



class WarnedAccount(db.Model):
    __tablename__ = 'warned_accounts'

    WarnedAccountsId = db.Column(db.Integer, primary_key=True)
    UserId = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    WarnedDate = db.Column(db.DateTime, default=db.func.now())

    def __init__(self, UserId, WarnedDate=None):
        self.UserId = UserId
        if WarnedDate:
            self.WarnedDate = WarnedDate
