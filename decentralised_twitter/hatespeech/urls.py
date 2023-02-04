from django.urls import path
from . import views

urlpatterns = [
    path('detect_hate_text/', views.DetectHateSpeech.as_view(), name = 'Detect Hate in Text'),
]
