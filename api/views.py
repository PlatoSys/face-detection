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
import cloudinary
import cloudinary.uploader
import cloudinary.api
import urllib.request



User = get_user_model()

def create_directory_structure(username):
    BASE_PATH = './backend/media/images'
    if username not in os.listdir(BASE_PATH):
        os.mkdir(f'{BASE_PATH}/{username}')
        BASE_PATH = f'{BASE_PATH}/{username}'

        if 'processed' not in os.listdir(BASE_PATH):
            os.mkdir(f'{BASE_PATH}/processed')
        if 'live' not in os.listdir(BASE_PATH):
            os.mkdir(f'{BASE_PATH}/live')

def process_image(file, img_path, save_path, user, live=False):
    username = f'{user}'
    processed_path = f'images/{username}/processed/processed_{file}'

    model = Face.objects.create(
        user=user,
        filename=f'{file}',
        image=file if not live else f'images/{username}/live/{file}',
    )

    face = Detection(file, img_path=img_path, detect_eyes=True,
                        save_path=save_path)
    face.detect_faces()
    face.save()

    model.processedImage = processed_path
    model.save()

    return {
        'name': f'{file}',
        'original': f'images/{username}/{file}' if not live else f'images/{username}/live/{file}',
        'processed': processed_path,
    }

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def faceDetection(request):
    username = str(request.user)
    UU_ID = str(uuid.uuid4())
    BASE_PATH = f'./backend/media/images/{username}'

    create_directory_structure(username)

    live_image = request.data.get('live_image')
    if live_image:
        data = {}
        file = f'{UU_ID}_{request.data.get("filename")}'
        live_path = f'./backend/media/images/{username}/live/{file}'
        img_path = f'{BASE_PATH}/live/{file}'
        save_path = f'{BASE_PATH}/processed/processed_{file}'

        cld_response = cloudinary.uploader.upload(live_image)
        urllib.request.urlretrieve(cld_response['url'], live_path)

        data = process_image(file, img_path=img_path, save_path=save_path,
                                        user=request.user, live=True)
    else:
        data = []
        for file in request.FILES.values():
            file.name = f'{UU_ID}_{file}'
            save_path = f'{BASE_PATH}/processed/processed_{file}'
            img_path = f'{BASE_PATH}/{file}'

            processed_image = process_image(file, img_path=img_path,
                                            save_path=save_path, user=request.user)
            data.append(processed_image)

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
