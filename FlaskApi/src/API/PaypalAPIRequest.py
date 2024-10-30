# archivo generado para colocar los endpoints y funciones necesarias para el sistema
# de pagos con paypal
    
from config import DevelopmentConfig
import requests
import json
from services.PayPalService.PaypalService import auth_paypal


sandbox_email = DevelopmentConfig.PAYPAL_SANDBOX_EMAIL

def request_payout():
    
    access_token = auth_paypal() # obtiene el access_token
    
    if not access_token:
        print("No se pudo obtener el Access Token.") # si no encuentra el acces token, tira error
        return
    
    
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
            "sender_batch_id": "2014021801",
            "recipient_type": "EMAIL",
            "email_subject": "TiniFy Payment",
            "email_message": "You received a payment. Thanks for using our service!"
        },
        "items": [
            {
                "amount": {
                    "currency": "USD",
                    "value": "10.00"
                },
                "sender_item_id": "201403140001",
                "recipient_wallet": "PAYPAL",
                "receiver": sandbox_email
            }
        ]
    }
    
    # Realizar la solicitud POST
    response = requests.post(url, headers=headers, data=json.dumps(data), timeout=10)
    
    # Verificar la respuesta
    if response.status_code == 201:
        print("Payout created successfully")
        print(response.json())
    else:
        print("Error al crear el payout:", response.status_code, response.text)

request_payout()
