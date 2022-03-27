from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from .machine_learning.face_detection import Face
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile
import shutil
from rest_framework.permissions import IsAuthenticated
from .serializers import UserSerializerWithToken, MyTokenObtainPairSerializer
import uuid
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth.hashers import make_password
from django.contrib.auth import get_user_model
User = get_user_model()


@api_view(['POST'])
def faceDetection(request):
    BASE_PATH = './api/machine_learning'
    UU_ID = str(uuid.uuid4())

    for file in request.FILES.values():
        filename = str(file)

        path = default_storage.save(f'{BASE_PATH}/tmp/{UU_ID}/{filename}', ContentFile(file.read()))

        face = Face(filename, path, detect_eyes=True)
        face.detect_faces()
        face.save()

        shutil.rmtree(f'{BASE_PATH}/tmp/{UU_ID}')

    return Response("Image", status=status.HTTP_200_OK)


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
@permission_classes([IsAuthenticated])
def AuthRequest(request):

    return Response('Authenticated', status=status.HTTP_200_OK)