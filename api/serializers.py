"""Serializers Module"""
from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth import get_user_model
from api.models import Face
User = get_user_model()


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    """Token Serializer"""

    def validate(self, attrs):
        data = super().validate(attrs)

        serializer = UserSerializerWithToken(self.user).data

        for key, value in serializer.items():
            data[key] = value

        return data


class UserSerializer(serializers.ModelSerializer):
    """User Serializer"""

    is_admin = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'is_admin']

    def get_is_admin(self, obj):
        return obj.is_staff


class UserSerializerWithToken(UserSerializer):
    """User Serializer with Token"""

    token = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ['id', 'firstname', 'email', 'is_admin', 'token']

    def get_token(self, obj):
        token = RefreshToken.for_user(obj)
        return str(token.access_token)


class CollectionSerializer(serializers.ModelSerializer):
    """Collections Serializer"""

    class Meta:
        model = Face
        fields = ['id', 'user', 'filename', 'image', 'processedImage']
