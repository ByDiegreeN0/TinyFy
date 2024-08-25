from flask import Flask
from config import config
from models.User import db  

# Importa todos los modelos después de inicializar `db`
from models import User, Roles, UserReferralLink, BannedAccount, Messages, Referrals, RestrictedAccount, SupportTicket, WarnedAccount, SystemAnalytics, PayoutLog, Payout_Data, Links, Warnings, userConfig, Permissions

app = Flask(__name__)
app.config.from_object(config['development'])

db.init_app(app)

with app.app_context():
    db.create_all()  # Crea todas las tablas en el orden correcto

if __name__ == "__main__":
    app.run(port=8000)
