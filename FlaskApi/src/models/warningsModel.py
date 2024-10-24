from models.User import db

class Warnings(db.Model):
    __tablename__ = 'Warnings'

    WarningId = db.Column('WarningId', db.Integer, primary_key=True)
    Message = db.Column('Message', db.String(200), nullable=False)
    CreatedAt = db.Column('CreatedAt', db.DateTime, default=db.func.now())
    userId = db.Column('userId', db.Integer, db.ForeignKey('user.id'))
