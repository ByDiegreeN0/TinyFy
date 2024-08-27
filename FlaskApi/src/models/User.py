from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy() # ESTA INSTANCIA SE TIENE QUE USAR EN TODOS LOS MODELOS A CREAR


class User(db.Model):
    __tablename__ = 'user'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(120), nullable=False)
    LastLogin = db.Column(db.DateTime)
    CreatedAt = db.Column(db.DateTime, default=db.func.now())

    RoleId = db.Column(db.Integer, db.ForeignKey('roles.RoleId'))
    ReferralLink = db.relationship('UserReferralLink', backref='user')
    warnedAccount = db.relationship('WarnedAccount', backref='user')
    bannedAccount = db.relationship('BannedAccount', backref='user')
    restrictedAccount = db.relationship('RestrictedAccount', backref='user')
    supportTickets = db.relationship('SupportTicket', backref='user')

    def __init__(self, username, email, password, RoleId, LastLogin=None):
        self.username = username
        self.email = email
        self.password = password
        self.RoleId = RoleId
        self.LastLogin = LastLogin
