from flask import Flask
from config import config
from models.User import db
from models.User import User

app = Flask(__name__)

if __name__ == "__main__":
    # Cargar la configuración desde config.py
    app.config.from_object(config['development'])
    
    # Inicializar la base de datos con la aplicación Flask
    db.init_app(app)
    
    with app.app_context():
        db.create_all()
    
    # Ejecutar la aplicación
    app.run(port=8000)
