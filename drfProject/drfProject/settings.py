

from pathlib import Path
from datetime import timedelta


# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/5.0/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'django-insecure-de4$xc$bze67*0#(+m*%8zzspcbs+fgofn49839tdk3&_cqg+$'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = []


# Application definition

INSTALLED_APPS = [ # se define CADA app creada y CADA libreria nueva usada
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework_simplejwt',
    'rest_framework',
    'links',
    'roles',
    'referrals',
    'API',
    'User'
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware', # Se muestran todas las utilidades para el middleware de la aplicacion
    'django.contrib.sessions.middleware.SessionMiddleware', # Se muestran todas las utilidades para el middleware de la aplicacion
    'django.middleware.common.CommonMiddleware', # Se muestran todas las utilidades para el middleware de la aplicacion
    'django.middleware.csrf.CsrfViewMiddleware', # Se muestran todas las utilidades para el middleware de la aplicacion
    'django.contrib.auth.middleware.AuthenticationMiddleware', # Se muestran todas las utilidades para el middleware de la aplicacion,
    'django.contrib.messages.middleware.MessageMiddleware', # Se muestran todas las utilidades para el middleware de la aplicacion
    'django.middleware.clickjacking.XFrameOptionsMiddleware', # Se muestran todas las utilidades para el middleware de la aplicacion
]

REST_FRAMEWORK = {
    
     'DEFAULT_PERMISSION_CLASSES': (
        'rest_framework.permissions.IsAuthenticated',
    ),
     
     
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework.authentication.SessionAuthentication',  # Se definen todas las utilidades de rest_framework
        'rest_framework.authentication.BasicAuthentication',    # Se definen todas las utilidades de rest_framework
        'rest_framework_simplejwt.authentication.JWTAuthentication',# Se definen todas las utilidades de rest_framework
    ),
}


SIMPLE_JWT = { ## ESTE BLOQUE ES PARA LA CONFIGURACION DE SIMPLE JWT
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=60),  # Duración del token de acceso
    'REFRESH_TOKEN_LIFETIME': timedelta(days=1),     # Duración del token de refresco
    'ROTATE_REFRESH_TOKENS': True,
    'BLACKLIST_AFTER_ROTATION': True,
    
    'ALGORITHM': 'HS256',  # Algoritmo de encriptación 
    'SIGNING_KEY': 'your_secret_key',  # Clave secreta para firmar los tokens
    'VERIFYING_KEY': None,

    'AUTH_HEADER_TYPES': ('Bearer',),
    'USER_ID_FIELD': 'id', # obtener ids de las tablas de usuarios
    'USER_ID_CLAIM': 'user_id', # obtener ids de las tablas de usuarios

    'AUTH_TOKEN_CLASSES': ('rest_framework_simplejwt.tokens.AccessToken',),
    'TOKEN_TYPE_CLAIM': 'token_type',

    'JTI_CLAIM': 'jti',

    'SLIDING_TOKEN_REFRESH_EXP_CLAIM': 'refresh_exp',
    'SLIDING_TOKEN_LIFETIME': timedelta(minutes=5), # se define cuanto dura cada SLIDING TOKEN
    'SLIDING_TOKEN_REFRESH_LIFETIME': timedelta(days=1), # se define cuanto dura cada SLIDING TOKEN
}

ROOT_URLCONF = 'drfProject.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'drfProject.wsgi.application'


# Database
# https://docs.djangoproject.com/en/5.0/ref/settings/#databases

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.mysql",
        "NAME": "carlitosappdatabase",
        "USER": "root", # DATOS POR DEFECTO PARA ACCEDER A LA BASE DE DATOS
        "PASSWORD": "",
        "HOST": "127.0.0.1",
        "PORT": "3306",
    }
}



# Password validation
# https://docs.djangoproject.com/en/5.0/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]





# Internationalization
# https://docs.djangoproject.com/en/5.0/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/5.0/howto/static-files/

STATIC_URL = 'static/'

# Default primary key field type
# https://docs.djangoproject.com/en/5.0/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

AUTH_USER_MODEL = 'User.user' # Se define el modelo de usuario a utilizar en Django