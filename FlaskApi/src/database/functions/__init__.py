
# crea las funciones de la base de datos en app.py sin necesidad de 
# crearlas e importarlas 1 por una

from .MonthlyLinkCountFunction import monthly_link_count
from .CreateUserEarningsFunction import create_user_earnings_function

# cuando se cree otra funcion, agreguenla aca

def create_database_functions(): 
    monthly_link_count()
    create_user_earnings_function()
from .MonthlyLinkCountFunction import monthly_link_count
from .NumberClics import *
