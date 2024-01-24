from django.contrib import admin
from .models import Item, Chat, UserProfile, Transaction, Blog, Review

@admin.register(Item)
class ItemAdmin(admin.ModelAdmin):
    list_display = ('name', 'owner', 'available')

@admin.register(Chat)
class ChatAdmin(admin.ModelAdmin):
    list_display = ('sender', 'receiver', 'timestamp')

@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'username', 'first_name', 'last_name', 'location', 'completed_transactions')

@admin.register(Transaction)
class TransactionAdmin(admin.ModelAdmin):
    list_display = ('borrower', 'lender', 'item', 'start_date', 'end_date', 'status')

@admin.register(Blog)
class BlogAdmin(admin.ModelAdmin):
    list_display = ('title', 'author', 'created_at')

@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = ('reviewer', 'reviewed_user', 'reviewed_item', 'rating', 'comment', 'created_at')
