from models.User import db

class Payout_Data(db.Model):
    __tablename__ = 'Payout_Data'

    PayoutDataId = db.Column(db.Integer, primary_key=True)
    UserId = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    Name = db.Column(db.String(20), nullable=False)
    email = db.Column(db.String(100), nullable=False)
    Method = db.Column(db.String(50))
    country = db.Column(db.String(50))
    city = db.Column(db.String(50))
    zipcode = db.Column(db.Integer)
    address = db.Column(db.String(50))
    address2 = db.Column(db.String(50))
    phonePrefix = db.Column(db.String(3))
    phoneNumber = db.Column(db.String(11))
    CreatedAt = db.Column(db.DateTime, default=db.func.now())
    UpdatedAt = db.Column(db.DateTime, default=db.func.now(), onupdate=db.func.now())  # Auto-update

    def __init__(self, UserId, Name, email, Method=None, country=None, city=None, zipcode=None, 
                 address=None, address2=None, phonePrefix=None, phoneNumber=None):
        self.UserId = UserId
        self.Name = Name
        self.email = email
        self.Method = Method if Method else 'Unknown Method'
        self.country = country if country else 'Unknown Country'
        self.city = city if city else 'Unknown City'
        self.zipcode = zipcode if zipcode else 00000
        self.address = address if address else 'Unknown Address'
        self.address2 = address2 if address2 else ''
        self.phonePrefix = phonePrefix if phonePrefix else '+00'
        self.phoneNumber = phoneNumber if phoneNumber else '0000000000'
 
