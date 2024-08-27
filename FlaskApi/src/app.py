from flask import Flask
from config import config
from models.User import db  

# Importa todos los modelos después de inicializar `db`
from models import *
from routes import *

app = Flask(__name__)
app.config.from_object(config['development'])

db.init_app(app)

with app.app_context():
    db.create_all()  # Crea todas las tablas en el orden correcto

if __name__ == "__main__":
    app.run(port=8000)
