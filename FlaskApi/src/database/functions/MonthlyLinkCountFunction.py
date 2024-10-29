from models.User import db  # Importa la instancia de db que interactúa con la base de datos
from sqlalchemy.exc import SQLAlchemyError  # Para el manejo de errores
from sqlalchemy.sql import text  # Para ejecutar consultas en texto

def monthly_link_count():
    # Consulta para verificar si la función ya existe en la base de datos
    check_func_exists = text("""
        SELECT COUNT(*) 
        FROM information_schema.routines 
        WHERE routine_schema = DATABASE() 
        AND routine_name = 'increase_monthly_link_count'
        AND routine_type = 'FUNCTION'
    """)

    try:
        # Ejecuta la consulta para verificar si la función ya existe
        func_exists = db.session.execute(check_func_exists).scalar()

        # Solo crea la función si no existe
        if func_exists == 0:
            func = text("""
                CREATE FUNCTION increase_monthly_link_count(UserIdentifier INT) RETURNS INT
                BEGIN
                    DECLARE linkCount INT;
                    DECLARE currentYear INT;
                    DECLARE currentMonth INT;

                    -- Obtener el año y mes actuales
                    SET currentYear = YEAR(CURDATE());
                    SET currentMonth = MONTH(CURDATE());

                    -- Contar los enlaces creados por el usuario en el mes actual
                    SELECT COUNT(*) INTO linkCount 
                    FROM Links
                    WHERE UserId = UserIdentifier 
                    AND YEAR(createdAt) = currentYear 
                    AND MONTH(createdAt) = currentMonth;

                    -- Retornar el número de enlaces contados
                    RETURN linkCount;
                END;
            """)
            
            # Ejecuta la creación de la función
            db.session.execute(func)
            db.session.commit()
            print("increase_monthly_link_count function created successfully")
        else:
            print("La función increase_monthly_link_count ya existe.")

    except SQLAlchemyError as e:
        # En caso de error, deshace los cambios y muestra el error en consola
        db.session.rollback()
        print(f"Error creating increase_monthly_link_count function: {str(e)}")
