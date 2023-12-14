from django.shortcuts import render
from parcial3App.serializers import  LineaSerializer

import pymongo
import requests
import json

from datetime import datetime
from dateutil import parser

from bson import ObjectId
from rest_framework.response import Response

from django.http.response import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.parsers import JSONParser
from rest_framework import status

from google.oauth2 import id_token
from google.auth.transport import requests

from pymongo import ReturnDocument

from django.shortcuts import render, get_object_or_404

from parcial3App.serializers import TokenSerializer

# Conexión a la base de datos MongoDB
my_client = pymongo.MongoClient("mongodb+srv://usuario:usuario@cluster0.inp8hlj.mongodb.net/?retryWrites=true&w=majority")

# Nombre de la base de datos
dbname = my_client['PruebaExamen']

# Colecciones
collection_buses = dbname['Buses']

CLIENT_ID = '739979864172-bbrds0insroblueqf3grvncjuj4m3dca.apps.googleusercontent.com'
# ----------------------------------------  VISTAS DE LA APLICACIÓN ------------------------------

@api_view(['POST'])
def oauth(request):
    if request.method == 'POST':
        serializer = TokenSerializer(data=request.data)
        if serializer.is_valid():
            tokenData = serializer.validated_data
            try:
                token = tokenData['idtoken']
                # Specify the CLIENT_ID of the app that accesses the backend:
                idinfo = id_token.verify_oauth2_token(token, requests.Request(), CLIENT_ID)

                # Or, if multiple clients access the backend server:
                # idinfo = id_token.verify_oauth2_token(token, requests.Request())
                # if idinfo['aud'] not in [CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]:
                #     raise ValueError('Could not verify audience.')

                # If auth request is from a G Suite domain:
                # if idinfo['hd'] != GSUITE_DOMAIN_NAME:
                #     raise ValueError('Wrong hosted domain.')

                # ID token is valid. Get the user's Google Account ID from the decoded token.
                userid = idinfo['sub']
                if userid:
                    return Response({"userid": userid,},
                                    status=status.HTTP_200_OK)
            except ValueError:
                # Invalid token
                return Response({"error": "Token no valido",},
                                    status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        

#Devuelve solamente el numero de lineas
@api_view(['GET'])
def lineas(request):
    if request.method == 'GET':
        buses = list(collection_buses.find())
        lineas = []
        for bus in buses:
            if bus['codLinea'] not in lineas:
                lineas.append(bus['codLinea'])
        if lineas:
            print(lineas)
            return JsonResponse(lineas, status=status.HTTP_200_OK, safe=False)
        else :
            return JsonResponse({'message': 'No hay lineas'}, status=status.HTTP_404_NOT_FOUND)
        
#Devuelve el cojunto de latitudes y longitudes de una linea y sentido concreto
@api_view(['GET'])
def latlon(request, codLinea, sentido):
    if request.method == 'GET':
        print(codLinea,sentido)
        buses = list(collection_buses.find({"codLinea": int(codLinea), "sentido": int(sentido)}))
        print(buses)
        latlon = []
        for bus in buses:
            latlon.append([bus['lat'], bus['lon']])
        if latlon:
            return JsonResponse(latlon, status=status.HTTP_200_OK, safe=False)
        else :
            return JsonResponse({'message': 'No hay latitudes y longitudes'}, status=status.HTTP_404_NOT_FOUND)

#Devuelve el cojunto de latitudes y longitudes de una parada que contenga el string que se le pasa
@api_view(['GET'])
def form2(request, parada):
    if request.method == 'GET':
        print(parada)
        buses = list(collection_buses.find({"nombreParada": {"$regex": parada, "$options": "i"}}))
        paradas = []
        for bus in buses:
            paradas.append([bus['lat'], bus['lon']])
        if paradas:
            return JsonResponse(paradas, status=status.HTTP_200_OK, safe=False)
        else :
            return JsonResponse({'message': 'No hay paradas'}, status=status.HTTP_404_NOT_FOUND)