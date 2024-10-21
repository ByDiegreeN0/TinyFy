from models.User import db, User

class UserAnalytics(db.Model):
    __tablename__ = 'User_Analytics'
    
    AnalyticID = db.Column(db.Integer, primary_key=True)
    UserId = db.Column(db.Integer, db.ForeignKey('user.id'))
    AnalyticType = db.Column(db.String(10))
    User_LinksCreated = db.Column(db.Integer)
    User_Earning = db.Column(db.Integer)
    CreatedAt = db.Column(db.DateTime, default=db.func.now())
    
    def __init__(self, UserId, AnalyticType, User_LinksCreated, User_Earning=0):
        self.UserId = UserId
        self.AnalyticType = AnalyticType
        self.User_LinksCreated = User_LinksCreated
        self.User_Earning = User_Earning
