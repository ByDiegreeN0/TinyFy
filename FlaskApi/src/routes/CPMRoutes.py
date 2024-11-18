from flask import request, jsonify
from flask_jwt_extended import jwt_required # libreria de flask para proteger rutas
from flask_cors import cross_origin # Implementa cross_origin para hacer peticiones desde afuera del api (esto deberia arreglar el app)


from app import app
from models.User import db
from models.CPMModel import CPM

from services.CPM.CpmService import obtener_cpm, obtener_cpm_ultimo_año
from services.CPM.CpmService import obtener_cpm_ultimo_diez_dias

@app.route('/api/cpm-ultimo-diez-dias', methods=['GET'])
def obtener_cpm_diez_dias():
    api_key = 'your_api_key_here'  # Asegúrate de reemplazarlo con tu API Key
    data, status_code = obtener_cpm_ultimo_diez_dias(api_key)

    if status_code == 200:
        # Retornar los datos como JSON
        return jsonify(data)
    else:
        # Manejo de errores
        return jsonify(data), status_code

# Create Creación de otra ruta para crear el cpm, esta ruta es solo para mostrar a los profesores 
# ya que trae el cpm del ultimo año o también sirve para pruebas pero no en producción REPITO
# no en producción
@cross_origin # implementa CORS
@app.route('/cpm/last-year', methods=['post'])
@jwt_required() # con este metodo se protege la ruta

def create_cpm_last_year():
    # aca se obtiene el cpm diario (por favor cambiar el api key a una variable de entorno en .env)
    cpm_data, status_code = obtener_cpm_ultimo_año('dc5ecf146f8450b3da4082d0109595a3')
    
    # Esto es para descomponer el cpm ya que devuelve inicialmente un diccionario de la funcion
    # Y pues no se pueden meter diccionarios en la db
    if status_code == 200:
        cpm_value = cpm_data['cpm_total']
        
        # Insertar en la base de datos y a dormir
        new_cpm = CPM(cpm=cpm_value)
        
        db.session.add(new_cpm)
        db.session.commit()  
        return jsonify({'message': 'CPM created successfully'}), 201
    else:
        # Esto es por si ocurre un error y ademas le agregué un rollback por si el error es de la db
        db.session.rollback()
        return jsonify({"error": 'An error occurred'}), 500
    
# Create
@cross_origin # implementa CORS
@app.route('/cpm', methods=['POST'])
@jwt_required() # con este metodo se protege la ruta

def create_cpm():
    # aca se obtiene el cpm diario (por favor cambiar el api key a una variable de entorno en .env)
    cpm_data, status_code = obtener_cpm('dc5ecf146f8450b3da4082d0109595a3')
    
    # Esto es para descomponer el cpm ya que devuelve inicialmente un diccionario de la funcion
    # Y pues no se pueden meter diccionarios en la db
    if status_code == 200:
        # Aquí cpm_data es el diccionario que contiene= 'cpm': 0, 200 enmtonces toca descomponer eso
        cpm_value = cpm_data['cpm']  # Obtener solo el valor del cpm
        
        # Insertar en la base de datos y a dormir
        new_cpm = CPM(cpm=cpm_value)
        
        db.session.add(new_cpm)
        db.session.commit()
        return jsonify({'message': 'CPM created successfully'}), 201
    else:
        # Esto es por si ocurre un error y ademas le agregué un rollback por si el error es de la db
        db.session.rollback()
        return jsonify({"error": 'An error occurred'}), 500

# Read

@cross_origin # implementa CORS
@app.route('/cpm', methods=['GET'])
@jwt_required() # con este metodo se protege la ruta

def get_cpm():
    cpms = CPM.query.all()
    return jsonify([{'cpmId': c.cpmId, 'cpm': c.cpm, 'cpmDate': c.cpmDate} for c in cpms])

@cross_origin # implementa CORS
@app.route('/cpm/<int:cpm_id>', methods=['GET'])
@jwt_required() # con este metodo se protege la ruta

def get_cpm_by_id(cpm_id):
    cpm = CPM.query.get_or_404(cpm_id)
    return jsonify({'cpmId': cpm.cpmId, 'cpm': cpm.cpm, 'cpmDate': cpm.cpmDate})

# Update
@cross_origin # implementa CORS
@app.route('/cpm/<int:cpm_id>', methods=['PUT'])
@jwt_required() # con este metodo se protege la ruta

def update_cpm(cpm_id):
    cpm = CPM.query.get_or_404(cpm_id)
    data = request.json
    cpm.cpm = data.get('cpm', cpm.cpm)
    cpm.cpmDate = data.get('cpmDate', cpm.cpmDate)
    db.session.commit()
    return jsonify({'message': 'CPM updated successfully'})

# Delete
@cross_origin # implementa CORS
@app.route('/cpm/<int:cpm_id>', methods=['DELETE'])
@jwt_required() # con este metodo se protege la ruta

def delete_cpm(cpm_id):
    cpm = CPM.query.get_or_404(cpm_id)
    db.session.delete(cpm)
    db.session.commit()
    return jsonify({'message': 'CPM deleted successfully'})
