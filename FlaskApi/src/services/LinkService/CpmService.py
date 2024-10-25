import requests
from flask import jsonify

# Esto es para obtener el CPM desde la API de Adsterra
def obtener_cpm(api_key):
    url = f""  # Aca toca poner la url para que que calcule el cpm que no se cual es
    
    # Los encabezados que conforman la solicitud
    headers = {
        "Authorization": f"Bearer {api_key}", # Aquí iria la api key de diego
        "Content-Type": "application/json" 
    }
    
    try:
        # Aca se hace la consulta get a la cosa de adsterra
        response = requests.get(url, headers)
        
        # Esto es para parsear la información a json ya que el punto es pasarlo por el api de flask
        data = response.json()
        
        # Estuve un rato pero gracias a la api key de diego vi que retorna el cpm la apí de adsterra
        cpm = data.get('cpm', None)
        
        if cpm is None:
            return jsonify({"error": "No se encuentra el campo cpm"}), 404
        
        return cpm
    except Exception as e:
        return jsonify({"error": f"Ocurrio un error {str(e)}"}), 500