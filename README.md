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

