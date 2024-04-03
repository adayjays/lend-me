from rest_framework import serializers

from .recommendation_service import get_recommendations_for_user
from .models import Item, ItemCategory, Blog, Chat,UserProfile, Notification, Transaction
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
    # user = serializers.PrimaryKeyRelatedField(read_only=True)  
    class Meta:
        model = Chat
        fields = ['id', 'sender', 'receiver', 'message', 'timestamp']
        
class ReplySerializer(serializers.ModelSerializer):
    class Meta:
        model = Chat
        fields = ['sender', 'receiver', 'message']

class UserProductSerializer(serializers.ModelSerializer):
    category = ItemCategorySerializer()  

    class Meta:
        model = Item
        fields = ['id', 'name', 'description', 'owner', 'available', 'category', 'loan_fee', 'penalty']

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ['user', 'location', 'bio', 'completed_transactions', 'profile_picture']

    def get_profile_picture_url(self, obj):
        request = self.context.get('request')
        if obj.profile_picture and hasattr(obj.profile_picture, 'url'):
            return request.build_absolute_uri(obj.profile_picture.url)
        return None

class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = ['id', 'user', 'message', 'timestamp', 'read']

class TransactionSerializer(serializers.ModelSerializer):
    borrower_username = serializers.CharField(source='borrower.username', read_only=True)

    class Meta:
        model = Transaction
        fields = ['id', 'borrower','borrower_username', 'lender', 'item', 'start_date', 'end_date', 'status']


class RecommendationSerializer(serializers.ModelSerializer):
    recommendations = serializers.SerializerMethodField()

    def get_recommendations(self, obj):
        user = self.context['request'].user
        return get_recommendations_for_user(user)
