from django.db import models

# Create your models here.
class Tweet(models.Model):
    report_count = models.PositiveIntegerField()

class File(models.Model):
    file = models.FileField()
    filename = models.CharField(max_length=400,null=True,blank=True)