# from django.db.models import Count
# from django.shortcuts import render
# from rest_framework import viewsets

# from api.serializers import SkateBoardModelSerializer, DefaultSkateBoardSerializer, 
# from core.models import SkateBoard, SkakeBoardModel, SkateBoardLocation

# class SkateBoardModelViewSet(viewsets.ModelViewSet):
#     queryset = SkakeBoardModel.objects.annotate(skateboard_count=Count('skateboards'))
#     serializer_class = SkateBoardModelSerializer

# class SkateBoard