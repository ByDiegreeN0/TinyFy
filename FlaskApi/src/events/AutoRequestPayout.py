# ESTE ARCHIVO ESTA CREADO CON EL PROPOSITO DE QUE PUEDAN MANDAR REQUEST DE PAGOS
# AUTOMATICAMENTE SIN NECESIDAD DE QUE LOS USUARIOS LO PIDAN MEDIANTE UN BOTON

# LA IDEA ES QUE ESTO LO PUEDAN ACTIVAR DE MANERA OPCIONA, PERO NO CREO QUE
# TENGAMOS TIEMPO :(
    
from datetime import datetime, timedelta
from models.UserAnalyticsModel import UserAnalytics # importa el modelo de useranalytics


def autoRequestPayout(id, earning):
    
    userAnalyticsData = UserAnalytics.query.filter(UserId=id).first() 
    
    if not userAnalyticsData:
        return False
    
    userEarnings = userAnalyticsData.User_Earning
    # Obtener la fecha y hora actual
    now = datetime.datetime.now()
    
    # Configurar las horas en las que se harán los request de pagos
    payout_time = datetime(datetime.now().year, datetime.now().month, 30, 17, 0) 

    # Comparar la hora actual con las horas de pago
    if now in payout_time:
        # Si la hora coincide, realizar el request de pago
        print("Realizando request de pago automático...")
        # Realizar la acción de request de pago aquí