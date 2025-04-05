from django.urls import reverse
from rest_framework.test import APITestCase
from rest_framework import status
from api.models import Watch, WatchFile
from django.core.files.uploadedfile import SimpleUploadedFile

class WatchAPITestCase(APITestCase):
    def setUp(self):
        self.create_url = reverse("watch_create")
        self.update_url = lambda pk: reverse("watch_update", kwargs={"pk": pk})
        self.delete_url = lambda pk: reverse("watch_delete", kwargs={"pk": pk})

    def test_create_watch_with_valid_data(self):
        file = SimpleUploadedFile("image.jpg", b"file_content", content_type="image/jpeg")
        data = {
            "name": "Test Watch",
            "category": "luxury",
            "condition": "new",
            "description": "Great watch",
            "price": "199.99",
            "seller": "Test Seller",
            "media": [file]
        }
        response = self.client.post(self.create_url, data, format="multipart")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Watch.objects.count(), 1)
        self.assertEqual(WatchFile.objects.count(), 1)

    def test_create_watch_invalid_price(self):
        data = {
            "name": "Bad Watch",
            "category": "luxury",
            "condition": "new",
            "description": "Bad data",
            "price": "-100",
            "seller": "Test Seller"
        }
        response = self.client.post(self.create_url, data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("price", response.data)

    def test_patch_update_watch(self):
        watch = Watch.objects.create(
            name="Old Watch", category="casual", condition="used", price=100, seller="Me"
        )

        url = reverse("watch_update", kwargs={"pk": watch.pk})
        
        patch_data = {
            "name": "Updated Name",
            "price": "150.00",
            "category": "casual",
            "condition": "used",
            "description": "Updated description",
            "seller": "Me",
        }

        response = self.client.patch(url, patch_data, format="multipart")
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        watch.refresh_from_db()
        self.assertEqual(watch.name, "Updated Name")
        self.assertEqual(str(watch.price), "150.00")

