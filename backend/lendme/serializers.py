from rest_framework import serializers
from .models import Item, ItemCategory, Blog, Chat,CustomUser
from django.contrib.auth.models import User

class ItemCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = ItemCategory
        fields = ['id', 'name', 'slug']

class BlogSerializer(serializers.ModelSerializer):
    class Meta:
        model = Blog
        fields = ['id', 'title', 'content', 'author', 'created_at', 'slug']

class ItemSerializer(serializers.ModelSerializer):
    owner = serializers.PrimaryKeyRelatedField(read_only=True)  

    class Meta:
        model = Item
        fields = '__all__'

    def create(self, validated_data):
        validated_data['owner'] = self.context['request'].user
        return super().create(validated_data)

class ChatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chat
        fields = ['id', 'sender', 'receiver', 'message', 'timestamp']

class UserProductSerializer(serializers.ModelSerializer):
    category = ItemCategorySerializer()  

    class Meta:
        model = Item
        fields = ['id', 'name', 'description', 'owner', 'available', 'category', 'loan_fee', 'penalty']

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']

class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'email', 'bio', 'location', 'completed_transactions']