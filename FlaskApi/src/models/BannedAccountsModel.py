from models.User import db

class BannedAccount(db.Model):
    __tablename__ = 'banned_accounts'

    BannedAccountId = db.Column('BannedAccountId', db.Integer, primary_key=True)
    UserId = db.Column('UserId', db.Integer, db.ForeignKey('user.id'))
    BanReason = db.Column('BanReason', db.String(100), nullable=False)
    CreatedAt = db.Column('CreatedAt', db.DateTime, default=db.func.now())


