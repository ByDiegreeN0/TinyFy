from flask import request, jsonify
from werkzeug.security import generate_password_hash
from models.User import db
from models.LinksModel import Links
from app import app