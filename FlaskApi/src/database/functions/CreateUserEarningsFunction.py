from models.User import db  # Importa la instancia de db que interactúa con la base de datos
from sqlalchemy.exc import SQLAlchemyError  # Para el manejo de errores
from sqlalchemy.sql import text  # Para ejecutar consultas en texto

def create_user_earnings_function():
    # Consulta para verificar si la función ya existe en la base de datos
    check_func_exists = text("""
        SELECT COUNT(*) 
        FROM information_schema.routines 
        WHERE routine_schema = DATABASE() 
        AND routine_name = 'get_user_earnings' 
        AND routine_type = 'FUNCTION'
    """)

    try:
        # Ejecuta la consulta para verificar si la función ya existe
        func_exists = db.session.execute(check_func_exists).scalar()

        # Solo crea la función si no existe
        if func_exists == 0:
            getUserEarningsFunc = text("""
                CREATE FUNCTION get_user_earnings(UserIdentifier INT) 
                RETURNS DECIMAL(10, 2)  -- Puedes ajustar el tipo de dato según lo necesites
                DETERMINISTIC
                BEGIN
                    DECLARE earnings_sum DECIMAL(10, 2);

                    -- Sumar las ganancias del usuario especificado
                    SELECT SUM(Earnings) INTO earnings_sum
                    FROM links
                    WHERE userId = UserIdentifier;

                    -- Retornar 0 si no hay resultados
                    RETURN IFNULL(earnings_sum, 0);
                END;
            """)

            # Ejecuta la creación de la función
            db.session.execute(getUserEarningsFunc)
            db.session.commit()
            print("get_user_earnings function created successfully")
        else:
            print("La función get_user_earnings ya existe.")

    except SQLAlchemyError as e:
        # En caso de error, deshace los cambios y muestra el error en consola
        db.session.rollback()
        print(f"Error creating get_user_earnings function: {str(e)}")
