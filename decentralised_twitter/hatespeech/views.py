from django.shortcuts import render
from django.http import Http404, JsonResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.generics import GenericAPIView, ListCreateAPIView
from rest_framework import status,permissions,viewsets
from detoxify import Detoxify
import requests
import json
from decentralised_twitter import settings
# from .models import LikeTweet,ReportTweet
from .models import Tweet
from .serializers import *
from requests import get 
import whisper
from rest_framework.parsers import MultiPartParser,FormParser
from decentralised_twitter.settings import MEDIA_ROOT

# Create your views here.
class DetectHateSpeech(APIView):

    def post(self, request, format=None):
        data = request.data
        response = Detoxify('unbiased').predict(data['text'])
        # toxicity = int(response['toxicity'])
        # severe_toxicity  = int(response['severe_toxicity'])
        # obscene = int(response['obscene'])
        # identity_attack = int(response['identity_attack'])
        # insult = int(response['insult'])
        # threat = int(response['threat'])
        # sexual_explicit = int(response['sexualy_explicit'])
        # toxicity_scores = [toxicity,severe_toxicity,insult,threat,sexual_explicit]
        # toxicity_scores.sort(reverse=True)
        ordered_toxicity_scores = sorted(response.items(),key = lambda x: x[1],reverse = True)
        response_dict = {}
        for i in ordered_toxicity_scores:
            if i[1] > 0.9:
                response_dict = {"Hate Speech Detected": "This text has {hate} content with {value}".format(hate=i[0],value = i[1]), "hate":True}
                break
            else:
                response_dict = {"Hate Speech Not Detected": "This text has {hate} content with only {value}".format(hate=i[0],value = i[1]), "hate":False}
        return Response(response_dict, status=status.HTTP_201_CREATED)

class DetectHatefulImage(APIView):
    def post(self, request, format=None):
        url = request.data['url']
        params = {
            'url': url,
            'models': 'nudity-2.0,wad,offensive,scam,text-content,gore',
            'api_user': settings.api_user,
            'api_secret': settings.api_secret
            }
        r = requests.get('https://api.sightengine.com/1.0/check.json', params=params)
        r = r.json()
        sensitive_comparison_keys = ["weapon","alcohol","drugs"]
        # ordered_sensitive_toxicity_scores = sorted(r.items(),key = lambda x: x in sensitive_comparison_keys,reverse = True)
        # print(ordered_sensitive_toxicity_scores)

        nudity_comparison_keys = ["sexual_activity", "sexual_display", "erotica"]
        suggestive_comparison_keys = ["bikini","cleavage","male_chest","lingerie","miniskirt"]
        flag = 0
        for key,value in r.items():
            if key in sensitive_comparison_keys:
                if value >=0.7:
                    print(key)
                    print(value)
                    response_dict = {"Sensitive Image Detected": "This image has {hate_parameter} content with {value}".format(hate_parameter=key,value = value), "hate":True}
                    flag = 1
                    break
                else:
                    print(key)
                    print(value)
                    response_dict = {"Sensitive Image Not Detected": "This image does not have sensitive content", "hate":False}
        if flag != 1:
            for key,value in r['nudity'].items():
                if key in nudity_comparison_keys:
                    if value >=0.7:
                        print(key)
                        print(value)
                        response_dict = {"Sensitive Image Detected": "This image has {hate_parameter} content with {value}".format(hate_parameter=key,value = value), "hate":True}
                        flag = 1
                        break
                    else:
                        print(key)
                        print(value)
                        response_dict = {"Sensitive Image Not Detected": "This image does not have sensitive content", "hate":False}
        if flag !=1:
            for key,value in r['nudity']['suggestive_classes'].items():
                if key in suggestive_comparison_keys:
                    if value >=0.7:
                        print(key)
                        print(value)
                        response_dict = {"Sensitive Image Detected": "This image has {hate_parameter} content with {value}".format(hate_parameter=key,value = value), "hate":True}
                        break
                    else:
                        print(key)
                        print(value) 
                        response_dict = {"Sensitive Image Not Detected": "This image does not have sensitive content", "hate":False}
        if flag !=1:
            if r['gore']['prob'] > 0.7:
                response_dict = {"Sensitive Image Detected": "This image has gore content with {value}".format(value = r['gore']['prob']), "hate":True}
        return JsonResponse(response_dict,safe=False)

# class ReportTweetsView(viewsets.ModelViewSet):
#     queryset = Tweet.objects.all()
#     serializer_class = TweetSerializer
#     permission_classes = [permissions.AllowAny]

#     def get_queryset(self):
#         return Tweet.objects.all()

#     def perform_create(self,serializer):
#         serializer.save()
        
#     def update(self, request, *args, **kwargs):
#         kwargs['partial'] = True
#         return super().update(request, *args, **kwargs)

class ReportTweetView(APIView):
    serializer_class = TweetSerializer
    permission_classes = [permissions.AllowAny]

    def get(self, request, pk):
        if pk == '0':
            try:
                tweet = Tweet.objects.all()
            except Tweet.DoesNotExist:
                content = {'detail': 'No tweet found'}
                return JsonResponse(content, status = status.HTTP_404_NOT_FOUND)
        else:
            try:
                tweet = Tweet.objects.get(uid=pk)
            except Tweet.DoesNotExist:
                content = {'detail': 'No such tweet'}
                return JsonResponse(content, status = status.HTTP_404_NOT_FOUND)
            tweetDetails = TweetSerializer(tweet, many=False, context={'request': request})
            return JsonResponse(tweetDetails.data,status = status.HTTP_200_OK)
        tweetDetails = TweetSerializer(tweet, many=True, context={'request': request})
        return JsonResponse(tweetDetails.data, safe=False,status = status.HTTP_200_OK)


    def post(self, request, pk):
        try:
            tweet_obj = Tweet.objects.get(uid=pk)
            tweet_obj.report_count += 1
            tweet_obj.save()
        except Tweet.DoesNotExist:
            tweet_obj = Tweet(uid=pk,report_count=1,like_count=0)
            tweet_obj.save()
        tweetDetails = TweetSerializer(tweet_obj, many=False)
        return JsonResponse(tweetDetails.data, status = status.HTTP_202_ACCEPTED)

    def delete(self,request,pk):
        try:
            tweet = Tweet.objects.get(uid = pk)
        except Tweet.DoesNotExist:
            content = {'detail': 'No such tweet available'}
            return JsonResponse(content, status = status.HTTP_404_NOT_FOUND)
        tweet.delete()
        return JsonResponse({'Response': 'Tweet successfully removed from list!'},status = status.HTTP_200_OK)

class DetectHateAudio(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request, format=None):
        file_serializer = FileSerializer(data=request.data)
        if file_serializer.is_valid():
            file_obj = file_serializer.save()
        # serializer = FileSerializer(data=request.data)
        # serializer.is_valid(raise_exception=True)
        # # once validated, grab the file from the request itself
        # file = request.FILES['file']
        model = whisper.load_model("base")
        result = model.transcribe(MEDIA_ROOT + "/" + file_obj.filename)
        print(result['text'])
        response = Detoxify('unbiased').predict(result['text'])
        ordered_toxicity_scores = sorted(response.items(),key = lambda x: x[1],reverse = True)
        response_dict = {}
        for i in ordered_toxicity_scores:
            if i[1] > 0.9:
                response_dict = {"Hate Speech Detected": "This text has {hate} content with {value}".format(hate=i[0],value = i[1]), "hate":True}
                break
            else:
                response_dict = {"Hate Speech Not Detected": "This text has {hate} content with only {value}".format(hate=i[0],value = i[1]), "hate":False}
        return Response(response_dict, status=status.HTTP_201_CREATED)
    
class DetectHateVideo(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request, format=None):
        file_serializer = FileSerializer(data=request.data)
        if file_serializer.is_valid():
            file_obj = file_serializer.save()
        
        params = {
            # specify the models you want to apply
            'models': 'nudity-2.0,wad,offensive,scam,text-content,gore',
            'api_user': settings.api_user,
            'api_secret': settings.api_secret
        }
        files = {'media': open(MEDIA_ROOT + "/" + file_obj.filename, 'rb')}
        r = requests.post('https://api.sightengine.com/1.0/video/check-sync.json', files=files, data=params)
        r = r.json()
        sensitive_comparison_keys = ["weapon","alcohol","drugs"]
        nudity_comparison_keys = ["sexual_activity", "sexual_display", "erotica"]
        suggestive_comparison_keys = ["bikini","cleavage","male_chest","lingerie","miniskirt"]
        flag = 0
        
        for frame in r['data']['frames']:
            print(frame)
            for key,value in frame.items():
                if key in sensitive_comparison_keys:
                    if value >=0.7:
                        print(key)
                        print(value)
                        response_dict = {"Sensitive Image Detected": "This image has {hate_parameter} content with {value}".format(hate_parameter=key,value = value), "hate":True}
                        flag = 1
                        break
                    else:
                        print(key)
                        print(value)
                    response_dict = {"Sensitive Image Not Detected": "This image does not have sensitive content", "hate":False}
            if flag != 1:
                for key,value in frame['nudity'].items():
                    if key in nudity_comparison_keys:
                        if value >=0.7:
                            print(key)
                            print(value)
                            response_dict = {"Sensitive Image Detected": "This image has {hate_parameter} content with {value}".format(hate_parameter=key,value = value), "hate":True}
                            flag = 1
                            break
                        else:
                            print(key)
                            print(value)
                            response_dict = {"Sensitive Image Not Detected": "This image does not have sensitive content", "hate":False}
            else:
                break
            if flag !=1:
                for key,value in frame['nudity']['suggestive_classes'].items():
                    if key in suggestive_comparison_keys:
                        if value >=0.7:
                            print(key)
                            print(value)
                            response_dict = {"Sensitive Image Detected": "This image has {hate_parameter} content with {value}".format(hate_parameter=key,value = value), "hate":True}
                            break
                        else:
                            print(key)
                            print(value) 
                            response_dict = {"Sensitive Image Not Detected": "This image does not have sensitive content", "hate":False}
            else:
                break
            if flag !=1:
                if frame['gore']['prob'] > 0.7:
                    response_dict = {"Sensitive Image Detected": "This image has gore content with {value}".format(value = r['gore']['prob']), "hate":True}
            else:
                break
        return JsonResponse(response_dict,safe=False)

class LikeTweetView(APIView):
    serializer_class = TweetSerializer
    permission_classes = [permissions.AllowAny]

    def get(self, request, pk):
        if pk == '0':
            try:
                tweet = Tweet.objects.all()
            except Tweet.DoesNotExist:
                content = {'detail': 'No tweets liked by any user'}
                return JsonResponse(content, status = status.HTTP_404_NOT_FOUND)
        else:
            try:
                tweet = Tweet.objects.get(uid=pk)
            except Tweet.DoesNotExist:
                content = {'detail': 'No such liked tweet'}
                return JsonResponse(content, status = status.HTTP_404_NOT_FOUND)
            tweetDetails = TweetSerializer(tweet, many=False, context={'request': request})
            return JsonResponse(tweetDetails.data,status = status.HTTP_200_OK)
        tweetDetails = TweetSerializer(tweet, many=True, context={'request': request})
        return JsonResponse(tweetDetails.data, safe=False,status = status.HTTP_200_OK)


    def post(self, request, pk):
        try:
            tweet_obj = Tweet.objects.get(uid=pk)
            tweet_obj.like_count += 1
            tweet_obj.save()
        except Tweet.DoesNotExist:
            tweet_obj = Tweet(uid=pk,report_count=0,like_count=1)
            tweet_obj.save()
        tweetDetails = TweetSerializer(tweet_obj, many=False)
        return JsonResponse(tweetDetails.data, status = status.HTTP_202_ACCEPTED)

    def delete(self,request,pk):
        try:
            tweet = Tweet.objects.get(uid = pk)
        except Tweet.DoesNotExist:
            content = {'detail': 'No such reported tweet available'}
            return JsonResponse(content, status = status.HTTP_404_NOT_FOUND)
        tweet.delete()
        return JsonResponse({'Response': 'Tweet successfully removed from list!'},status = status.HTTP_200_OK)
