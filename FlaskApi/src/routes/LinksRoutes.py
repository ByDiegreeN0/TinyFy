from flask import request, jsonify
from flask_jwt_extended import jwt_required # libreria de flask para proteger rutas
from flask_cors import cross_origin # Implementa cross_origin para hacer peticiones desde afuera del api (esto deberia arreglar el app)

from app import app
from models.User import db
from models.LinksModel import Links


# Crear un nuevo enlace
@cross_origin # implementa CORS
@app.route('/links', methods=['POST'])
@jwt_required() # con este metodo se protege la ruta
def create_link():
    data = request.json
    new_link = Links(
        LinkName=data['LinkName'],
        LinkUrl=data['LinkUrl'],
        LinkShortUrl=data.get('LinkShortUrl'),
        ClickCount=data['ClickCount'],
        Earnings=data.get('Earnings', 0),
        CreatedAt=data.get('CreatedAt'),
        userId=data.get('userId')
    )
    db.session.add(new_link)
    db.session.commit()
    return jsonify({'message': 'Link created successfully'}), 201

# Obtener todos los enlaces
@cross_origin # implementa CORS
@app.route('/links', methods=['GET'])
@jwt_required() # con este metodo se protege la ruta
def get_links():
    links = Links.query.all()
    return jsonify([{
        'LinkId': l.LinkId,
        'LinkName': l.LinkName,
        'LinkUrl': l.LinkUrl,
        'LinkShortUrl': l.LinkShortUrl,
        'ClickCount': l.ClickCount,
        'Earnings': l.Earnings,
        'CreatedAt': l.CreatedAt,
        'userId': l.userId
    } for l in links])

# Obtener un enlace por ID
@cross_origin # implementa CORS
@app.route('/links/<int:link_id>', methods=['GET'])
@jwt_required() # con este metodo se protege la ruta
def get_link(link_id):
    link = Links.query.get_or_404(link_id)
    return jsonify({
        'LinkId': link.LinkId,
        'LinkName': link.LinkName,
        'LinkUrl': link.LinkUrl,
        'LinkShortUrl': link.LinkShortUrl,
        'ClickCount': link.ClickCount,
        'Earnings': link.Earnings,
        'CreatedAt': link.CreatedAt,
        'userId': link.userId
    })

# Actualizar un enlace por ID
@cross_origin # implementa CORS
@app.route('/links/<int:link_id>', methods=['PUT'])
@jwt_required() # con este metodo se protege la ruta
def update_link(link_id):
    link = Links.query.get_or_404(link_id)
    data = request.json
    link.LinkName = data.get('LinkName', link.LinkName)
    link.LinkUrl = data.get('LinkUrl', link.LinkUrl)
    link.LinkShortUrl = data.get('LinkShortUrl', link.LinkShortUrl)
    link.ClickCount = data.get('ClickCount', link.ClickCount)
    link.Earnings = data.get('Earnings', link.Earnings)
    link.CreatedAt = data.get('CreatedAt', link.CreatedAt)
    link.userId = data.get('userId', link.userId)
    db.session.commit()
    return jsonify({'message': 'Link updated successfully'})

# Eliminar un enlace por ID

@cross_origin # implementa CORS
@app.route('/links/<int:link_id>', methods=['DELETE'])
@jwt_required() # con este metodo se protege la ruta
def delete_link(link_id):
    link = Links.query.get_or_404(link_id)
    db.session.delete(link)
    db.session.commit()
    return jsonify({'message': 'Link deleted successfully'})
