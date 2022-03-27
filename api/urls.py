from django.urls import path

from .views import MyTokenObtainPairView, faceDetection, registerUser


urlpatterns = [
    path('face_detection/', faceDetection, name='face_detection'),
    path('register/', registerUser, name='user_register'),
    path('auth/',
        MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    ]