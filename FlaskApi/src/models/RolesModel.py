from models.User import db

class Roles(db.Model):
    __tablename__ = 'roles'

    RoleId = db.Column('RoleId', db.Integer, primary_key=True)
    Role = db.Column('Role', db.String(50), nullable=False)
    CreatedAt = db.Column('CreatedAt', db.DateTime, default=db.func.now())
    users = db.relationship('User', backref='roles')
