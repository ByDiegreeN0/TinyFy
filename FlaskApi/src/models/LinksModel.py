from models.User import db

class Links(db.Model):
    __tablename__ = 'Links'

    _LinkId = db.Column('LinkId', db.Integer, primary_key=True)
    _LinkName = db.Column('LinkName', db.String(50))
    _LinkUrl = db.Column('LinkUrl', db.String(50), nullable=False)
    _LinkShortUrl = db.Column('LinkShortUrl', db.String(50))
    _ClickCount = db.Column('ClickCount', db.Integer, nullable=False)
    _Earnings = db.Column('Earnings', db.Integer, default=0)
    _CreatedAt = db.Column('CreatedAt', db.DateTime, default=db.func.now())
    _userId = db.Column('userId', db.Integer, db.ForeignKey('user.id'))

    def __init__(self, LinkUrl, ClickCount, DailyViewCount, MonthlyViewCount, YearlyViewCount, CreatedAt=None):
        self._LinkUrl = LinkUrl
        self._ClickCount = ClickCount
        self._DailyViewCount = DailyViewCount
        self._MonthlyViewCount = MonthlyViewCount
        self._YearlyViewCount = YearlyViewCount
        if CreatedAt:
            self._CreatedAt = CreatedAt

    @property
    def LinkId(self):
        return self._LinkId

    @property
    def LinkName(self):
        return self._LinkName

    @LinkName.setter
    def LinkName(self, value):
        self._LinkName = value

    @property
    def LinkUrl(self):
        return self._LinkUrl

    @LinkUrl.setter
    def LinkUrl(self, value):
        self._LinkUrl = value

    @property
    def LinkShortUrl(self):
        return self._LinkShortUrl

    @LinkShortUrl.setter
    def LinkShortUrl(self, value):
        self._LinkShortUrl = value

    @property
    def ClickCount(self):
        return self._ClickCount

    @ClickCount.setter
    def ClickCount(self, value):
        self._ClickCount = value

    @property
    def Earnings(self):
        return self._Earnings

    @Earnings.setter
    def Earnings(self, value):
        self._Earnings = value

    @property
    def CreatedAt(self):
        return self._CreatedAt

    @property
    def userId(self):
        return self._userId

    @userId.setter
    def userId(self, value):
        self._userId = value
