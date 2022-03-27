from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from .machine_learning.face_detection import Face
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile
import os
import shutil
import uuid

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
