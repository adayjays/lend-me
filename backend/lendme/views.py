from rest_framework import viewsets
from .models import Item, ItemCategory, Blog, Chat
from .serializers import ItemSerializer, ItemCategorySerializer, BlogSerializer, ChatSerializer
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated

class ItemCategoryViewSet(viewsets.ModelViewSet):
    queryset = ItemCategory.objects.all()
    serializer_class = ItemCategorySerializer

class BlogViewSet(viewsets.ModelViewSet):
    queryset = Blog.objects.all()
    serializer_class = BlogSerializer

class ItemViewSet(viewsets.ModelViewSet):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer

class ItemByCategorySlugAPIView(generics.ListAPIView):
    serializer_class = ItemSerializer

    def get_queryset(self):
        category_slug = self.kwargs['category_slug']
        return Item.objects.filter(category__slug=category_slug)

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