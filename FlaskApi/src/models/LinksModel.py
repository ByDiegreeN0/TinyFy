from flask_sqlalchemy import SQLAlchemy
from models.User import db  

class Links(db.Links):
    __tablename__='Links'

    LinkId = db.column(db.Integer, PrimaryKey = True)
    LinkUrl = db.column(db.String(50), nullable = False)
    CreatedAt = db.column(db.datetime, default=db.func.now())
    ClickCount = db.column(db.Integer, nullable = False)
    DailyViewCount = db.column(db.Integer, nullable = False)
    MonthlyViewCount = db.column(db.Integer, nullable = False)
    YearlyViewCount = db.column(db.Integer, nullable = False)

    def __init__(self, LinkUrl,  ClickCount, DailyViewCount, MonthlyViewCount, YearlyViewCount, CreatedAt = None):

        self.LinkUrl = LinkUrl
        self.ClickCount = ClickCount
        self.DailyViewCount = DailyViewCount
        self.MonthlyViewCount = MonthlyViewCount
        self.YearlyViewCount = YearlyViewCount
        if CreatedAt:
            self.CreatedAt = CreatedAt
