from django.db import models
from django.contrib.auth.models import User
from django.utils.text import slugify
from datetime import datetime, timedelta
from django.utils import timezone


class ItemCategory(models.Model):
    name = models.CharField(max_length=100)
    slug = models.SlugField(unique=True, max_length=255, blank=True)

    def save(self, *args, **kwargs):
        self.slug = slugify(self.name)
        super(ItemCategory, self).save(*args, **kwargs)

class Item(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    category = models.ForeignKey(ItemCategory, on_delete=models.CASCADE)
    available = models.BooleanField(default=True)
    loan_fee = models.DecimalField(max_digits=10, decimal_places=2)  
    penalty = models.DecimalField(max_digits=10, decimal_places=2)   


class Chat(models.Model):
    sender = models.ForeignKey(User, related_name='sent_chats', on_delete=models.CASCADE)
    receiver = models.ForeignKey(User, related_name='received_chats', on_delete=models.CASCADE)
    message = models.TextField(max_length=1000)
    timestamp = models.DateTimeField(auto_now_add=True)
    read = models.BooleanField(default=False)  # Read status field
    deleted = models.BooleanField(default=False)

    class Meta:
        indexes = [
            models.Index(fields=['sender', 'receiver', 'timestamp']),
        ]

    def delete(self, using=None, soft=True):
        if soft:
            self.deleted = True
            self.save()
        else:
            super().delete(using=using)

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    location = models.CharField(max_length=255)
    bio = models.TextField(blank=True)
    completed_transactions = models.PositiveIntegerField(default=0)
    profile_picture = models.ImageField(upload_to='profile_pictures/', null=True, blank=True)
  
def default_end_date():
    return timezone.now().date() + timedelta(days=7)

class CustomDateField(models.DateField):
    def to_representation(self, value):
        return value.date()

class Transaction(models.Model):
    borrower = models.ForeignKey(User, related_name='borrower', on_delete=models.CASCADE)
    lender = models.ForeignKey(User, related_name='lender', on_delete=models.CASCADE)
    item = models.ForeignKey(Item, on_delete=models.CASCADE)
    start_date = models.DateField(default=timezone.now().date())
    end_date = CustomDateField(default=default_end_date)  # Default to 1 week from today
    status = models.CharField(max_length=50)

    def save(self, *args, **kwargs):
        # Ensure start_date is always set to today
        if not self.start_date:
            self.start_date = timezone.now().date()
        # Ensure end_date is always 1 week from today
        if not self.end_date:
            self.end_date = default_end_date()
        super().save(*args, **kwargs)

class Blog(models.Model):
    title = models.CharField(max_length=255)
    content = models.TextField()
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    slug = models.SlugField(unique=True, max_length=255, blank=True)

    def save(self, *args, **kwargs):
        self.slug = slugify(self.title)
        super(Blog, self).save(*args, **kwargs)

class Review(models.Model):
    reviewer = models.ForeignKey(User, related_name='reviewer', on_delete=models.CASCADE)
    reviewed_user = models.ForeignKey(User, related_name='reviewed_user', on_delete=models.CASCADE)
    reviewed_item = models.ForeignKey(Item, on_delete=models.CASCADE, null=True, blank=True)
    rating = models.IntegerField()  # Rating on a scale (e.g., 1 to 5)
    comment = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

class Notification(models.Model):
    user = models.ForeignKey(User, related_name='sent_notifications', on_delete=models.CASCADE)
    message = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)
    read = models.BooleanField(default=False)

    class Meta:
        ordering = ['-timestamp']

    def __str__(self):
        return f"{self.sender.username} to {self.receiver.username}: {self.message}"