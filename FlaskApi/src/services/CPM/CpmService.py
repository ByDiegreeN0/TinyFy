# me decidi por requests ya que es mas facil de usar que http.client
import requests
from flask import jsonify
from datetime import date

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
            return jsonify({"error": "No se encontraron ítems en la respuesta"}), 404

        # Aca es donde se obtiene solo un valor como cpm que es el más actual
        cpm_actual = items[0].get('cpm', None)

        # Estos son solo manejos de errores
        if cpm_actual is None:
            return jsonify({"error": "No se encontró el CPM para hoy"}), 404

        return {"cpm": cpm_actual}, 200

    except Exception as e:
        # Esto es para encontrar algun error aunque como digo no es 100% esencial el try
        return jsonify({"error": f"Ocurrió un error: {str(e)}"}), 500
