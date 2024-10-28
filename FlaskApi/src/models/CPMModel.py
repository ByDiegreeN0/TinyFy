from models.User import db
from datetime import datetime

class CPM(db.Model):
    __tablename__ = 'CPM'

    cpmId = db.Column('cpmId', db.Integer, primary_key=True)
    cpm = db.Column('cpm', db.Float)
    cpmDate = db.Column('cpmDate', db.DateTime, default=db.func.now())
