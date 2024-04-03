from django.db.models import Count

from .models import Item, UserItemInteraction, ItemCategory

from django.db.models import Count

def get_recommendations_for_user(user, num_recommendations=5):
    """
    Returns a list of recommended items for the given user based on their
    interactions with items from the same category.
    
    Args:
        user (User): The user for whom recommendations are to be generated.
        num_recommendations (int): The maximum number of recommendations to return.
    
    Returns:
        list: A list of recommended Item objects.
    """
    # Get the categories of items the user has interacted with, ordered by the number of interactions
    user_categories = ItemCategory.objects.filter(
        item__useriteminteraction__user=user
    ).annotate(
        num_interactions=Count('item__useriteminteraction')
    ).order_by('-num_interactions')
    
    recommended_items = []
    for category in user_categories:
        # Get items from the current category that the user hasn't interacted with
        items = Item.objects.filter(
            category=category
        ).exclude(
            useriteminteraction__user=user
        ).order_by('?')[:num_recommendations]
        
        recommended_items.extend(items)
        
        if len(recommended_items) >= num_recommendations:
            break
    
    return recommended_items[:num_recommendations]