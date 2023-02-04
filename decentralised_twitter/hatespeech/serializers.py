from rest_framework import serializers
# from .models import ReportTweet,LikeTweet,File
from .models import Tweet,File

# class ReportTweetSerializer(serializers.ModelSerializer):

# 	class Meta:
# 		model = ReportTweet
# 		fields = '__all__'

# class LikeTweetSerializer(serializers.ModelSerializer):

# 	class Meta:
# 		model = LikeTweet
# 		fields = '__all__'

class TweetSerializer(serializers.ModelSerializer):

	class Meta:
		model = Tweet
		fields = '__all__'

class FileSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = File
        fields = '__all__'