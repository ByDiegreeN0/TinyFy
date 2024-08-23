from flask_sqlalchemy import SQLAlchemy
from models.User import db  

class Permissions(db.Permissions):
    __tablename__ = ('Permissions')

    PermissionsId = db.column(db.Integer, PrimaryKey = True)
    Permission_Desc = db.column(db.String(40), nullable = False)
    CreatedAt = db.column(db.datetime, default=db.func.now())
    userId = db.column(db.Integer, db.Foreign_Key('user.id'))

    def __init__(self,Permission_Desc):
        
        self.Permission_Desc = Permission_Desc
