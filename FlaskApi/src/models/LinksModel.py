from flask_sqlalchemy import SQLAlchemy
from models.User import db  

class Links(db.Model):
    __tablename__='Links'

    LinkId = db.Column(db.Integer, primary_key = True)
    LinkUrl = db.Column(db.String(50), nullable = False)
    CreatedAt = db.Column(db.DateTime, default=db.func.now())
    ClickCount = db.Column(db.Integer, nullable = False)
    DailyViewCount = db.Column(db.Integer, nullable = False)
    MonthlyViewCount = db.Column(db.Integer, nullable = False)
    YearlyViewCount = db.Column(db.Integer, nullable = False)

    def __init__(self, LinkUrl,  ClickCount, DailyViewCount, MonthlyViewCount, YearlyViewCount, CreatedAt = None):

        self.LinkUrl = LinkUrl
        self.ClickCount = ClickCount
        self.DailyViewCount = DailyViewCount
        self.MonthlyViewCount = MonthlyViewCount
        self.YearlyViewCount = YearlyViewCount
        if CreatedAt:
            self.CreatedAt = CreatedAt
