from models.User import db  # Importa la instancia de db que interactúa con la base de datos
from sqlalchemy.exc import SQLAlchemyError  # Para el manejo de errores
from sqlalchemy.sql import text  # Para ejecutar consultas en texto

########################################################################################
#                                                                                      #
#   Este archivo consigue los datos necesarios para hacer que el sistema de referidos  #
#   funcione correctamente, los metodos de SQLAlchemy no me funcionaron, por eso cree  #
#   este archivo extra con consultas a base de datos en texto                          #
#                                                                                      #
########################################################################################


# funcion para buscar links de referido
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
    
    
# esta funcion agarra el ID del usuario a partir de la consulta de la funcion anterior
def get_referral_user_id(referral_link):
    try:
        # Llamamos a search_referral_link y obtenemos el usuario
        referred_user = search_referral_link(referral_link)

        # Si no se encuentra el usuario referido, retornamos None
        if not referred_user:
            return None

        # De lo contrario, extraemos el 'user_id' del resultado
        user_id = referred_user[0] 

        return user_id  # Retorna el user_id del usuario referido

    except SQLAlchemyError as e:
        # En caso de error con SQLAlchemy, hace rollback y devuelve un mensaje de error
        db.session.rollback()  
        return f"An error occurred: {str(e)}"
