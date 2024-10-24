from models.User import db

class Permissions(db.Model):
    __tablename__ = 'Permissions'

    PermissionsId = db.Column('PermissionsId', db.Integer, primary_key=True)
    Permission_Desc = db.Column('Permission_Desc', db.String(40), nullable=False)
    CreatedAt = db.Column('CreatedAt', db.DateTime, default=db.func.now())
    userId = db.Column('userId', db.Integer, db.ForeignKey('user.id'))