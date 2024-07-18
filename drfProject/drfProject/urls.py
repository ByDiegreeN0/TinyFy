
from django.contrib import admin
from django.urls import path, include

# este import no funcion
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    
    # Paths para el token JWT
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    
    path('roles/', include('roles.urls')),
    path('links/', include('links.urls')),
    path('referrals/', include('referrals.urls')),
    path('users/', include('users.urls')),
]