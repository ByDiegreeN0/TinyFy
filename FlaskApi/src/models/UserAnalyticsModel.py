from models.User import db, User

class UserAnalytics(db.Model):
    __tablename__ = 'User_Analytics'
    
    AnalyticID = db.Column(db.Integer, primary_key=True)
    UserId = db.Column(db.Integer, db.ForeignKey('user.id'))
    AnalyticType = db.Column(db.String(10), default="undefined")  # Define un valor por defecto
    User_LinksCreated = db.Column(db.Integer, default=0)  # Valor por defecto
    User_Earning = db.Column(db.Integer, default=0)  # Valor por defecto
    CreatedAt = db.Column(db.DateTime, default=db.func.now())  # Valor por defecto para la fecha
    Usernumberclicks = db.Column(db.Integer, default=0)
    

