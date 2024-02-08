# Lend Me

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
    'rest_framework',
]
```

By doing this, I enabled the Django REST Framework in my project. I followed instructions in :https://www.django-rest-framework.org/#installation
