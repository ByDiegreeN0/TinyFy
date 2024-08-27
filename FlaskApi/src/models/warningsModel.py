from models.User import db 

class Warnings(db.Model): 
    __tablename__ = 'Warnings'
    
    WarningId = db.Column(db.Integer, primary_key=True)  
    Message = db.Column(db.String(200), nullable=False)  
    CreatedAt = db.Column(db.DateTime, default=db.func.now())  
    userId = db.Column(db.Integer, db.ForeignKey('user.id')) 


    def __init__(self, Message,userId):
        self.Message = Message
        self.Message = userId

