from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from .machine_learning.face_detection import Detection
from django.core.files.storage import default_storage
import shutil
from rest_framework.permissions import IsAuthenticated
from .serializers import UserSerializerWithToken, MyTokenObtainPairSerializer
import uuid
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth.hashers import make_password
from .models import Face
from django.core.files import File
from django.contrib.auth import get_user_model
User = get_user_model()


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def faceDetection(request):

    username = str(request.user)

    UU_ID = str(uuid.uuid4())
    TMP_PATH = f'./api/machine_learning/tmp/'
    BASE_PATH = f'./backend/media/images/{username}'
 
    for file in request.FILES.values():
        filename = str(file)
    
        model = Face.objects.create(
            user=request.user,
            filename=filename,
            image=file,
        )

        print(filename)
        face = Detection(filename, f'{BASE_PATH}/{filename}', detect_eyes=True,
                        save_path=f'{TMP_PATH}/{UU_ID}_{filename}')
        face.detect_faces()
        face.save()

        with File(open(f'{TMP_PATH}/{UU_ID}_{filename}', "rb")) as img:
            model.processed_image = img
            model.save()

        shutil.rmtree(f'{TMP_PATH}/{UU_ID}_{filename}')

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
