# LinkService.py
import random
import string
from models.Links import Links
from models.LinksModel import LinksModel
from app import db
from sqlalchemy.exc import SQLAlchemyError

def generar_link_corto():
    # Genera un código corto aleatorio de 6 caracteres
    return ''.join(random.choices(string.ascii_letters + string.digits, k=15))

def acortar_link(LinkName, LinkUrl, userId):
    """
    Crea un nuevo enlace acortado y lo guarda en la base de datos.

    Args:
        link_name (str): El nombre del enlace.
        link_url (str): La URL original que se va a acortar.
        user_id (int): El ID del usuario que crea el enlace.

    Returns:
        str: El enlace corto generado.
    
    Raises:
        ValueError: Si la URL no está presente.
        Exception: Si hay un error al guardar el enlace.
    """
    if not LinkUrl:
        raise ValueError("URL es requerida")

    LinkShortUrl = generar_codigo()

    while Links.query.filter_by(LinkShortUrl=LinkShortUrl).first():
        LinkShortUrl = generar_codigo()

    nuevo_link = Links(LinkName=LinkName, LinkUrl=LinkUrl, LinkShortUrl=LinkShortUrl, userId=userId)

    try:
        db.session.add(nuevo_link)
        db.session.commit()
    except SQLAlchemyError as e:
        db.session.rollback()
        raise Exception("Error al guardar el enlace: " + str(e))

    return LinkShortUrl


# FUNCION PARA SUMAR LAS VISTAS DE LOS LINKS AL SER VISITADOS

def sumar_vistas(LinkShortUrl):
    link = Links.query.filter_by(LinkShortUrl=LinkShortUrl).first() # busca en base de datos el link correspondiente al SHORURL que retorno la funcion pasada
    
    if link:
        link.ClickCount += 1 # suma 1 a la cantidad de clicks
        db.session.commit() # guarda en base de datos los cambios
    else:
        raise ValueError("Link no encontrado") # si no encuentra el link, lanza una excepcion con un mensaje de error    