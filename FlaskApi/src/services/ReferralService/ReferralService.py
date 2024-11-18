from models.User import db  # Importa la instancia de db que interactúa con la base de datos
from sqlalchemy.exc import SQLAlchemyError  # Para el manejo de errores
from sqlalchemy.sql import text  # Para ejecutar consultas en texto

def search_referral_link(referral_link):
    try:
        # Usamos parámetros en la consulta SQL para evitar inyecciones SQL
        query = text("""
            SELECT * FROM user WHERE referral_link = :referral_link LIMIT 1;
        """)

        # Ejecutamos la consulta y pasamos el parámetro
        result = db.session.execute(query, {'referral_link': referral_link}).fetchone()

        # Si se encuentra un resultado, lo retornamos
        if result:
            return result  # Devuelve el resultado encontrado (una fila de la tabla 'user')
        else:
            return None  # Si no se encuentra, retorna None

    except SQLAlchemyError as e:
        # En caso de error con SQLAlchemy, hace rollback y devuelve un mensaje de error
        db.session.rollback()  
        return f"An error occurred: {str(e)}"
