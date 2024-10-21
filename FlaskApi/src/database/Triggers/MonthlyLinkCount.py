from models.User import db  # Importa la instancia de db que interactúa con la base de datos
from sqlalchemy.exc import SQLAlchemyError  # Para el manejo de errores


def count_link_count_by_month():
    trigger = """
        CREATE TRIGGER MonthlyLinkCountByMonth
        AFTER INSERT ON Links
        FOR EACH ROW
        BEGIN
            DECLARE monthlyCount INT;
            SET monthlyCount = increase_monthly_link_count(NEW.UserId);

            UPDATE user_analysis
            SET User_LinksCreated = monthlyCount, CreatedAt = NOW()
            WHERE UserId = NEW.UserId;
        END;
    """

    try:
        # Ejecuta el trigger y guarda los cambios en la base de datos
        db.session.execute(trigger)
        db.session.commit()
        print("MonthlyLinkCountByMonth trigger created successfully")
    except SQLAlchemyError as e:
        # En caso de error, deshace los cambios y muestra el error en consola
        db.session.rollback()
        print(f"Error creating MonthlyLinkCountByMonth trigger: {str(e)}")
