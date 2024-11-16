from flask import request, jsonify
from app import app
from models.User import db
from flask_jwt_extended import jwt_required # libreria de flask para proteger rutas
from flask_cors import cross_origin # Implementa cross_origin para hacer peticiones desde afuera del api (esto deberia arreglar el app)
from models.PayoutDataModel import Payout_Data




# create
@app.route('/payout_data', methods=['POST']) 
@jwt_required()
def create_payout_data():
    data = request.json
    new_payout_data = Payout_Data(
        UserId=data['UserId'],
        Name=data['Name'],
        email=data['email'],
        Method=data.get('Method'),
        country=data.get('country'),
        city=data.get('city'),
        zipcode=data.get('zipcode'),
        address=data.get('address'),
        address2=data.get('address2'),
        phonePrefix=data.get('phonePrefix'),
        phoneNumber=data.get('phoneNumber'),
    )
    db.session.add(new_payout_data)
    db.session.commit()
    return jsonify({'message': 'Payout Data created successfully'}), 201


# Read
@cross_origin # implementa CORS
@app.route('/payout_data', methods=['GET'])
@jwt_required() # con este metodo se protege la ruta

def get_payout_data():
    payout_data_list = Payout_Data.query.all()
    return jsonify([{
        'PayoutDataId': p.PayoutDataId,
        'UserId': p.UserId,
        'Name': p.Name,
        'email': p.email,
        'Method': p.Method,
        'country': p.country,
        'city': p.city,
        'zipcode': p.zipcode,
        'address': p.address,
        'address2': p.address2,
        'phonePrefix': p.phonePrefix,
        'phoneNumber': p.phoneNumber,
        'CreatedAt': p.CreatedAt,
        'UpdatedAt': p.UpdatedAt
    } for p in payout_data_list])

@cross_origin # implementa CORS
@app.route('/payout_data/<int:payout_data_id>', methods=['GET'])
@jwt_required() # con este metodo se protege la ruta

def get_payout_data_by_id(payout_data_id):
    payout_data = Payout_Data.query.get_or_404(payout_data_id)
    return jsonify({
        'PayoutDataId': payout_data.PayoutDataId,
        'UserId': payout_data.UserId,
        'Name': payout_data.Name,
        'email': payout_data.email,
        'Method': payout_data.Method,
        'country': payout_data.country,
        'city': payout_data.city,
        'zipcode': payout_data.zipcode,
        'address': payout_data.address,
        'address2': payout_data.address2,
        'phonePrefix': payout_data.phonePrefix,
        'phoneNumber': payout_data.phoneNumber,
        'CreatedAt': payout_data.CreatedAt,
        'UpdatedAt': payout_data.UpdatedAt
    })

# Update
@cross_origin # implementa CORS
@app.route('/payout_data/<int:payout_data_id>', methods=['PUT'])
@jwt_required()
def update_payout_data(payout_data_id):
    payout_data = Payout_Data.query.get_or_404(payout_data_id)
    data = request.json
    payout_data.Name = data.get('Name', payout_data.Name)
    payout_data.email = data.get('email', payout_data.email)
    payout_data.Method = data.get('Method', payout_data.Method)
    payout_data.country = data.get('country', payout_data.country)
    payout_data.city = data.get('city', payout_data.city)
    payout_data.zipcode = data.get('zipcode', payout_data.zipcode)
    payout_data.address = data.get('address', payout_data.address)
    payout_data.address2 = data.get('address2', payout_data.address2)
    payout_data.phonePrefix = data.get('phonePrefix', payout_data.phonePrefix)
    payout_data.phoneNumber = data.get('phoneNumber', payout_data.phoneNumber)
    db.session.commit()
    return jsonify({'message': 'Payout Data updated successfully'})


# Delete

@cross_origin # implementa CORS
@app.route('/payout_data/<int:payout_data_id>', methods=['DELETE'])
@jwt_required() # con este metodo se protege la ruta

def delete_payout_data(payout_data_id):
    payout_data = Payout_Data.query.get_or_404(payout_data_id)
    db.session.delete(payout_data)
    db.session.commit()
    return jsonify({'message': 'Payout Data deleted successfully'})
