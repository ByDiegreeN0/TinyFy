
from models.User import db  



class BannedAccount(db.Model):
    __tablename__ = 'banned_accounts'

    BannedAccountId = db.Column(db.Integer, primary_key=True)
    UserId = db.Column(db.Integer, db.ForeignKey('user.id'))
    BanReason = db.Column(db.String(100), nullable=False)
    CreatedAt = db.Column(db.DateTime, default=db.func.now())

    def __init__(self, UserId, BanReason):
        self.UserId = UserId
        self.BanReason = BanReason
