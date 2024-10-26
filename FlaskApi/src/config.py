from dotenv import load_dotenv
import os

# Cargar variables de entorno desde un archivo.env
load_dotenv()

class DevelopmentConfig: 
    DEBUG = os.getenv('DEBUG') == 'True'
    SECRET_KEY = os.getenv('SECRET_KEY')
    MYSQL_HOST = os.getenv('MYSQL_HOST')
    MYSQL_USER = os.getenv('MYSQL_USER')
    MYSQL_PASSWORD = os.getenv('MYSQL_PASSWORD')
    MYSQL_DB = os.getenv('MYSQL_DB')
    
    # API Keys
    ADSTERRA_API_KEY= os.getenv('ADSTERRA_API_KEY')
    PAYPAL_CLIENT_ID= os.getenv('PAYPAL_CLIENT_ID')
    PAYPAL_SECRET_KEY= os.getenv('PAYPAL_SECRET_KEY')
    PAYPAL_SANDBOX_EMAIL= os.getenv('PAYPAL_SANDBOX_EMAIL') # email de prueba de paypal, para testear pagos
    
    # Construir la URI de la base de datos para SQLAlchemy
    SQLALCHEMY_DATABASE_URI = f"mysql://{MYSQL_USER}:{MYSQL_PASSWORD}@{MYSQL_HOST}/{MYSQL_DB}"
    SQLALCHEMY_TRACK_MODIFICATIONS = False# Desactivar rastreo de modificaciones

config = {
    'development': DevelopmentConfig,
}
