from rest_framework import serializers

class TokenSerializer(serializers.Serializer):
    idtoken = serializers.CharField()

class LineaSerializer(serializers.Serializer):
    _id = serializers.CharField(max_length = 24, required=False)
    codLinea = serializers.CharField(max_length = 10)
    nombreLinea = serializers.CharField(max_length = 50)
    sentido = serializers.IntegerField()
    nombreParada = serializers.CharField(max_length = 50)
    lon = serializers.FloatField()
    lat = serializers.FloatField()