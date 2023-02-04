from django.db import models

# Create your models here.
class Tweet(models.Model):
    report_count = models.PositiveIntegerField()