from models.User import db

class CPM(db.Model):
    __tablename__ = 'CPM'

    _cpmId = db.Column('cpmId', db.Integer, primary_key=True)
    _cpm = db.Column('cpm', db.Integer)
    _cpmDate = db.Column('cpmDate', db.DateTime, default=db.func.now())

    def __init__(self, cpmId, cpm, cpmDate=None):
        self._cpmId = cpmId
        self._cpm = cpm
        if cpmDate:
            self._cpmDate = cpmDate

    @property
    def cpmId(self):
        return self._cpmId

    @property
    def cpm(self):
        return self._cpm

    @cpm.setter
    def cpm(self, value):
        self._cpm = value

    @property
    def cpmDate(self):
        return self._cpmDate

    @cpmDate.setter
    def cpmDate(self, value):
        self._cpmDate = value
