from rest_framework import viewsets
from .models import Item, ItemCategory, Blog, Chat
from .serializers import ItemSerializer, ItemCategorySerializer, BlogSerializer, ChatSerializer, ReplySerializer, CustomUserSerializer
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework import generics, permissions, status
from rest_framework.authtoken.models import Token
from django.db import models

class ItemCategoryViewSet(viewsets.ModelViewSet):
    queryset = ItemCategory.objects.all()
    serializer_class = ItemCategorySerializer

class BlogViewSet(viewsets.ModelViewSet):
    queryset = Blog.objects.all()
    serializer_class = BlogSerializer

class ItemViewSet(viewsets.ModelViewSet):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):  
        serializer.save(owner=self.request.user.id)
    
class ItemRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer
    permission_classes = [permissions.IsAuthenticated]

class ItemByCategorySlugAPIView(generics.ListAPIView):
    serializer_class = ItemSerializer

    def get_queryset(self):
        category_slug = self.kwargs['category_slug']
        return Item.objects.filter(category_slug=category_slug)
    
class ItemByOwnerListView(generics.ListAPIView):
    serializer_class = ItemSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user_id = self.request.user.id
        return Item.objects.filter(owner=user_id)

class ItemByCategoryIdAPIView(generics.ListAPIView):
    serializer_class = ItemSerializer

    def get_queryset(self):
        category_id = self.kwargs['category_id']
        return Item.objects.filter(category_id=category_id)

class ItemByIdAPIView(generics.RetrieveAPIView):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer
    lookup_field = 'id'

class ChatByUserAPIView(generics.ListAPIView):
    serializer_class = ChatSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user_id = self.kwargs['user_id']
        return Chat.objects.filter(sender_id=user_id) | Chat.objects.filter(receiver_id=user_id)

class UserMessagesListView(generics.ListAPIView):
    serializer_class = ChatSerializer

    def get_queryset(self):
        # Retrieve the authenticated user
        user = self.request.user

        # Retrieve messages where the user is either sender or receiver
        queryset = Chat.objects.filter(models.Q(sender=user) | models.Q(receiver=user))

        return queryset

class MessagesViewList(generics.ListAPIView):
    serializer_class = ChatSerializer

    def get_queryset(self):
        # Retrieve the authenticated user
        user = self.request.user

        # Retrieve other user id from query parameters
        other_user_id = self.request.query_params.get('other_user_id')

        if other_user_id is None:
            # Return an empty queryset if other_user_id is not provided
            return Chat.objects.none()

        # Retrieve messages exchanged between the current user and the other user
        queryset = Chat.objects.filter(
            (models.Q(sender=user, receiver=other_user_id) | models.Q(sender=other_user_id, receiver=user))
        ).order_by('timestamp')

        return queryset

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)

        # Determine the ID of the current user
        current_user_id = request.user.id

        # Include other user's ID and 'sent_by_current_user' information in the response
        other_user_id = self.request.query_params.get('other_user_id')

        response_data = {
            'other_user_id': other_user_id,
            'messages': []
        }

        messages_data = serializer.data[::-1]

        for message in messages_data:
            # Determine whether the message was sent by the current user
            message['sent_by_current_user'] = 'sentbyme' if message['sender'] == current_user_id else 'blue'
            response_data['messages'].append(message)

        return Response(response_data)

class ReplyToMessageView(generics.CreateAPIView):
    serializer_class = ChatSerializer

    def create(self, request, *args, **kwargs):
        # Retrieve the authenticated user
        sender = request.user

        # Retrieve the ID of the user the message is being sent to
        receiver_id = request.data.get('otherId')

        # Retrieve the message content
        message_content = request.data.get('message')

        if receiver_id is None or message_content is None:
            return Response({"error": "otherId and message are required fields"}, status=status.HTTP_400_BAD_REQUEST)

        # Create the message
        message_data = {
            'sender': sender.id,
            'receiver': receiver_id,
            'message': message_content
        }

        serializer = self.get_serializer(data=message_data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data, status=status.HTTP_201_CREATED)

class ConversationListView(generics.ListAPIView):
    serializer_class = ChatSerializer

    def get_queryset(self):
        # Retrieve the authenticated user
        user = self.request.user

        # Retrieve distinct conversations (other users)
        conversations = Chat.objects.filter(models.Q(sender=user) | models.Q(receiver=user)).values_list('sender', 'receiver').distinct()

        # Initialize a list to store conversation data
        conversation_data = []

        # Iterate through each conversation
        for conversation in conversations:
            other_user_id = conversation[0] if conversation[0] != user.id else conversation[1]
            other_user = User.objects.get(id=other_user_id)

            # Retrieve the latest message in the conversation
            latest_message = Chat.objects.filter(
                (models.Q(sender=user, receiver=other_user) | models.Q(sender=other_user, receiver=user))
            ).order_by('-timestamp').first()

            # Add conversation data to the list
            conversation_data.append({
                'other_user_name': other_user.username,
                'other_user_id': other_user.id,
                'last_message': latest_message.message if latest_message else None
            })

        return conversation_data

    def list(self, request, *args, **kwargs):
        data = self.get_queryset()
        return Response(data)

class UserProductViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = ItemSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user_id = self.request.user.id
        return Item.objects.filter(owner_id=user_id)

class ChatViewSet(viewsets.ModelViewSet):
    queryset = Chat.objects.all()
    serializer_class = ChatSerializer
    permission_classes = [IsAuthenticated]


class SignUp(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        email = request.data.get('email')
        
        if not username or not password or not email:
            return Response({"error": "Please provide username, password, and email"}, status=status.HTTP_400_BAD_REQUEST)
        
        if User.objects.filter(username=username).exists():
            return Response({"error": "Username already exists"}, status=status.HTTP_400_BAD_REQUEST)
        
        user = User.objects.create_user(username=username, password=password, email=email)
        refresh = RefreshToken.for_user(user)
        
        return Response({
            "refresh": str(refresh),
            "access": str(refresh.access_token),
        }, status=status.HTTP_201_CREATED)

class Login(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        
        user = authenticate(username=username, password=password)
        
        if user:
            # Create a token for the user if it does not exist, or get the existing token
            token, created = Token.objects.get_or_create(user=user)
            return Response({'token': token.key}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

        
class UserInfoView(generics.RetrieveAPIView):
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user

    def get(self, request, *args, **kwargs):
        user = self.get_object()
        serializer = CustomUserSerializer(user)
        return Response(serializer.data)
