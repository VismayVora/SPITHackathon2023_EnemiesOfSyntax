from rest_framework import serializers
from .models import Tweet,File

class TweetSerializer(serializers.ModelSerializer):

	class Meta:
		model = Tweet
		fields = '__all__'

class FileSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = File
        fields = '__all__'