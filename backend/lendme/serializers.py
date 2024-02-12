from rest_framework import serializers
from .models import Item, ItemCategory, Blog

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
