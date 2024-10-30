from datetime import timedelta

from database.functions import *
from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from config import config
from models.User import db
from database.functions import * # importa las funciones creadas para la base de datos
from database.Triggers import * # importa todos los triggers
# Importa todos los modelos después de inicializar `db`
from models import *

# events
from events.createRoles import create_roles # Evento para crear roles con la construccion de la app

app = Flask(__name__)
app.config.from_object(config['development'])

# Inicializa CORS (esta libreria permite a aplicaciones en otros puertos, mandar datos al API)
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=24)
CORS(app, resources={r"/api/*": {"origins": "localhost:5173"}})  # DEJA QUE UNICAMENT EL PUERTO 5000 DEL LOCALHOST, ACCEDA A LAS PROPIEDADES DEL API


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
    create_roles() # crea roles automaticamente al iniciar la aplicacion, si no existen
    create_database_functions() # crea todas las funciones de la base de datos, si no existen
    create_database_triggers() # crea los triggers automaticamente si no existen

if __name__ == "__main__":
    app.run(port=8000)
