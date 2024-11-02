from pdfs.serializers import PdfTemplateSerializer
from rest_framework import status, viewsets
from rest_framework.response import Response
from rest_framework.decorators import action
from pdfs.models import PdfTemplate


# Create your views here.


class PdfTemplateViewSet(viewsets.ModelViewSet):
    serializer_class = PdfTemplateSerializer
    queryset = PdfTemplate.objects.all()

    @action(detail=False, methods=["GET"], url_path="data")
    def get_templates_data(self, request):
        data = [
            [
                "1 一般管理費",
                "8,926,009",
                "43,474",
                "8,969,483",
                "",
                "",
                "946",
                "42,528",
                "7 報償費",
                "20",
                "",
            ],
            ["", "", "", "", "", "", "946", "", "8 旅費", "403", ""],
            ["", "", "", "", "", "", "", "", "10 需用費", "20", ""],
            ["", "", "", "", "", "", "", "", "11 役務費", "125", ""],
            ["", "", "", "", "", "", "", "", "12 委託費", "41,467", ""],
            ["", "", "", "", "", "", "", "", "13 使用料及び貸借料", "20", ""],
            ["", "", "", "", "", "", "", "", "17 備品購入費", "12", ""],
            [
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "18 負担金補助及び交付金",
                "1,407",
                "",
            ],
        ]
        return Response({"data": data}, status.HTTP_200_OK)
