from flask_sqlalchemy import SQLAlchemy
from models.User import db  


class CPM(db.Model):
    
    __tablename__ = 'CPM'

    cpmId = db.Column(db.Integer, primary_key = True)
    cpm = db.Column(db.Integer)
    CreatedAt = db.Column(db.DateTime, default=db.func.now())
    
    def __init__(self, cpmId, cpm, CreatedAt):
        
        self.cpmId = cpmId
        self.cpm = cpm
        
        
    
    