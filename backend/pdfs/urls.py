from django.urls import include, path
from rest_framework.routers import SimpleRouter

from . import views

router = SimpleRouter()
router.register(r"pdfs/templates", views.PdfTemplateViewSet, basename="pdf-templates")

urlpatterns = [
    path("", include(router.urls)),
]
