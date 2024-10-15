from models.User import db

class Links(db.Model):
    __tablename__ = 'Links'

    LinkId = db.Column(db.Integer, primary_key=True)
    LinkName = db.Column(db.String(50))
    LinkUrl = db.Column(db.String(50), nullable=False)
    LinkShortUrl = db.Column(db.String(50))
    ClickCount = db.Column(db.Integer, nullable=False)
    Earnings = db.Column(db.Integer, default=0)
    CreatedAt = db.Column(db.DateTime, default=db.func.now())
    userId = db.Column(db.Integer, db.ForeignKey('user.id'))

    def __init__(self, LinkName, LinkUrl, ClickCount, Earnings=0, CreatedAt=None, LinkShortUrl=None, userId=None):
        self.LinkName = LinkName
        self.LinkUrl = LinkUrl
        self.ClickCount = ClickCount
        self.Earnings = Earnings
        self.CreatedAt = CreatedAt if CreatedAt else db.func.now()
        self.LinkShortUrl = LinkShortUrl
        self.userId = userId
