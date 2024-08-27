from models.User import db  

class Payout_Data(db.Model):
    __tablename__ = 'Payout_Data'

    PayoutDataId = db.Column(db.Integer, primary_key=True)
    UserId = db.Column(db.Integer, db.ForeignKey('user.id'))
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
    UpdatedAt = db.Column(db.DateTime)

 

    def __init__(self, Name, email, country, city, zipcode, address, address2, phonePrefix, phoneNumber, Method, CreatedAt, UpdateAt):
        self.Name = Name
        self.email = email
        self.Method = Method
        self.country = country
        self.city = city
        self.zip = zipcode
        self.address = address
        self.address2 = address2
        self.phonePrefix = phonePrefix
        self.phoneNumber = phoneNumber
        self.UpdateAt = UpdateAt

        if CreatedAt:
            self.CreatedAt = CreatedAt
