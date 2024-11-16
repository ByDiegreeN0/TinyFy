# crea los triggers de la base de datos en app.py sin necesidad de 
# crearlas e importarlas 1 por una

from .MonthlyLinkCount import create_monthly_link_count_trigger

# cuando se cree otro trigger, agreguenlo aca


def create_database_triggers():
    create_monthly_link_count_trigger()
   