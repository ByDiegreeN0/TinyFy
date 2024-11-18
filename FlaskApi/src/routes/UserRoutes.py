from flask import request, jsonify
from flask_jwt_extended import jwt_required # con esta libreria se protegen las rutas
from flask_cors import cross_origin # Implementa cross_origin para hacer peticiones desde afuera del api (esto deberia arreglar el app)
import bcrypt
from models.User import User, db
from app import app




# Create
@cross_origin
@app.route('/users', methods=['POST'])
def create_user():
    from events.UserCreated import create_payout_data, create_user_analytics, create_referral_link
    data = request.json
    hashed_password = bcrypt.hashpw(data['password'].encode('utf-8'), bcrypt.gensalt())
    
    referral_link = create_referral_link()
    referral_to_id = data.get('referral_to_id')
    new_user = User(
        username=data['username'], 
        email=data['email'], 
        password=hashed_password,
        referral_to_id=referral_to_id,  
        referral_link=referral_link,
        role_id=data['RoleId'] 
    )
    
    db.session.add(new_user)
    db.session.commit()

    create_payout_data(new_user)
    create_user_analytics(new_user)
    
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

#################################################################################################
# esta funcion se ejecuta unicamente cuando el usuario va a registrarse con un link de referido #
# para registrar un nuevo referido y asociarlo a este usuario                                   #    
#################################################################################################

@cross_origin  # Implementa CORS
@app.route('/user/referral/<string:referral_link>', methods=['POST'])
def create_ref_to_user(referral_link):
    from events.UserCreated import create_payout_data, create_user_analytics, create_referral_link

    data = request.json

    # Verifica que la contraseña esté en el cuerpo de la solicitud
    if 'password' not in data:
        return jsonify({"msg": "Password is required"}), 400
    
    hashed_password = bcrypt.hashpw(data['password'].encode('utf-8'), bcrypt.gensalt())
    
    user_referral_link = create_referral_link()  # Crea el link de referido para el usuario que se esa registrando
    referred_user = User.query.filter_by(referral_link=referral_link).first()
    
    if referred_user is None:
        return jsonify({"msg": "Invalid referral link"}), 400
    
    # Verifica si el usuario está intentando referirse a sí mismo
    if referred_user.id == data.get('referral_to_id'):
        return jsonify({"msg": "User cannot refer themselves"}), 400
     
    new_user = User(
        username=data['username'], 
        email=data['email'], 
        password=hashed_password,
        referral_to_id=referred_user.id, 
        referral_link=user_referral_link,
        role_id=data.get('RoleId')  
    )
       
    # Guardar el usuario en la base de datos
    db.session.add(new_user)
    db.session.commit()  # Guarda los cambios en la base de datos

    create_payout_data(new_user)  # Crea registros automáticamente para payout_data
    create_user_analytics(new_user)  # Inicializa las analíticas del usuario
    
    return jsonify({'message': 'User created successfully'}), 201

####################################################################################################################
# esta funcion se ejecuta unicamente cuando el usuario va a registrarse con un link de referido desde la dashboard #
# para registrar un nuevo referido y asociarlo a este usuario                                                      #    
####################################################################################################################

@cross_origin  # Implementa CORS
@jwt_required()  # Con este método se protege la ruta
@app.route('/update_referral/<int:user_id>', methods=['PUT']) 
def update_create_ref_to_user(user_id):
    try:
        data = request.json
        link = data.get('referral_link')  # Este es el link de referido a ingresar

        # Verifica que el referral_link no esté vacío
        if not link:
            return jsonify({"msg": "Referral link is required"}), 400

        # Usamos el ORM para buscar al usuario con el referral_link
        referred_user = User.query.filter_by(referral_link=link).first()

        # Usamos el ORM para buscar el usuario por ID
        user = User.query.get_or_404(user_id)

        # Verifica si el usuario referido existe
        if referred_user is None:
            return jsonify({"msg": "Invalid referral link"}), 400

        # Verifica que el usuario no se refiera a sí mismo
        if referred_user.id == user.id:
            return jsonify({"msg": "You cannot refer yourself"}), 400

        # Actualiza el 'ReferralToId' del usuario
        user.referral_to_id = referred_user.id
        db.session.commit()  # Guarda los cambios en la base de datos

        return jsonify({'message': 'Referral link updated successfully'}), 200
    except Exception as e:
        # En caso de error general, hace rollback y devuelve un mensaje de error
        db.session.rollback()  
        return jsonify({"msg": f"An error occurred: {str(e)}"}), 500

