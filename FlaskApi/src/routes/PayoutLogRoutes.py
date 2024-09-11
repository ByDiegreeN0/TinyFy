from flask import request, jsonify
from app import app
from models.User import db

from models.PayoutLogModel import PayoutLog

# Create
@app.route('/payout_log', methods=['POST'])
def create_payout_log():
    data = request.json
    new_payout_log = PayoutLog(
        PayoutAmount=data['PayoutAmount'],
        PayoutRequestedAt=data.get('PayoutRequestedAt'),
        PayoutDoneAt=data.get('PayoutDoneAt'),
        PayoutStatus=data['PayoutStatus']
    )
    new_payout_log.PayoutConfigId = data.get('PayoutConfigId', None)
    new_payout_log.UserId = data.get('UserId', None)
    db.session.add(new_payout_log)
    db.session.commit()
    return jsonify({'message': 'Payout Log created successfully'}), 201

# Read
@app.route('/payout_log', methods=['GET'])
def get_payout_log():
    payout_logs = PayoutLog.query.all()
    return jsonify([{
        'PayoutLogId': pl.PayoutLogId,
        'PayoutAmount': pl.PayoutAmount,
        'PayoutRequestedAt': pl.PayoutRequestedAt,
        'PayoutDoneAt': pl.PayoutDoneAt,
        'PayoutStatus': pl.PayoutStatus,
        'PayoutConfigId': pl.PayoutConfigId,
        'UserId': pl.UserId
    } for pl in payout_logs])

@app.route('/payout_log/<int:payout_log_id>', methods=['GET'])
def get_payout_log_by_id(payout_log_id):
    payout_log = PayoutLog.query.get_or_404(payout_log_id)
    return jsonify({
        'PayoutLogId': payout_log.PayoutLogId,
        'PayoutAmount': payout_log.PayoutAmount,
        'PayoutRequestedAt': payout_log.PayoutRequestedAt,
        'PayoutDoneAt': payout_log.PayoutDoneAt,
        'PayoutStatus': payout_log.PayoutStatus,
        'PayoutConfigId': payout_log.PayoutConfigId,
        'UserId': payout_log.UserId
    })

# Update
@app.route('/payout_log/<int:payout_log_id>', methods=['PUT'])
def update_payout_log(payout_log_id):
    payout_log = PayoutLog.query.get_or_404(payout_log_id)
    data = request.json
    payout_log.PayoutAmount = data.get('PayoutAmount', payout_log.PayoutAmount)
    payout_log.PayoutRequestedAt = data.get('PayoutRequestedAt', payout_log.PayoutRequestedAt)
    payout_log.PayoutDoneAt = data.get('PayoutDoneAt', payout_log.PayoutDoneAt)
    payout_log.PayoutStatus = data.get('PayoutStatus', payout_log.PayoutStatus)
    payout_log.PayoutConfigId = data.get('PayoutConfigId', payout_log.PayoutConfigId)
    payout_log.UserId = data.get('UserId', payout_log.UserId)
    db.session.commit()
    return jsonify({'message': 'Payout Log updated successfully'})

# Delete
@app.route('/payout_log/<int:payout_log_id>', methods=['DELETE'])
def delete_payout_log(payout_log_id):
    payout_log = PayoutLog.query.get_or_404(payout_log_id)
    db.session.delete(payout_log)
    db.session.commit()
    return jsonify({'message': 'Payout Log deleted successfully'})