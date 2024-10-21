from models.User import db

class RestrictedAccount(db.Model):
    __tablename__ = 'restricted_account'

    RestrictedAccountId = db.Column('RestrictedAccountId', db.Integer, primary_key=True)
    UserId = db.Column('UserId', db.Integer, db.ForeignKey('user.id'))
    RestrictReason = db.Column('RestrictReason', db.String(100), nullable=False)
    CreatedAt = db.Column('CreatedAt', db.DateTime, default=db.func.now())

 