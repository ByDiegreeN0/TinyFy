from models.User import db  

class Links(db.Model):
    __tablename__='Links'

    LinkId = db.Column(db.Integer, primary_key = True)
    LinkName = db.Column(db.String(50))
    LinkUrl = db.Column(db.String(50), nullable = False)
    LinkShortUrl = db.Column(db.String(50))
    ClickCount = db.Column(db.Integer, nullable = False)
    CreatedAt = db.Column(db.DateTime, default=db.func.now())
    userId = db.Column(db.Integer,  db.ForeignKey('user.id'))
   

    def __init__(self, LinkUrl,  ClickCount, DailyViewCount, MonthlyViewCount, YearlyViewCount, CreatedAt = None):

        self.LinkUrl = LinkUrl
        self.ClickCount = ClickCount
        self.DailyViewCount = DailyViewCount
        self.MonthlyViewCount = MonthlyViewCount
        self.YearlyViewCount = YearlyViewCount
        if CreatedAt:
            self.CreatedAt = CreatedAt
