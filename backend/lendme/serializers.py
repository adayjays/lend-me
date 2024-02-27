from rest_framework import serializers
from .models import Item, ItemCategory, Blog, Chat
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
    category = ItemCategorySerializer()  

    class Meta:
        model = Item
        fields = ['id', 'name', 'description', 'owner', 'available', 'category', 'loan_fee', 'penalty']

    def create(self, validated_data):
        category_data = validated_data.pop('category')
        category = ItemCategory.objects.get_or_create(**category_data)[0]
        item = Item.objects.create(category=category, **validated_data)
        return item

    def update(self, instance, validated_data):
        category_data = validated_data.pop('category', None)
        if category_data:
            instance.category = ItemCategory.objects.get_or_create(**category_data)[0]
        for key, value in validated_data.items():
            setattr(instance, key, value)
        instance.save()
        return instance

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