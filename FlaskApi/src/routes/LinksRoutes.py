from flask import request, jsonify
from flask_jwt_extended import jwt_required
from flask_cors import cross_origin
from app import app
from models.User import db
from models.LinksModel import Links
import random
import string

# Función para generar un enlace corto aleatorio
def generar_link_corto():
    return ''.join(random.choices(string.ascii_letters + string.digits, k=15))

@cross_origin  # Implementa CORS
@jwt_required()
@app.route('/links', methods=['POST'])
def create_link():
    data = request.json

    # Validación básica de datos
    if not data or 'LinkUrl' not in data or 'ClickCount' not in data:
        return jsonify({'error': 'Missing data'}), 400

    # Generar enlace corto
    link_short_url = generar_link_corto()

    new_link = Links(
        LinkName=data.get('LinkName'),  # Usar get para evitar KeyError
        LinkUrl=data['LinkUrl'],
        LinkShortUrl=link_short_url,  # Guardar el enlace corto
        ClickCount=data.get('ClickCount', 0),
        Earnings=data.get('Earnings', 0),
        CreatedAt=data.get('CreatedAt'),
        userId=data.get('userId')
    )

    # Agregar a la base de datos
    db.session.add(new_link)
    db.session.commit()
    return jsonify({
        'message': 'Link created successfully',
        'shortUrl': f"http://localhost:5000/{link_short_url}"
    }), 201
