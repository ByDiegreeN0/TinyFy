# este archivo es creado con la funcion, de registrar un evento, el cual al ser creado un usuario, se registran
# automaticamente ciertos datos en payoutdata y otras tablas

from models.User import db # importa la instancia de la libreria que interactua con la base de datos
from models.PayoutDataModel import Payout_Data # importa el modelo de payoutdata
from models.UserAnalyticsModel import UserAnalytics # importa el modelo de Useranalytics


def create_payout_data(new_user): # al crear un usuario, obtiene los datos de routes, y crea un registro en Payout_Data
    
    new_payout_data = Payout_Data(
        UserId=new_user.id,
        Name=new_user.username,
        email=new_user.email,
    )
    
    db.session.add(new_payout_data)
    db.session.commit()

def create_user_analytics(new_user): # al crear un usuario, obtiene los datos de routes, y crea un registro en user analytics
    new_user_analytics = UserAnalytics(
        UserId=new_user.id,
    )
    
    db.session.add(new_user_analytics)
    db.session.commit()
 