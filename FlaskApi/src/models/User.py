from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'user'

    _id = db.Column('id', db.Integer, primary_key=True)
    _username = db.Column('username', db.String(80), unique=True, nullable=False)
    _email = db.Column('email', db.String(120), unique=True, nullable=False)
    _password = db.Column('password', db.String(120), nullable=False)
    _referral_to_id = db.Column('ReferralToId', db.Integer, db.ForeignKey('user.id'))
    _referral_link = db.Column('referral_link', db.String(100), nullable=False)
    _last_login = db.Column('LastLogin', db.DateTime)
    _created_at = db.Column('CreatedAt', db.DateTime, default=db.func.now())
    _role_id = db.Column('RoleId', db.Integer, db.ForeignKey('roles.RoleId'))
    
    warnedAccount = db.relationship('WarnedAccount', backref='user')
    bannedAccount = db.relationship('BannedAccount', backref='user')
    restrictedAccount = db.relationship('RestrictedAccount', backref='user')
    supportTickets = db.relationship('SupportTicket', backref='user')
    links = db.relationship('Links', backref='user')

    def __init__(self, username, email, password, referral_link, role_id, referral_to_id=None, last_login=None):
        self._username = username
        self._email = email
        self._password = password
        self._referral_link = referral_link
        self._role_id = role_id
        self._referral_to_id = referral_to_id  # Este ahora puede ser None
        self._last_login = last_login

    # Getters and Setters
    @property
    def id(self):
        return self._id

    @property
    def username(self):
        return self._username

    @username.setter
    def username(self, value):
        self._username = value

    @property
    def email(self):
        return self._email

    @email.setter
    def email(self, value):
        self._email = value

    @property
    def password(self):
        return self._password

    @password.setter
    def password(self, value):
        self._password = value

    @property
    def referral_to_id(self):
        return self._referral_to_id

    @referral_to_id.setter
    def referral_to_id(self, value):
        self._referral_to_id = value

    @property
    def referral_link(self):
        return self._referral_link

    @referral_link.setter
    def referral_link(self, value):
        self._referral_link = value

    @property
    def last_login(self):
        return self._last_login

    @last_login.setter
    def last_login(self, value):
        self._last_login = value

    @property
    def created_at(self):
        return self._created_at

    @created_at.setter
    def created_at(self, value):
        self._created_at = value

    @property
    def role_id(self):
        return self._role_id

    @role_id.setter
    def role_id(self, value):
        self._role_id = value
