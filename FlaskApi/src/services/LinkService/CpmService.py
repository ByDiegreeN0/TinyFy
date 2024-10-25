import requests
from flask import jsonify

from datetime import date

print(date.today())

# Esto es para obtener el CPM desde la API de Adsterra
def obtener_cpm(api_key):
    url = f"https://api3.adsterratools.com/publisher/stats.json?start_date=2022-01-10&finish_date={date.today()}&group_by=date"  # Aca toca poner la url para que que calcule el cpm que no se cual es (creo que es esta)
    
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
        
        # esto es porque la url recibe items como array
        items = data.get('items', [])
        
        if not items:
            return jsonify({"error": "No se encontraron ítems en la respuesta"}), 404
        
        # Extrae los valores de CPM de cada ítem
        cpm_list = [item.get('cpm', None) for item in items]
        
        # Esto es para filtrar el cpm aunque por lo que vi es 0 y no None es por si acaso
        cpm_list = [cpm for cpm in cpm_list if cpm is not None]
        
        if not cpm_list:
            return jsonify({"error": "No se encontraron valores de CPM"}), 404
        
        # Retorna la lista de los cpm entonces lo que toca hacer es asociarlo con la url del usuario o no se como lo manejen
        return jsonify({"cpm": cpm_list}), 200
    except Exception as e:
        # Esto tira errores si no esta activa la url de adsterra
        return jsonify({"error": f"Ocurrio un error {str(e)}"}), 500