from dotenv import load_dotenv
import os

# Cargar variables de entorno desde un archivo.env
load_dotenv()

class DevelopmentConfig: 
    DEBUG = os.getenv('DEBUG') == 'True'
    MYSQL_HOST = os.getenv('MYSQL_HOST')
    MYSQL_USER = os.getenv('MYSQL_USER')
    MYSQL_PASSWORD = os.getenv('MYSQL_PASSWORD')
    MYSQL_DB = os.getenv('MYSQL_DB')
    
    # Construir la URI de la base de datos para SQLAlchemy
    SQLALCHEMY_DATABASE_URI = f"mysql://{MYSQL_USER}:{MYSQL_PASSWORD}@{MYSQL_HOST}/{MYSQL_DB}"
    SQLALCHEMY_TRACK_MODIFICATIONS = False# Desactivar rastreo de modificaciones

config = {
    'development': DevelopmentConfig,
}
