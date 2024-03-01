from django.contrib import admin
from .models import ItemCategory, Item, Chat, UserProfile, Transaction, Blog, Review, CustomUser

@admin.register(ItemCategory)
class ItemCategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug')

@admin.register(Item)
class ItemAdmin(admin.ModelAdmin):
    list_display = ('name', 'description', 'owner', 'category', 'available', 'loan_fee', 'penalty')

@admin.register(Chat)
class ChatAdmin(admin.ModelAdmin):
    list_display = ('sender', 'receiver', 'message', 'timestamp')

@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'username', 'first_name', 'last_name', 'location', 'completed_transactions')

@admin.register(Transaction)
class TransactionAdmin(admin.ModelAdmin):
    list_display = ('borrower', 'lender', 'item', 'start_date', 'end_date', 'status')

@admin.register(Blog)
class BlogAdmin(admin.ModelAdmin):
    list_display = ('title', 'content', 'author', 'created_at', 'slug')

@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = ('reviewer', 'reviewed_user', 'reviewed_item', 'rating', 'comment', 'created_at')

@admin.register(CustomUser)
class CustomeUserAdmin(admin.ModelAdmin):
    list_display = ('username', 'bio', 'location', 'completed_transactions', 'profile_picture', 'email')
