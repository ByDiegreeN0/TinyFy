from flask import request, jsonify
from werkzeug.security import generate_password_hash
from models.User import db
from models.SupportTicketModel import SupportTicket
from app import app