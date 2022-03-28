import os
import uuid
from django.http import Http404
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth.hashers import make_password
from django.contrib.auth import get_user_model
from .models import Face
from .machine_learning.face_detection import Detection
from .serializers import UserSerializerWithToken, MyTokenObtainPairSerializer, CollectionSerializer
from rest_framework.views import APIView

User = get_user_model()


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def faceDetection(request):

    username = str(request.user)

    UU_ID = str(uuid.uuid4())
    BASE_PATH = f'./backend/media/images/{username}'
    data = []

    for file in request.FILES.values():

        file.name = f'{UU_ID}_{file}'

        model = Face.objects.create(
            user=request.user,
            filename=f'{file}',
            image=file,
        )

        if 'processed' not in os.listdir(BASE_PATH):
            os.mkdir(f'{BASE_PATH}/processed')

        face = Detection(file, f'{BASE_PATH}/{file}', detect_eyes=True,
                         save_path=f'{BASE_PATH}/processed/processed_{file}')
        face.detect_faces()
        face.save()

        data.append({
            'name': f'{file}',
            'original': f'images/{username}/{file}',
            'processed': f'images/{username}/processed/processed_{file}',
            })
        model.processed_image = f'images/{username}/processed/processed_{file}'
        model.save()

    return Response(data, status=status.HTTP_200_OK)


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@api_view(['POST'])
def registerUser(request):
    data = request.data
    if User.objects.filter(email=data['email']):
        return Response({'detail': 'User Already Exists with this Email'},
                        status=status.HTTP_400_BAD_REQUEST)
    user = User.objects.create(
        firstname=data['firstname'],
        email=data['email'],
        password=make_password(data['password']),
    )
    serializer = UserSerializerWithToken(user)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['GET'])
def getCollections(request):
    collections = Face.objects.filter(user=request.user)

    serializer = CollectionSerializer(collections, many=True)

    return Response(serializer.data, status=status.HTTP_200_OK)

@permission_classes([IsAuthenticated])
class CollectionsListView(APIView):

    def get(self, request, format=None):
        collections = Face.objects.filter(user=request.user)

        serializer = CollectionSerializer(collections, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def delete(self, request, format=None):
        Face.objects.filter(user=request.user).delete()
        
        return Response(True, status=status.HTTP_200_OK)

@permission_classes([IsAuthenticated])
class CollectionsDetailView(APIView):

    def get_object(self, pk):
        try:
            return Face.objects.get(pk=pk)
        except Face.DoesNotExist:
            raise Http404

    def delete(self, request, pk, format=None):

        Face.objects.filter(id=pk).delete()

        return Response(True, status=status.HTTP_200_OK)
