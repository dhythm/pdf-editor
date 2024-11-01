from django.db import models

# Create your models here.


class PdfTemplate(models.Model):
    name: models.CharField = models.CharField(max_length=255)
    template = models.JSONField()
    created_at: models.DateTimeField = models.DateTimeField(auto_now_add=True)
    updated_at: models.DateTimeField = models.DateTimeField(auto_now=True)
