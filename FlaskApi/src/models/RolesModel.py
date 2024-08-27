from models.User import db  



class Roles(db.Model):
    __tablename__ = 'roles'

    RoleId = db.Column(db.Integer, primary_key=True)
    Role = db.Column(db.String(50), nullable=False) 
    CreatedAt = db.Column(db.DateTime, default=db.func.now())
    users = db.relationship('User', backref='roles')

    def __init__(self, Role, CreatedAt=None):
        self.Role = Role 
        if CreatedAt:
            self.CreatedAt = CreatedAt