from django.urls import path,include
from . import views
# from rest_framework.routers import DefaultRouter

# router = DefaultRouter()
# router.register(r'report_tweet', views.ReportTweetsView)

urlpatterns = [
    # path('', include(router.urls)),
    path('detect_hate_text/', views.DetectHateSpeech.as_view(), name = 'Detect Hate in Text'),
    path('detect_hate_image/', views.DetectHatefulImage.as_view(), name = 'Detect Hate in Image'),
    path('report_tweet/<str:pk>/', views.ReportTweetView.as_view(), name = 'Report Tweet'),
    path('like_tweet/<str:pk>/', views.LikeTweetView.as_view(), name = 'Like Tweet'),
    path('detect_hate_audio/', views.DetectHateAudio.as_view(), name = 'Detect Hate in Audio'),
    path('detect_hate_video/', views.DetectHateVideo.as_view(), name = 'Detect Hate in Video'),
]
