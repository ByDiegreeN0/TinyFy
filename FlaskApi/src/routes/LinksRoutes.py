from flask import request, jsonify
from app import app
from models.User import db

from models.LinksModel import Links

# Create
@app.route('/links', methods=['POST'])
def create_link():
    data = request.json
    new_link = Links(
        LinkUrl=data['LinkUrl'],
        ClickCount=data['ClickCount'],
        DailyViewCount=data['DailyViewCount'],
        MonthlyViewCount=data['MonthlyViewCount'],
        YearlyViewCount=data['YearlyViewCount'],
        CreatedAt=data.get('CreatedAt')
    )
    new_link.userId = data.get('userId', None)
    db.session.add(new_link)
    db.session.commit()
    return jsonify({'message': 'Link created successfully'}), 201

# Read
@app.route('/links', methods=['GET'])
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

@app.route('/links/<int:link_id>', methods=['GET'])
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

# Update
@app.route('/links/<int:link_id>', methods=['PUT'])
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

# Delete
@app.route('/links/<int:link_id>', methods=['DELETE'])
def delete_link(link_id):
    link = Links.query.get_or_404(link_id)
    db.session.delete(link)
    db.session.commit()
    return jsonify({'message': 'Link deleted successfully'})
