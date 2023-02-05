from django.db import models

# Create your models here.
# class ReportTweet(models.Model):
#     report_count = models.PositiveIntegerField()

# class LikeTweet(models.Model):
#     like_count = models.PositiveIntegerField()

class Tweet(models.Model):
    uid = models.PositiveBigIntegerField(primary_key=True)
    report_count = models.PositiveIntegerField()
    like_count = models.PositiveIntegerField()

class File(models.Model):
    file = models.FileField()
    filename = models.CharField(max_length=400,null=True,blank=True)