from models.User import db

class Roles(db.Model):
    __tablename__ = 'roles'

    _RoleId = db.Column('RoleId', db.Integer, primary_key=True)
    _Role = db.Column('Role', db.String(50), nullable=False)
    _CreatedAt = db.Column('CreatedAt', db.DateTime, default=db.func.now())
    users = db.relationship('User', backref='roles')

    def __init__(self, Role, CreatedAt=None):
        self._Role = Role
        if CreatedAt:
            self._CreatedAt = CreatedAt

    @property
    def RoleId(self):
        return self._RoleId

    @property
    def Role(self):
        return self._Role

    @Role.setter
    def Role(self, value):
        self._Role = value

    @property
    def CreatedAt(self):
        return self._CreatedAt
