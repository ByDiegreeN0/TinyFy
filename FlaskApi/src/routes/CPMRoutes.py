from flask import request, jsonify
from app import app
from models.User import db
from models.CPMModel import CPM

# Create
@app.route('/cpm', methods=['POST'])
def create_cpm():
    data = request.json
    new_cpm = CPM(cpmId=data['cpmId'], cpm=data['cpm'], cpmDate=data.get('cpmDate'))
    db.session.add(new_cpm)
    db.session.commit()
    return jsonify({'message': 'CPM created successfully'}), 201

# Read
@app.route('/cpm', methods=['GET'])
def get_cpm():
    cpms = CPM.query.all()
    return jsonify([{'cpmId': c.cpmId, 'cpm': c.cpm, 'cpmDate': c.cpmDate} for c in cpms])

@app.route('/cpm/<int:cpm_id>', methods=['GET'])
def get_cpm_by_id(cpm_id):
    cpm = CPM.query.get_or_404(cpm_id)
    return jsonify({'cpmId': cpm.cpmId, 'cpm': cpm.cpm, 'cpmDate': cpm.cpmDate})

# Update
@app.route('/cpm/<int:cpm_id>', methods=['PUT'])
def update_cpm(cpm_id):
    cpm = CPM.query.get_or_404(cpm_id)
    data = request.json
    cpm.cpm = data.get('cpm', cpm.cpm)
    cpm.cpmDate = data.get('cpmDate', cpm.cpmDate)
    db.session.commit()
    return jsonify({'message': 'CPM updated successfully'})

# Delete
@app.route('/cpm/<int:cpm_id>', methods=['DELETE'])
def delete_cpm(cpm_id):
    cpm = CPM.query.get_or_404(cpm_id)
    db.session.delete(cpm)
    db.session.commit()
    return jsonify({'message': 'CPM deleted successfully'})
