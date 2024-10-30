from datetime import date, timedelta
from models.UserAnalyticsModel import db, UserAnalytics
from models.LinksModel import Links
from sqlalchemy import func

# Función para contar los links creados por el usuario en el último mes
def count_links_last_month(user_id):
    today = date.today()
    start_date = today - timedelta(days=30)
    
    # Contamos los links creados en el último mes para el usuario
    links_created = db.session.query(func.count(Links.LinkId))\
        .filter(Links.userId == user_id, Links.CreatedAt >= start_date)\
        .scalar()

    # Obtenemos o creamos el registro en User_Analytics para este usuario
    user_analytics = db.session.query(UserAnalytics)\
        .filter(UserAnalytics.UserId == user_id)\
        .first()
    
    if user_analytics:
        # Actualizamos el campo User_LinksCreated
        user_analytics.User_LinksCreated = links_created
    else:
        # Creamos un nuevo registro en User_Analytics si no existe
        new_analytics = UserAnalytics(
            UserId=user_id,
            User_LinksCreated=links_created
        )
        db.session.add(new_analytics)
    
    db.session.commit()

    
