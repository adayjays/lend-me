from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ItemCategoryViewSet, BlogViewSet, ItemViewSet

router = DefaultRouter()
router.register(r'itemcategories', ItemCategoryViewSet)
router.register(r'blogs', BlogViewSet)
router.register(r'items', ItemViewSet)

urlpatterns = [
    path('', include(router.urls)),
]