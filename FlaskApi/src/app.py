from datetime import datetime
from datetime import timedelta
from datetime import timezone


from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from config import config
from models.User import db  

# Importa todos los modelos después de inicializar `db`
from models import *

app = Flask(__name__)
app.config.from_object(config['development'])

# Inicializa CORS (esta libreria permite a aplicaciones en otros puertos, mandar datos al API)
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=24)
CORS(app) 


# Inicializa JWT
jwt = JWTManager(app)


# Inicializa SQLAlchemy
db.init_app(app)

# Importa rutas y servicios después de la configuración de `db`
from routes import *
from services import *

# Aqui se coloca el codigo secreto para generar tokens
app.config["JWT_SECRET_KEY"] = "vvn1IiwwBFj5v29ndpOH"  

# Inicializa JWT
jwt = JWTManager(app)


with app.app_context():
    db.create_all()  # Crea todas las tablas en el orden correcto

if __name__ == "__main__":
    app.run(port=8000)
