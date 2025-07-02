from django.db.models import Count
from django.shortcuts import render
from rest_framework import viewsets

from api.serializers import (
    SkateboardSerializer, SkateboardModelSerializer, SkateboardLocationSerializer,
    SkateboardRentalSerializer, SkateboardReviewSerializer
)
from core.models import Skateboard, SkateboardModel, SkateboardLocation
from rental.models import SkateboardRental
from reviews.models import SkateboardReview


class SkateboardModelViewSet(viewsets.ModelViewSet):
    queryset = SkateboardModel.objects.all()
    serializer_class = SkateboardModelSerializer

class SkateboardViewSet(viewsets.ModelViewSet):
    queryset = Skateboard.objects.all()
    serializer_class = SkateboardSerializer

class SkateboardLocationViewSet(viewsets.ModelViewSet):
    queryser = SkateboardLocation.objects.all()
    serializer_class = SkateboardLocationSerializer

class SkateboardRentalViewSet(viewsets.ModelViewSet):
    queryset = SkateboardRental.objects.all()
    serializer_class = SkateboardRentalSerializer

class SkateboardReviewViewSet(viewsets.ModelViewSet):
    queryser = SkateboardReview.objects.all()
    serializer_class = SkateboardReviewSerializer


# class SkateBoardModelViewSet(viewsets.ModelViewSet):
#     queryset = SkakeBoardModel.objects.annotate(skateboard_count=Count('skateboards'))
#     serializer_class = SkateBoardModelSerializer

