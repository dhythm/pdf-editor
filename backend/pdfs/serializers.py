from rest_framework import serializers
from pdfs.models import PdfTemplate


class PdfTemplateSerializer(serializers.ModelSerializer):
    class Meta:
        model = PdfTemplate
        fields = "__all__"
