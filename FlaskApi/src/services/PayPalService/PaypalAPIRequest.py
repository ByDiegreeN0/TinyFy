from flask import jsonify
from config import DevelopmentConfig  # Importa las configuraciones de desarrollo
from models.PayoutLogModel import PayoutLog  # Importa el modelo de payout log
from models.UserAnalyticsModel import UserAnalytics  # Importa el modelo de UserAnalytics
from models.User import db  # Importa la instancia de db desde el modelo de usuario
from .PaypalService import auth_paypal  # Importar auth_paypal al nivel superior
import requests
import json
from datetime import datetime  

sandbox_email = DevelopmentConfig.PAYPAL_SANDBOX_EMAIL

def request_payout(user_id, amount):

    access_token = auth_paypal()  # Obtiene el access_token

    if not access_token:
        return jsonify({'message': 'No se pudo obtener el Access Token.'}), 401
    
    # URL de la API de PayPal para hacer payouts
    url = "https://api-m.sandbox.paypal.com/v1/payments/payouts"
    
    # Encabezados para la solicitud
    headers = {
        "Authorization": f"Bearer {access_token}",
        "Content-Type": "application/json",
        "Accept": "application/json",
    }
    
    # Cuerpo de la solicitud
    data = {
        "sender_batch_header": {
            "sender_batch_id": str(int(datetime.now().timestamp())),
            "recipient_type": "EMAIL",
            "email_subject": "TiniFy Payment",
            "email_message": "You received a payment. Thanks for using our service!"
        },
        "items": [
            {
                "amount": {
                    "currency": "USD",
                    "value": str(amount)
                },
                "sender_item_id": str(int(datetime.now().timestamp())), 
                "recipient_wallet": "PAYPAL",
                "receiver": sandbox_email
            }
        ]
    }
    
    # Realizar la solicitud POST
    response = requests.post(url, headers=headers, data=json.dumps(data), timeout=10)
    
    # Verificar la respuesta
    if response.status_code == 201: 
        # Crear un registro en payout_log
        payout_log = PayoutLog(
            PayoutAmount=amount,
            PayoutRequestedAt=datetime.now(),
            PayoutDoneAt=datetime.now(), 
            PayoutStatus="done",
            UserId=user_id,
        )
        
        db.session.add(payout_log)  # Añadir el registro a la sesión

        # Actualizar User_Earning a 0 en UserAnalytics
        user_analytics = UserAnalytics.query.filter_by(UserId=user_id).first()
        if user_analytics:
            user_analytics.User_Earning = 0
            db.session.add(user_analytics)  # Añadir el cambio a la sesión
        
        db.session.commit()  # Subir todos los cambios a la base de datos
        return jsonify({'message': 'Payout created successfully'}), 201

    else:
        # Manejo de error en la solicitud de payout
        return jsonify({'message': 'Something went wrong, PayoutLog hasn’t been created', 'error': response.text}), 500