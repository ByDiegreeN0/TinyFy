from datetime import datetime
from models.UserAnalyticsModel import UserAnalytics  # Importa el modelo de user analytics
from FlaskApi.src.services.PayPalService.PaypalAPIRequest import request_payout  

def autoRequestPayout(user_id):
    # Obtiene los datos de análisis del usuario
    userAnalyticsData = UserAnalytics.query.filter_by(UserId=user_id).first() 
    
    # Verifica si los datos del usuario existen
    if not userAnalyticsData:
        print(f"No se encontraron datos para el usuario con ID: {user_id}")
        return False
    
    # Obtiene las ganancias del usuario
    userEarnings = userAnalyticsData.User_Earning
    
    # Obtener la fecha actual
    now = datetime.now()

    # Comprobar si es el día 30 y las ganancias son al menos $5
    if now.day == 30 and userEarnings >= 5.00:
        print("Realizando request de pago automático...")
        # Llama a la función de request de payout
        payout_response = request_payout(userAnalyticsData.UserId, userEarnings) 
        
        # Verificar si la solicitud de payout fue exitosa
        if payout_response[1] == 201:  # Verifica el código de estado de la respuesta
            print(f"Payout de {userEarnings} USD solicitado exitosamente para el usuario {userAnalyticsData.UserId}.")
            return True
        else:
            print(f"Error al solicitar payout para el usuario {userAnalyticsData.UserId}: {payout_response[0].json()}")
            return False
    
    # Si el día no es 30 o las ganancias son menores a $5
    print(f"No se realizó el request de payout para el usuario {user_id}.")
    return False
