from django.urls import path
from parcial3App import views

urlpatterns = [
    # PRODUCTOS
    path('logged', views.oauth),
    path('lineas/', views.lineas),
    path('lineas/<str:codLinea>/<str:sentido>/', views.latlon),
    path('paradas/<str:parada>/', views.form2),
]