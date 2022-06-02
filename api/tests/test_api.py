"""Test Module"""
from django.test import TestCase
from django.urls import reverse
from django.contrib.auth import get_user_model
from rest_framework.test import APIClient
from rest_framework import status


User = get_user_model()
CREATE_USER_URL = reverse('api:user_register')


class TestPublicActions(TestCase):
    """Test Guest Actions"""

    def setUp(self):
        self.client = APIClient()

    def test_create_valid_user_success(self):
        """Test create valid user"""
        payload = {
            'email': 'test@email.com',
            'password': 'testpass',
            'firstname': 'Test Name'
        }
        res = self.client.post(CREATE_USER_URL, payload)

        self.assertEqual(res.status_code, status.HTTP_201_CREATED)

        user = User.objects.get(email=res.data['email'])
        self.assertTrue(user.check_password(payload['password']))
        self.assertNotIn('password', res.data)
