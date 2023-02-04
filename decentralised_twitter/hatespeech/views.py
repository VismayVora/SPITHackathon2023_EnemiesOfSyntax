from django.shortcuts import render
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from detoxify import Detoxify

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