from models.User import db  # Importa la instancia de db que interactúa con la base de datos
from sqlalchemy.exc import SQLAlchemyError  # Para el manejo de errores


def monthly_link_count():
    func = """
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
    """

    try:
        # Ejecuta la función y guarda los cambios en la base de datos
        db.session.execute(func)
        db.session.commit()
        print("increase_monthly_link_count function created successfully")
    except SQLAlchemyError as e:
        # En caso de error, deshace los cambios y muestra el error en consola
        db.session.rollback()
        print(f"Error creating increase_monthly_link_count function: {str(e)}")
