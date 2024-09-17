from models.User import db

class Permissions(db.Model):
    __tablename__ = 'Permissions'

    _PermissionsId = db.Column('PermissionsId', db.Integer, primary_key=True)
    _Permission_Desc = db.Column('Permission_Desc', db.String(40), nullable=False)
    _CreatedAt = db.Column('CreatedAt', db.DateTime, default=db.func.now())
    _userId = db.Column('userId', db.Integer, db.ForeignKey('user.id'))

    def __init__(self, Permission_Desc):
        self._Permission_Desc = Permission_Desc

    @property
    def PermissionsId(self):
        return self._PermissionsId

    @property
    def Permission_Desc(self):
        return self._Permission_Desc

    @Permission_Desc.setter
    def Permission_Desc(self, value):
        self._Permission_Desc = value

    @property
    def CreatedAt(self):
        return self._CreatedAt

    @property
    def userId(self):
        return self._userId

    @userId.setter
    def userId(self, value):
        self._userId = value
