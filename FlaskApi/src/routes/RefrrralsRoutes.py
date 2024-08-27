from flask import request, jsonify
from werkzeug.security import generate_password_hash
from models.User import db
from models.ReferralsModel import Referrals
from app import app