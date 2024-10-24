from models.User import db

class WarnedAccount(db.Model):
    __tablename__ = 'warned_accounts'

    WarnedAccountsId = db.Column('WarnedAccountsId', db.Integer, primary_key=True)
    UserId = db.Column('UserId', db.Integer, db.ForeignKey('user.id'), nullable=False)
    WarnedDate = db.Column('WarnedDate', db.DateTime, default=db.func.now())
