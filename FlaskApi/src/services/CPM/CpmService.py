# me decidi por requests ya que es mas facil de usar que http.client
import requests
from flask import jsonify
from datetime import date

# relativedelta sirve para traer fechas relativas con respecto a como se compare
from dateutil.relativedelta import relativedelta

def obtener_cpm(api_key):
    today = date.today()  # Esto es para obtener la fecha actual
    url = f"https://api3.adsterratools.com/publisher/stats.json?start_date={today}&finish_date={today}&group_by=date"

    # Los encabezados que conforman la solicitud
    headers = {
        "Authorization": f"Bearer {api_key}", # Aquí iria la api key de diego
        "Content-Type": "application/json",
        "Accept": "application/json", 
        "X-API-Key": api_key # Aquí iria la api key de diego
    }

    # Try para manejo de errores aunque no es 100% esencial
    try:
        # Aca se hace la consulta get a la cosa de adsterra
        response = requests.get(url, headers=headers)
        response.raise_for_status()  # Lanza un error si falla el request 

         # Esto es para parsear la información a json ya que el punto es pasarlo por el api de flask
        json_data = response.json()

        # Esto es para definir los items que hay dentro de la respuesta, aun que aca se pasa como un
        # array el punto es obtener solo uno que es el de la fecha mas actual
        items = json_data.get('items', [])
        if not items:
            return {"error": "No se encontraron ítems en la respuesta"}, 404

        # Aca es donde se obtiene solo un valor como cpm que es el más actual
        cpm_actual = items[0].get('cpm', None)

        # Estos son solo manejos de errores
        if cpm_actual is None:
            return {"error": "No se encontró el CPM para hoy"}, 404

        return {"cpm": cpm_actual}, 200

    except Exception as e:
        # Esto es para encontrar algun error aunque como digo no es 100% esencial el try
        return {"error": f"Ocurrió un error: {str(e)}"}, 500
    
# Esta función es para obtener el cpm del ultimo año, esto es solo para obtener un valor y bueno
# que se lo puedan mostrar a los profesores
def obtener_cpm_ultimo_año(api_key):
    # saca la fecha de hoy
    today = date.today()

    # aca comparo la fecha de hoy y la "devuelvo" un año
    one_year_ago = today - relativedelta(years=1)
    
    url = f"https://api3.adsterratools.com/publisher/stats.json?start_date={one_year_ago}&finish_date={today}&group_by=date"
    # Los encabezados que conforman la solicitud
    headers = {
        "Authorization": f"Bearer {api_key}", # Aquí iria la api key de diego
        "Content-Type": "application/json",
        "Accept": "application/json", 
        "X-API-Key": api_key # Aquí iria la api key de diego
    }
    
    # Try para manejo de errores aunque no es 100% esencial
    try:
        # Aca se hace la consulta get a la cosa de adsterra
        response = requests.get(url, headers=headers)
        response.raise_for_status()  # Lanza un error si falla el request 

         # Esto es para parsear la información a json ya que el punto es pasarlo por el api de flask
        json_data = response.json()

        # Esto es para definir los items que hay dentro de la respuesta, aun que aca se pasa como un
        # array el punto es obtener solo uno que es el de la fecha mas actual
        items = json_data.get('items', [])
        if not items:
            return jsonify({"error": "No se encontraron ítems en la respuesta"}), 404

        # Esto es para definir el total osea la suma de los cpm's del último año
        cpm_total = 0
        for item in items:
            cpm_total += item.get('cpm', 0)
        
        # Retorna el cpm total del último año, esto no se deberia usar en producción OJO
        return {"cpm_total": cpm_total}, 200

    except Exception as e:
        # Esto es para encontrar algun error aunque como digo no es 100% esencial el try
        return {"error": f"Ocurrió un error: {str(e)}"}, 500
    
def obtener_cpm_ultimo_diez_dias(api_key):
    today = date.today()
    start_date = today - relativedelta(days=10)
    
    url = f"https://api3.adsterratools.com/publisher/stats.json?start_date={start_date}&finish_date={today}&group_by=date"
    
    headers = {
        "Authorization": f"Bearer {'dc5ecf146f8450b3da4082d0109595a3'}",
        "Content-Type": "application/json",
        "Accept": "application/json",
        "X-API-Key": 'dc5ecf146f8450b3da4082d0109595a3'
    }
    
    try:
        response = requests.get(url, headers=headers)
        response.raise_for_status()  # Lanza un error si la solicitud falla
        
        json_data = response.json()  # Parsear la respuesta como JSON
        
        items = json_data.get('items', [])
        if not items:
            return jsonify({"error": "No se encontraron ítems en la respuesta"}), 404
        
        # Procesar los datos de CPM
        cpm_values = [item.get('cpm') for item in items]
        
        # Retorna solo los datos que se pueden serializar como JSON
        return jsonify({"cpm_values": cpm_values}), 200
    
    except requests.exceptions.RequestException as e:
        # Devuelve el error como JSON
        return jsonify({"error": f"Ocurrió un error: {str(e)}"}), 500