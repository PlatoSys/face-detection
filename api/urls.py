from django.urls import path

from .views import (CollectionsDetailView, MyTokenObtainPairView,
                    faceDetection, registerUser, CollectionsListView)


urlpatterns = [
    path('detect/', faceDetection, name='detect'),
    path('collections/', CollectionsListView.as_view(),
         name='collections-list'),
    path('collections/<str:pk>/', CollectionsDetailView.as_view(),
         name='collections-detail'),
    path('register/', registerUser, name='user_register'),
    path('auth/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    ]
