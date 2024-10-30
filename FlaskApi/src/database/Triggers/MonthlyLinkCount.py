from models.User import db  # Importa la instancia de db que interactúa con la base de datos
from sqlalchemy.exc import SQLAlchemyError  # Para el manejo de errores
from sqlalchemy.sql import text  # Para ejecutar consultas en texto

def create_monthly_link_count_trigger():
    # Consulta para verificar si el trigger ya existe en la base de datos
    check_trigger_exists = text("""
        SELECT COUNT(*)
        FROM information_schema.triggers
        WHERE trigger_schema = DATABASE()
        AND trigger_name = 'MonthlyLinkCountByMonth'
    """)

    try:
        # Ejecuta la consulta para verificar si el trigger ya existe
        trigger_exists = db.session.execute(check_trigger_exists).scalar()

        # Solo crea el trigger si no existe
        if trigger_exists == 0:
            trigger = text("""
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
            """)

            # Ejecuta la creación del trigger
            db.session.execute(trigger)
            db.session.commit()
            print("MonthlyLinkCountByMonth trigger created successfully")
        else:
            print("El trigger MonthlyLinkCountByMonth ya existe.")

    except SQLAlchemyError as e:
        # En caso de error, deshace los cambios y muestra el error en consola
        db.session.rollback()
        print(f"Error creating MonthlyLinkCountByMonth trigger: {str(e)}")
