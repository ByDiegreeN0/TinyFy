from config import DevelopmentConfig
import requests
from requests.auth import HTTPBasicAuth

# Credenciales de tu aplicación de PayPal
client_id = DevelopmentConfig.PAYPAL_CLIENT_ID
secret_key = DevelopmentConfig.PAYPAL_SECRET_KEY

def auth_paypal():
    # URL de autenticación para obtener el Access Token
    auth_url = "https://api-m.sandbox.paypal.com/v1/oauth2/token"

    # Encabezados de la solicitud
    headers = {
        "Accept": "application/json",
        "Accept-Language": "en_US"
    }

    # Cuerpo de la solicitud
    data = {
        "grant_type": "client_credentials"
    }

    # Realizar la solicitud de autenticación
    response = requests.post(auth_url, headers=headers, data=data, auth=HTTPBasicAuth(client_id, secret_key), timeout=10)

    # Verificar la respuesta
    if response.status_code == 200:
        access_token = response.json().get("access_token")
        return access_token  # Retorna el token directamente
    else:
        print("Error fetching Access Token:", response.status_code, response.text)
        return None