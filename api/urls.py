from django.urls import path

from api.views import faceDetection




urlpatterns = [
    path('face_detection/', faceDetection, name='face_detection'),
]