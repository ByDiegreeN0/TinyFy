from flask import Flask, request, jsonify
from flask_jwt_extended import jwt_required # con esta libreria se protegen las rutas
from flask_cors import cross_origin # Implementa cross_origin para hacer peticiones desde afuera del api (esto deberia arreglar el app)
import bcrypt
from models.User import User, db
from app import app


from events.UserCreated import create_payout_data , create_user_analytics, create_referral_link # importa los eventos que crean datos automaticamente para payoutdata y use analytics


# Create
@cross_origin
@app.route('/users', methods=['POST'])
def create_user():
    data = request.json
    hashed_password = bcrypt.hashpw(data['password'].encode('utf-8'), bcrypt.gensalt())
    
    referral_link = create_referral_link() # crea el link de referido, a partir de la funcion
    
    referral_to_id = data.get('referral_to_id')


    new_user = User(
        username=data['username'], 
        email=data['email'], 
        password=hashed_password,
        referral_to_id=referral_to_id,  
        referral_link=referral_link,
        role_id=data['RoleId'] 
    )
    
    # Guardar el usuario en la base de datos
    db.session.add(new_user)
    db.session.commit()  # Confirmar el registro para que se le asigne un ID

    # Ahora que el ID del usuario está disponible, podemos crear los datos relacionados
    create_payout_data(new_user)  # Crea registros automáticamente para payout_data
    create_user_analytics(new_user)  # Inicializa las analíticas del usuario
    
    return jsonify({'message': 'User created successfully'}), 201


# Read
@cross_origin # implementa CORS
@jwt_required() # con este metodo se protege la ruta
@app.route('/users', methods=['GET'])
def get_users():
    
    users = User.query.all()
    return jsonify([{'id': user.id, 'username': user.username, 'email': user.email} for user in users])

@cross_origin # implementa CORS
@jwt_required() # con este metodo se protege la ruta
@app.route('/users/<int:user_id>', methods=['GET'])
def get_user(user_id):
    user = User.query.get_or_404(user_id)
    return jsonify({'id': user.id, 'username': user.username, 'email': user.email})

# Update
@cross_origin # implementa CORS
@jwt_required() # con este metodo se protege la ruta
@app.route('/users/<int:user_id>', methods=['PUT'])
def update_user(user_id):
    user = User.query.get_or_404(user_id)
    data = request.json
    user.username = data.get('username', user.username)
    user.email = data.get('email', user.email)
    if 'password' in data:
        user.password = bcrypt.hashpw(data['password'].encode('utf-8'), bcrypt.gensalt())
    user.RoleId = data.get('RoleId', user.RoleId)
    db.session.commit()
    return jsonify({'message': 'User updated successfully'})

# Delete
@cross_origin # implementa CORS
@jwt_required() # con este metodo se protege la ruta
@app.route('/users/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    user = User.query.get_or_404(user_id)
    db.session.delete(user)
    db.session.commit()
    return jsonify({'message': 'User deleted successfully'})

if __name__ == '__main__':
    app.run(debug=True)


# esta funcion se ejecuta unicamente cuando el usuario va a registrarse con un link de referido
# para registrar un nuevo referido y asociarlo a este usuario

@cross_origin  # Implementa CORS
@app.route('/user/referral/<string:short_url>', methods=['POST'])
def create_ref_to_user(short_url):
    
    data = request.json
    hashed_password = bcrypt.hashpw(data['password'].encode('utf-8'), bcrypt.gensalt())
    
    referral_link = create_referral_link() # crea el link de referido, a partir de la funcion
    refered_user = User.query.filter_by(referral_link = short_url).first()
    
    if refered_user is None:
        return jsonify({"msg": "Invalid referral link"}), 400
     
    new_user = User(
        username=data['username'], 
        email=data['email'], 
        password=hashed_password,
        referral_to_id=refered_user.id, 
        referral_link=referral_link,
        role_id=data['RoleId'] 
    )
       
    # Guardar el usuario en la base de datos
    db.session.add(new_user)
    db.session.commit()  # guarda los cambios en base de datos

    create_payout_data(new_user)  # Crea registros automáticamente para payout_data
    create_user_analytics(new_user)  # Inicializa las analíticas del usuario
    
    return jsonify({'message': 'User created successfully'}), 201
 
