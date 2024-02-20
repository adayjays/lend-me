# Lend Me

# running the Front end:

To run the app locally:

1. Clone this repository.
2. Navigate to the project directory.
3. Install dependencies using `npm install`.
4. Run the app using `ionic serve`.

# running the backend


run the development server using the following command:

```bash
python manage.py runserver

```

# 02/05/2024
## backend updates
- Update on backend landing page. used a template from w3 schools: https://www.w3schools.com/w3css/tryw3css_templates_app_launch.htm
  
### Preventing Search Engine Indexing

In order to prevent search engines from indexing our backend website, we've implemented the following measures:

- **robots.txt**: We've added a `robots.txt` file to the root directory of our project with the following content:

        User-agent: *
        Disallow: /


This instructs all web crawlers not to index any page on our site.

- **Meta tags**: We've added the following meta tag to the `<head>` section of our HTML templates:

```html
<meta name="robots" content="noindex, nofollow">
```

## Integrating Django with Django REST Framework

Certainly! Here's the README entry written in the first-person perspective:

## Integrating Django with Django REST Framework

To integrate REST capabilities with my Django project, I opted for the Django REST Framework (DRF). Here's a step-by-step guide to getting started:

### Installation

First, I installed DRF using pip. I also installed optional packages to add Markdown support for the browsable API and filtering support. Here are the commands I used:

```bash
pip install djangorestframework
pip install markdown       # Markdown support for the browsable API.
pip install django-filter  # Filtering support
```

### Configuration

Next, I added `'rest_framework'` to the `INSTALLED_APPS` list in my Django settings file (`settings.py`):

```python
INSTALLED_APPS = [
    # Other installed apps...
    'rest_framework',
]
```

By doing this, I enabled the Django REST Framework in my project.

# Front end updates:
Some of the updated were done previously:
## Ionic App with Angular

This Ionic app with Angular is a work-in-progress project aimed at facilitating borrowing and lending items. As of now, it includes several pages and essential services to support user authentication and navigation.

### Pages

- **Home**: The landing page of the app.
- **Login**: Allows users to log in to their accounts.
- **Signup**: Enables new users to create an account.
- **Borrow**: Displays items available for borrowing.
- **Borrow Option**: Shows categories for items available for borrowing.
- **Borrow Item**: Displays details of an individual item available for borrowing.
- **Lend**: Shows items currently being lent by the user.
- **Lend Item**: Displays details of an individual item being lent by the user.
- **Chats**: Displays a list of chats.
- **Chat**: Displays a chat conversation with another user.
- **Notification**: Displays notifications for the user.
- **User Profile**: Shows the user's profile information.

### Services

- **Auth Service**: Manages user authentication, including login and signup functionalities.
- **Auth Guard**: Protects routes that require authentication, ensuring that only authenticated users can access certain pages.

### Backend Integration

At this stage, the app is not yet connected to a backend server. Backend integration is still in progress, and the current focus is on refining the app's overall look and feel.

# Feb 20 update
## Overview
This README provides a summary of the recent changes made to the LendMe application. These changes include the addition of new features, updates to existing functionalities, and improvements to the codebase.

## Updates
### 1. New Features Implemented
- **Added Chat Functionality**: Implemented endpoints and views to support chat functionality between users.
- **User Product Endpoint**: Added a new endpoint to retrieve products associated with a specific user.

### 2. Django Backend Updates
- **Added ViewSets**: Implemented `ChatViewSet` and `UserProductViewSet` to handle CRUD operations for chat messages and user products, respectively.
- **Updated Serializers**: Updated serializers to include `ChatSerializer` and ensure consistency with the latest model changes.

### 3. Django REST Framework Configuration
- **Permission Handling**: Set permissions for view sets to require authentication for access to chat and user product endpoints.
- **URL Configuration**: Updated URL patterns to include new endpoints for chat and user products.

### 4. Angular Frontend Integration (Optional)
- **Connected Backend with Frontend**: Integrated the Django backend with the Angular frontend to enable interaction with new endpoints.

### 5. Additional Python Modules Installed
 - **django-cors-headers**: Installed django-cors-headers to enable Cross-Origin Resource Sharing (CORS) handling in the Django application.
 - It can be installed by running : 
	```pip install django-cors-headers```

## How to Use
To utilize the new features and changes:

1. Ensure that the latest code changes are pulled from the repository.
2. Update dependencies and migrate any database changes if necessary.
3. Start the Django development server.
4. Optionally, integrate the updated backend with the frontend to enable interaction with the new features.
5. Test the application thoroughly to ensure proper functionality and usability.