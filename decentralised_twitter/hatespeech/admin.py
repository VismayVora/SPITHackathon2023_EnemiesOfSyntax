from django.contrib import admin
# from .models import ReportTweet,LikeTweet,File
from .models import Tweet,File

# Register your models here.
# admin.site.register(ReportTweet)
# admin.site.register(LikeTweet)
admin.site.register(Tweet)
admin.site.register(File)