# este archivo es creado con la funcion, de registrar un evento, el cual al ser creado un usuario, se registran
# automaticamente ciertos datos en payoutdata

from flask import Flask, request, jsonify
from models.User import User, db # importa la instancia de la libreria que interactua con la base de datos, y trae el modelo de user
from models.PayoutDataModel import Payout_Data # importa el modelo de payoutdata
from models.UserAnalyticsModel import UserAnalytics # importa el modelo de Useranalytics


def create_payout_data():
    pass

def create_user_analytics():
    pass    
 