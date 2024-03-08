from django.db import models
from django.contrib.auth.models import User
from django.utils.text import slugify
from django.contrib.auth.models import AbstractUser, Group, Permission


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
    username = models.CharField(max_length=30, unique=True)
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    location = models.CharField(max_length=255)
    completed_transactions = models.PositiveIntegerField(default=0)

class Transaction(models.Model):
    borrower = models.ForeignKey(User, related_name='borrower', on_delete=models.CASCADE)
    lender = models.ForeignKey(User, related_name='lender', on_delete=models.CASCADE)
    item = models.ForeignKey(Item, on_delete=models.CASCADE)
    start_date = models.DateField()
    end_date = models.DateField()
    status = models.CharField(max_length=50)  # e.g., "pending", "completed", "cancelled"

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

class CustomUser(AbstractUser):
    bio = models.TextField(blank=True)
    location = models.CharField(max_length=100, blank=True)
    completed_transactions = models.IntegerField(default=0)
    profile_picture = models.ImageField(upload_to='profile_pictures/', null=True, blank=True)

    groups = models.ManyToManyField(Group, related_name='customuser_set', blank=True)
    user_permissions = models.ManyToManyField(Permission, related_name='customuser_set', blank=True)