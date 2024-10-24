from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'user'

    _id = db.Column('id', db.Integer, primary_key=True)
    _username = db.Column('username', db.String(80), unique=True, nullable=False)
    _email = db.Column('email', db.String(120), unique=True, nullable=False)
    _password = db.Column('password', db.String(120), nullable=False)
    _ReferralToId = db.Column('ReferralToId', db.Integer, db.ForeignKey('user.id'))
    _referral_link= db.Column('referral_link', db.String(100), nullable=False)
    _LastLogin = db.Column('LastLogin', db.DateTime)
    _CreatedAt = db.Column('CreatedAt', db.DateTime, default=db.func.now())

    _RoleId = db.Column('RoleId', db.Integer, db.ForeignKey('roles.RoleId'))
    warnedAccount = db.relationship('WarnedAccount', backref='user')
    bannedAccount = db.relationship('BannedAccount', backref='user')
    restrictedAccount = db.relationship('RestrictedAccount', backref='user')
    supportTickets = db.relationship('SupportTicket', backref='user')
    links = db.relationship('Links', backref='user')

    def __init__(self, username, email, password, referral_link, RoleId, LastLogin=None):
        self._username = username
        self._email = email
        self._password = password
        self._referral_link = referral_link
        self._RoleId = RoleId
        self._LastLogin = LastLogin

    @property
    def id(self):
        return self._id

    @property
    def username(self):
        return self._username

    @username.setter
    def username(self, value):
        if not value:
            raise ValueError("Username cannot be empty")
        self._username = value

    @property
    def email(self):
        return self._email

    @email.setter
    def email(self, value):
        if not value:
            raise ValueError("Email cannot be empty")
        self._email = value

    @property
    def password(self):
        return self._password

    @password.setter
    def password(self, value):
        if not value:
            raise ValueError("Password cannot be empty")
        self._password = value

    @property
    def RoleId(self):
        return self._RoleId

    @RoleId.setter
    def RoleId(self, value):
        if value is None:
            raise ValueError("RoleId cannot be None")
        self._RoleId = value

    @property
    def LastLogin(self):
        return self._LastLogin

    @LastLogin.setter
    def LastLogin(self, value):
        if value is not None and not isinstance(value, datetime):
            raise ValueError("LastLogin must be a datetime object")
        self._LastLogin = value
