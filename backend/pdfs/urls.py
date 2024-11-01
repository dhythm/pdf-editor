from django.urls import include, path
from rest_framework.routers import SimpleRouter

from . import views

router = SimpleRouter()
router.register(r"pdfs/template", views.PdfTemplateViewSet, basename="pdf-template")

urlpatterns = [
    path("", include(router.urls)),
]
