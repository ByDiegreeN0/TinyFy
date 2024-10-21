from flask import request, jsonify  # Para manejar solicitudes y respuestas JSON
from flask_jwt_extended import jwt_required  # Para proteger rutas con JWT
from flask_cors import cross_origin  # Para habilitar CORS
from app import app  # Importa la instancia de la aplicación Flask
from models.User import db  # Importa la instancia de SQLAlchemy
from models.LinksModel import Links  # Importa el modelo Links
from services.LinkService.AmountClicks import register_click  
from services.LinkService.LinkService import generar_link_corto


@cross_origin  # Implementa CORS
@app.route('/click', methods=['POST'])
def click_endpoint():
    data = request.json
    link_id = data.get('LinkId')  # Obtener el LinkId del cuerpo de la solicitud

    if link_id is not None:
        try:
            register_click(link_id)  # Llama a la función para registrar el click
            return jsonify({'status': 'success'}), 201  # Respuesta exitosa
        except ValueError as e:
            return jsonify({'status': 'error', 'message': str(e)}), 404  # Manejo de error
    return jsonify({'status': 'error', 'message': 'LinkId required'}), 400  # Manejo de error


@cross_origin  # Implementa CORS
@jwt_required()
@app.route('/links', methods=['POST'])
def create_link():
    data = request.json

    # Validación básica de datos
    if not data or 'LinkUrl' not in data:
        return jsonify({'error': 'Missing data'}), 400

    # Generar el enlace corto
    link_short_url = generar_link_corto()

    new_link = Links(
        LinkName=data.get('LinkName'),  
        LinkUrl=data['LinkUrl'],
        LinkShortUrl=link_short_url,  
        ClickCount=data.get('ClickCount', 0),
        Earnings=data.get('Earnings', 0),
        CreatedAt=data.get('CreatedAt'),
        userId=data.get('userId')
    )

    # Agregar a la base de datos
    db.session.add(new_link)
    db.session.commit()

    # Construir el enlace completo con el dominio
    domain = "http://localhost:5000"  
    full_short_url = f"{domain}/{link_short_url}"

    return jsonify({
        'message': 'Link created successfully',
        'shortUrl': full_short_url  # Devuelve el enlace corto completo
    }), 201


# Read
@cross_origin  # Implementa CORS
@jwt_required()
@app.route('/links', methods=['GET'])
def get_links():
    links = Links.query.all()
    domain = "http://localhost:5000"  # Cambia esto por tu dominio real
    return jsonify([{
        'LinkId': l.LinkId,
        'LinkName': l.LinkName,
        'LinkUrl': l.LinkUrl,
        'LinkShortUrl': f"{domain}/{l.LinkShortUrl}",  # Incluir dominio en el enlace corto
        'ClickCount': l.ClickCount,
        'Earnings': l.Earnings,
        'CreatedAt': l.CreatedAt,
        'userId': l.userId
    } for l in links])


@cross_origin  # Implementa CORS
@jwt_required()
@app.route('/links/<int:link_id>', methods=['GET'])
def get_link(link_id):
    link = Links.query.get_or_404(link_id)
    domain = "http://localhost:5000"  # Cambia esto por tu dominio real
    return jsonify({
        'LinkId': link.LinkId,
        'LinkName': link.LinkName,
        'LinkUrl': link.LinkUrl,
        'LinkShortUrl': f"{domain}/{link.LinkShortUrl}",  # Incluir dominio en el enlace corto
        'ClickCount': link.ClickCount,
        'Earnings': link.Earnings,
        'CreatedAt': link.CreatedAt,
        'userId': link.userId
    })


# Update
@cross_origin  # Implementa CORS
@jwt_required()
@app.route('/links/<int:link_id>', methods=['PUT'])
def update_link(link_id):
    link = Links.query.get_or_404(link_id)
    data = request.json
    link.LinkName = data.get('LinkName', link.LinkName)
    link.LinkUrl = data.get('LinkUrl', link.LinkUrl)
    link.ClickCount = data.get('ClickCount', link.ClickCount)
    link.Earnings = data.get('Earnings', link.Earnings)
    link.CreatedAt = data.get('CreatedAt', link.CreatedAt)
    link.userId = data.get('userId', link.userId)
    db.session.commit()
    return jsonify({'message': 'Link updated successfully'})


# Delete
@cross_origin  # Implementa CORS
@jwt_required()
@app.route('/links/<int:link_id>', methods=['DELETE'])
def delete_link(link_id):
    link = Links.query.get_or_404(link_id)
    db.session.delete(link)
    db.session.commit()
    return jsonify({'message': 'Link deleted successfully'})
