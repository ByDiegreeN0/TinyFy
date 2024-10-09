from flask import request, jsonify
from flask_jwt_extended import jwt_required # libreria de flask para proteger rutas
from flask_cors import cross_origin # Implementa cross_origin para hacer peticiones desde afuera del api (esto deberia arreglar el app)


from app import app
from models.User import db
from models.CPMModel import CPM

# Create
@cross_origin # implementa CORS
@app.route('/cpm', methods=['POST'])
@jwt_required() # con este metodo se protege la ruta

def create_cpm():
    data = request.json
    new_cpm = CPM(cpmId=data['cpmId'], cpm=data['cpm'], cpmDate=data.get('cpmDate'))
    db.session.add(new_cpm)
    db.session.commit()
    return jsonify({'message': 'CPM created successfully'}), 201

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
