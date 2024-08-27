from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy() 


class User(db.Model):
    __tablename__ = 'user'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(120), nullable=False)
    ReferralToId = db.Column(db.Integer, db.ForeignKey('user.id'))

    LastLogin = db.Column(db.DateTime)
    CreatedAt = db.Column(db.DateTime, default=db.func.now())

    RoleId = db.Column(db.Integer, db.ForeignKey('roles.RoleId'))
    warnedAccount = db.relationship('WarnedAccount', backref='user')
    bannedAccount = db.relationship('BannedAccount', backref='user')
    restrictedAccount = db.relationship('RestrictedAccount', backref='user')
    supportTickets = db.relationship('SupportTicket', backref='user')
    links = db.relationship('Links', backref='user')


    def __init__(self, username, email, password, RoleId, LastLogin=None):
        self.username = username
        self.email = email
        self.password = password
        self.RoleId = RoleId
        self.LastLogin = LastLogin
