from django.contrib.auth import get_user_model
from rest_framework import serializer
from django.db import models

from core.models import SkateBoard, SkakeBoardModel, SkateBoardLocation


class DefaultSkateBoardModelSerializer(serializer.ModelSerializer):
    class Meta:
        model = SkakeBoardModel
        fields = ('id', 'name', 'max_speed_km_h',
                  'battery_capacity_ah', 'power_reverse_km')


class DefaultSkateBoardSerializer(serializer.ModelSerializer):
    class Meta:
        model = SkateBoard
        fields = ('id', 'model', 'max_battery_charge_ah',
                  'current_battery_charge_ah')


class DefaultSkateBoardLocationSerializer(serializer.ModelSerializer):
    class Meta:
        model = SkateBoardLocation
        fields = ('id', 'location_lat', 'location_lng', 'location_last_update')

class SkateBoardModelSerializer(DefaultSkateBoardModelSerializer):
    skateboards_count = models.IntegerField()
    class Meta(DefaultSkateBoardModelSerializer.Meta):
        fields = DefaultSkateBoardModelSerializer.Meta + ('skateboards_count',)

