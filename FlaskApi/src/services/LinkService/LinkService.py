# LinkService.py
import random
import string
from models.LinksModel import Links
from app import db
from sqlalchemy.exc import SQLAlchemyError

def generar_link_corto():
    # Genera un código corto aleatorio de 6 caracteres
    return ''.join(random.choices(string.ascii_letters + string.digits, k=15))

def acortar_link(LinkName, LinkUrl, userId):
    """
    Crea un nuevo enlace acortado y lo guarda en la base de datos.

    Args:
        LinkName (str): El nombre del enlace.
        LinkUrl (str): La URL original que se va a acortar.
        userId (int): El ID del usuario que crea el enlace.

    Returns:
        str: El enlace corto generado con el dominio completo.
    
    Raises:
        ValueError: Si la URL no está presente.
        Exception: Si hay un error al guardar el enlace.
    """
    if not LinkUrl:
        raise ValueError("URL es requerida")

    LinkShortUrl = generar_link_corto()

    while Links.query.filter_by(LinkShortUrl=LinkShortUrl).first():
        LinkShortUrl = generar_link_corto()

    nuevo_link = Links(LinkName=LinkName, LinkUrl=LinkUrl, LinkShortUrl=LinkShortUrl, userId=userId)

    try:
        db.session.add(nuevo_link)
        db.session.commit()
    except SQLAlchemyError as e:
        db.session.rollback()
        raise Exception("Error al guardar el enlace: " + str(e))

    # Construir el enlace completo con el dominio
    domain = "http://localhost:5000"  # Cambia esto por tu dominio real
    full_short_url = f"{domain}/{LinkShortUrl}"

    return full_short_url  # Devuelve el enlace corto completo
