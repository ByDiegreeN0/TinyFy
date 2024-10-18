from datetime import datetime, timedelta
from models.LinksModel import db
from models.LinksModel import Links  


def register_click(link_id):
    # Buscar el enlace por su ID
    link = Links.query.get(link_id)
    if link:
        # Incrementar el contador de clicks
        link.ClickCount += 1
        
        # Guardar los cambios en la base de datos
        db.session.commit()
    else:
        raise ValueError("Link not found")
