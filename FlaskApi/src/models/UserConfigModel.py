from models.User import db  

class userConfig(db.Model):
    __tablename__ = 'userConfig'

    configId = db.Column(db.Integer, primary_key = True)
    TwoFactor = db.Column(db.Boolean)
    CreatedAt = db.Column(db.DateTime, default=db.func.now())
    UserId = db.Column(db.Integer, db.ForeignKey('user.id'))

    def __init__(self,TwoFactor):
        self.TwoFactor = TwoFactor