from models.User import db  

class Permissions(db.Model ):
    __tablename__ = 'Permissions'

    PermissionsId = db.Column(db.Integer, primary_key = True)
    Permission_Desc = db.Column(db.String(40), nullable = False)
    CreatedAt = db.Column(db.DateTime, default=db.func.now())
    userId = db.Column(db.Integer, db.ForeignKey('user.id'))

    def __init__(self,Permission_Desc):
        
        self.Permission_Desc = Permission_Desc
