from django.shortcuts import render
from pdfs.serializers import PdfTemplateSerializer
from rest_framework import viewsets

# Create your views here.


class PdfTemplateViewSet(viewsets.ModelViewSet):
    serializer_class = PdfTemplateSerializer
