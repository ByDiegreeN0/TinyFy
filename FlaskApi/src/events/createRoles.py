# Este archivo es creado apenas se inicia la app (es decir con flask run y tal) 
# lo que hace es crear mirar si estan los roles y si no los crea de inmediato

# models
from models.RolesModel import Roles
from models.User import db

def create_roles ():
    # try para que intente algo si, el try no es necesario como tal pero si es bueno ya que
    # identifica errores con la base de datos ya que este evento inicializa directamente con esta
    try:
        if Roles.query.filter_by(Role='admin').first() is None: #Mira si el rol ya esta creado o no
            new_role = Roles(Role='admin') # Si no esta creado lo crea
            db.session.add(new_role)
    
        if Roles.query.filter_by(Role='user').first() is None:
            new_role = Roles(Role='user')
            db.session.add(new_role)
        
        db.session.commit() # Envia los cambios a la base de datos si los roles ya estan creado siplemente envia null y pos no pasa nada
        print("Roles hechos") # Este print no es necesario pero indica que todo fue correcto
    except Exception as e:
        db.session.rollback()
        print(f"Ocurrio un error: {str(e)}")