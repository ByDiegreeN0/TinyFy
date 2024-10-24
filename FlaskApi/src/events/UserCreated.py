# este archivo es creado con la funcion, de registrar un evento, el cual al ser creado un usuario, se registran
# automaticamente ciertos datos en payoutdata y otras tablas

from models.User import db # importa la instancia de la libreria que interactua con la base de datos
from models.PayoutDataModel import Payout_Data # importa el modelo de payoutdata
from models.UserAnalyticsModel import UserAnalytics # importa el modelo de Useranalytics
from services.LinkService.LinkService import generar_link_corto



def create_payout_data(new_user):
    # Crea un registro en Payout_Data usando el ID del usuario
    new_payout_data = Payout_Data(
        UserId=new_user.id,
        Name=new_user.username,
        email=new_user.email,
    )
    db.session.add(new_payout_data)
    db.session.commit()


def create_user_analytics(new_user):
    # Crea un registro en UserAnalytics usando el ID del usuario
    new_user_analytics = UserAnalytics(
        UserId=new_user.id,
    )
    db.session.add(new_user_analytics)
    db.session.commit()


def create_referral_link(): 
    host = "http://localhost:5173/referral/" 
    short_url = generar_link_corto()
    return host + short_url 
