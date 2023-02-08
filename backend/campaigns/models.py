from django.db import models

# Create your models here.
class Campaign(models.Model):
    title = models.models.models.CharField(max_length=200)
    description = models.models.TextField()
    slug = models.SlugField(max_length=255)
    created_at = models.DateTimeField(auto_now=False, auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    