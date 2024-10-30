from datetime import datetime, timezone
from models.UserAnalyticsModel import UserAnalytics,db

def register_user_click(user_id):
    try:
        # Obtener la fecha actual en UTC con timezone-aware
        today = datetime.now(timezone.utc).date()

        # Buscar un registro de UserAnalytics para este usuario en el día actual
        analytics = UserAnalytics.query.filter_by(user_id=user_id).filter(db.func.date(UserAnalytics.created_at) == today).first()

        if analytics:
            # Si ya existe un registro para hoy, incrementar el contador de clics
            analytics.user_number_clicks += 1
        else:
            # Si no existe un registro para hoy, crear uno nuevo con 1 clic
            analytics = UserAnalytics(
                user_id=user_id,
                user_number_clicks=1
            )
            db.session.add(analytics)

        # Guardar los cambios en la base de datos
        db.session.commit()

        # Devolver el número actualizado de clics
        return analytics.user_number_clicks
    
    except Exception as e:
        # Si ocurre cualquier error, cancelar los cambios y mostrar el error
        db.session.rollback()
        print(f"Error al registrar el clic del usuario: {e}")
        return None
