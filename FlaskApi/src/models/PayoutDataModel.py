from models.User import db

class Payout_Data(db.Model):
    __tablename__ = 'Payout_Data'

    _PayoutDataId = db.Column('PayoutDataId', db.Integer, primary_key=True)
    _UserId = db.Column('UserId', db.Integer, db.ForeignKey('user.id'))
    _Name = db.Column('Name', db.String(20), nullable=False)
    _email = db.Column('email', db.String(100), nullable=False)
    _Method = db.Column('Method', db.String(50)) 
    _country = db.Column('country', db.String(50))
    _city = db.Column('city', db.String(50))
    _zipcode = db.Column('zipcode', db.Integer)
    _address = db.Column('address', db.String(50))
    _address2 = db.Column('address2', db.String(50))
    _phonePrefix = db.Column('phonePrefix', db.String(3))
    _phoneNumber = db.Column('phoneNumber', db.String(11))
    _CreatedAt = db.Column('CreatedAt', db.DateTime, default=db.func.now())
    _UpdatedAt = db.Column('UpdatedAt', db.DateTime)

    def __init__(self, Name, email, country, city, zipcode, address, address2, phonePrefix, phoneNumber, Method, CreatedAt=None, UpdatedAt=None):
        self._Name = Name
        self._email = email
        self._Method = Method
        self._country = country
        self._city = city
        self._zipcode = zipcode
        self._address = address
        self._address2 = address2
        self._phonePrefix = phonePrefix
        self._phoneNumber = phoneNumber
        self._UpdatedAt = UpdatedAt
        if CreatedAt:
            self._CreatedAt = CreatedAt

    @property
    def PayoutDataId(self):
        return self._PayoutDataId

    @property
    def UserId(self):
        return self._UserId

    @UserId.setter
    def UserId(self, value):
        self._UserId = value

    @property
    def Name(self):
        return self._Name

    @Name.setter
    def Name(self, value):
        self._Name = value

    @property
    def email(self):
        return self._email

    @email.setter
    def email(self, value):
        self._email = value

    @property
    def Method(self):
        return self._Method

    @Method.setter
    def Method(self, value):
        self._Method = value

    @property
    def country(self):
        return self._country

    @country.setter
    def country(self, value):
        self._country = value

    @property
    def city(self):
        return self._city

    @city.setter
    def city(self, value):
        self._city = value

    @property
    def zipcode(self):
        return self._zipcode

    @zipcode.setter
    def zipcode(self, value):
        self._zipcode = value
