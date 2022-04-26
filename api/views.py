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
from .serializers import (UserSerializerWithToken, MyTokenObtainPairSerializer,
                          CollectionSerializer)
from rest_framework.views import APIView
from cloudinary.api import delete_resources_by_prefix
from cloudinary.uploader import upload as cld_upload, destroy as cld_destroy

User = get_user_model()


def process_image(image, filename, folder, user, tmp_path, isLive):
    original_image = cld_upload(image, folder=f'{folder}/{user}',
                                public_id=filename)

    face = Detection(filename, img_path=original_image['url'],
                     detect_eyes=True, save_path=tmp_path)
    face.detect_faces()
    face.save()

    processed_image = cld_upload(tmp_path, folder=f'processed_images/{user}',
                                 public_id=filename)

    Face.objects.create(
        user=user,
        filename=f'{filename}',
        image=original_image['url'],
        processedImage=processed_image['url'],
        originalPublicId=original_image['public_id'],
        processedPublicId=processed_image['public_id'],
        isLive=isLive
    )
    os.remove(tmp_path)

    return {
        'name': f'{filename}',
        'original': original_image['url'],
        'processed': processed_image['url']
    }


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def faceDetection(request):
    UU_ID = str(uuid.uuid4())
    file = f'{UU_ID}_{request.data.get("filename")}'
    tmp_path = f'./backend/tmp/processed_{file}'

    if 'tmp' not in os.listdir('./backend'):
        os.mkdir('./backend/tmp')

    live_image = request.data.get('live_image')
    if live_image:
        data = process_image(live_image, file, 'live_images', request.user,
                             tmp_path, True)
    else:
        data = []
        for file in request.FILES.values():
            file.name = f'{UU_ID}_{file}'
            tmp_path = f'./backend/tmp/processed_{file}'

            instance_data = process_image(file, f'{UU_ID}_{file}',
                                          'original_images', request.user,
                                          tmp_path, False)
            data.append(instance_data)

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


@permission_classes([IsAuthenticated])
class CollectionsListView(APIView):

    def get(self, request):
        collections = Face.objects.filter(user=request.user)

        imgType = request.headers.get('ImageType')
        if imgType != 'All' or not imgType:
            isLive = bool(imgType == 'Live')
            collections = collections.filter(isLive=isLive)

        serializer = CollectionSerializer(collections, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)

    def delete(self, request):
        imgType = request.headers.get('ImageType')

        filtered = Face.objects.filter(user=request.user)
        if imgType != 'All':
            isLive = bool(imgType == 'Live')
            filtered = filtered.filter(isLive=int(isLive))

            if isLive:
                delete_resources_by_prefix(f'live_images/{request.user}/')
            else:
                delete_resources_by_prefix(f'original_images/{request.user}/')
            delete_resources_by_prefix(f'processed_images/{request.user}/')
        else:
            delete_resources_by_prefix(f'processed_images/{request.user}/')
            delete_resources_by_prefix(f'original_images/{request.user}/')
            delete_resources_by_prefix(f'live_images/{request.user}/')

        filtered.delete()

        return Response(True, status=status.HTTP_200_OK)


@permission_classes([IsAuthenticated])
class CollectionsDetailView(APIView):

    def get_object(self, pk):
        try:
            return Face.objects.get(pk=pk)
        except Face.DoesNotExist:
            raise Http404

    def delete(self, request, pk):

        filtered = Face.objects.filter(id=pk)
        first = filtered.first()

        cld_destroy(first.originalPublicId)
        cld_destroy(first.processedPublicId)

        filtered.delete()

        return Response(True, status=status.HTTP_200_OK)
