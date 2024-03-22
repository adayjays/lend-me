from rest_framework import viewsets
from .models import Item, ItemCategory, Blog, Chat,Notification,UserProfile, Transaction
from .serializers import ItemSerializer, ItemCategorySerializer, BlogSerializer, ChatSerializer,NotificationSerializer,UserSerializer,TransactionSerializer
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
from django.db import models,transaction

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
        ).order_by('-id')

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
        bio = request.data.get('bio')
        location = request.data.get('location')
        profile_picture = request.FILES.get('profile_picture')
        first_name = request.data.get('first_name')
        last_name = request.data.get('last_name')
        
        if not username or not password or not email:
            return Response({"error": "Please provide username, password, and email"}, status=status.HTTP_400_BAD_REQUEST)
        
        if User.objects.filter(username=username).exists():
            return Response({"error": "Username already exists"}, status=status.HTTP_400_BAD_REQUEST)
        
        # Create the User instance
        user = User.objects.create_user(username=username, password=password, email=email,first_name=first_name,last_name=last_name)
        
        # Create the CustomUser instance and copy over the necessary details
        with transaction.atomic():
            custom_user = UserProfile.objects.create(
                user=user,
                bio=bio,
                location=location,
                profile_picture=profile_picture
            )

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
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user

    def get(self, request, *args, **kwargs):
        user = self.get_object()
        serializer = self.serializer_class(user)
        return Response(serializer.data)
    
class NotificationListView(generics.ListAPIView):
    serializer_class = NotificationSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Notification.objects.filter(user=user)

class NotificationDetailView(generics.RetrieveAPIView):
    serializer_class = NotificationSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Notification.objects.filter(user=user)


class BorrowItemView(generics.CreateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = TransactionSerializer

    def create(self, request, *args, **kwargs):
        item_id = request.data.get('item_id')
        lender_id = request.data.get('lender_id')

        # Check if the item exists and is available
        try:
            item = Item.objects.get(pk=item_id, available=True)
        except Item.DoesNotExist:
            return Response({'error': 'Item not found or not available'}, status=status.HTTP_400_BAD_REQUEST)

        # Create a pending transaction
        transaction = Transaction.objects.create(
            borrower=request.user,
            lender_id=lender_id,
            item=item,
            status='pending'
        )

        # Create a notification
        notification_message = f"{request.user.username} is interested in borrowing {item.name}"
        notification = Notification.objects.create(
            user_id=lender_id,
            message=notification_message
        )

        # Serialize the transaction and return the response
        serializer = self.serializer_class(transaction)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

class AcceptBorrowRequestView(generics.UpdateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = TransactionSerializer
    queryset = Transaction.objects.all()

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        
        # Check if the current user is the owner of the item
        if request.user != instance.item.owner:
            return Response({'error': 'Unauthorized'}, status=status.HTTP_403_FORBIDDEN)

        # Update the transaction status to 'accepted'
        instance.status = 'accepted'
        instance.save()

        # Update the item as not available
        instance.item.available = False
        instance.item.save()

        # Create a notification for the borrower
        notification_message = f"Your borrow request for {instance.item.name} has been accepted"
        notification = Notification.objects.create(
            user_id=instance.borrower,
            message=notification_message
        )

        serializer = self.serializer_class(instance)
        return Response(serializer.data)
    
class ItemRequestsView(generics.ListAPIView):
    serializer_class = TransactionSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        item_id = self.request.query_params.get('item_id')
        return Transaction.objects.filter(lender=self.request.user, item_id=item_id, status='pending')
    
class DenyItemRequestView(generics.UpdateAPIView):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer
    permission_classes = [permissions.IsAuthenticated]

    def update(self, request, *args, **kwargs):
        transaction_id = kwargs.get('pk')
        try:
            # Retrieve the transaction object
            transaction = Transaction.objects.get(id=transaction_id)
        except Transaction.DoesNotExist:
            return Response({"error": "Transaction does not exist."}, status=404)
        
        # Ensure the transaction belongs to the authenticated user (lender)
        if transaction.lender != request.user:
            return Response({"error": "You are not allowed to deny this item request."}, status=403)
        
        # Update the status of the transaction to 'denied'
        transaction.status = 'denied'
        transaction.save()

        # Create a notification for the borrower
        Notification.objects.create(
            user_id=transaction.borrower,
            message=f"Your request for item '{transaction.item.name}' has been denied."
        )

        serializer = self.get_serializer(transaction)
        return Response(serializer.data)