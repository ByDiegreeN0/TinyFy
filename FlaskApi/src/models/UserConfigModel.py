from models.User import db

class UserConfig(db.Model):
    __tablename__ = 'userConfig'

    configId = db.Column('configId', db.Integer, primary_key=True)
    TwoFactor = db.Column('TwoFactor', db.Boolean)
    CreatedAt = db.Column('CreatedAt', db.DateTime, default=db.func.now())
    UserId = db.Column('UserId', db.Integer, db.ForeignKey('user.id'))

  