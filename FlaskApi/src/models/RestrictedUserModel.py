from models.User import db  



class RestrictedAccount(db.Model):
    __tablename__ = 'restricted_account'

    RestrictedAccountId = db.Column(db.Integer, primary_key=True)
    UserId = db.Column(db.Integer, db.ForeignKey('user.id'))
    RestrictReason = db.Column(db.String(100), nullable=False)
    CreatedAt = db.Column(db.DateTime, default=db.func.now())

    def __init__(self, UserId, RestrictReason):
        self.UserId = UserId
        self.RestrictReason = RestrictReason
