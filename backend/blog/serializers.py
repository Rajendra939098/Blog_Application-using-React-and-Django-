from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Blog

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']


class BlogSerializer(serializers.ModelSerializer):
    author = UserSerializer(read_only=True)  # Include full author details

    class Meta:
        model = Blog
        fields = '__all__'
        read_only_fields = ['author']

    def create(self, validated_data):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            validated_data['author'] = request.user
        return super().create(validated_data)