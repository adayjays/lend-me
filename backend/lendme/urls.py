from django.urls import path, include
from rest_framework.authtoken import views
from rest_framework.routers import DefaultRouter
from .views import ItemCategoryViewSet, BlogViewSet, ItemViewSet, ItemByCategorySlugAPIView, ItemByCategoryIdAPIView, ItemByIdAPIView, ChatViewSet, UserProductViewSet, ChatByUserAPIView
from .views import SignUp, Login, UserInfoView, ItemByOwnerListView,ItemViewSet,MessagesViewList, ConversationListView,ReplyToMessageView

router = DefaultRouter()
router.register(r'itemcategories', ItemCategoryViewSet)
router.register(r'blogs', BlogViewSet)
router.register(r'items', ItemViewSet)
router.register(r'chats', ChatViewSet, basename='chat')
router.register(r'user-products', UserProductViewSet, basename='user-product')

urlpatterns = [
    path('', include(router.urls)),
    path('send-message/', ReplyToMessageView.as_view(), name='reply-to-message'),
    path('user-messages/', MessagesViewList.as_view(), name='user-messages'),
    path('conversations/', ConversationListView.as_view(), name='conversation-list'),
    path('items-owner/', ItemByOwnerListView.as_view(), name='items-owner'),
    path('items/by-category-slug/<str:category_slug>/', ItemByCategorySlugAPIView.as_view(), name='item-by-category-slug'),
    path('items/by-category-id/<int:category_id>/', ItemByCategoryIdAPIView.as_view(), name='item-by-category-id'),
    path('items/<int:id>/', ItemByIdAPIView.as_view(), name='item-by-id'),
    path('chats/by-user/<int:user_id>/', ChatByUserAPIView.as_view(), name='chat-by-user'),
    path('user-info/', UserInfoView.as_view(), name='user-info'),
    path('signup/', SignUp.as_view(), name='signup'),
    path('login/', Login.as_view(), name='login'),

]
