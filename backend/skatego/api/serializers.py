from django.contrib.auth import get_user_model
from rest_framework import serializers
from django.db import models

from core.models import Skateboard, SkateboardModel, SkateboardLocation
from rental.models import SkateboardRental
from reviews.models import SkateboardReview

User = get_user_model()

class SkateboardModelSerializer(serializers.ModelSerializer):
    """Сериализатор для модели SkateboardModel."""
    class Meta:
        model = SkateboardModel
        fields = ('id', 'name', 'description', 'max_speed_km_h', 
                  'battery_capacity_from_factory_ah', 'max_battery_voltage_v',
                  'min_battery_voltage_v', 'power_reserse_km', 'created_at',
                  'image', 'updated_at'
                  )


class SkateboardSerializer(serializers.ModelSerializer):
    """Сериализатор для модели Skateboard."""

    class Meta:
        model = Skateboard
        fields = ('id', 'model', 'serial_number', 'current_battery_capacity_ah',
                  'current_battery_voltage_v', 'odometer_km', 'total_rides_count',
                  'status', 'price_per_hour_rub', 'created_at', 'updated_at'
                  )


class SkateboardLocationSerializer(serializers.ModelSerializer):
    """Сериализатор для модели SkateboardLocation."""

    class Meta:
        model = SkateboardLocation
        fields = ('id', 'skateboard', 'location_lat', 'location_lng',
                  'location_last_update'
                  )


class SkateboardRentalSerializer(serializers.ModelSerializer):
    """Сериализатор для модели SkateboardRental."""

    class Meta:
        model = SkateboardRental
        fields = ('id', 'user', 'skateboard', 'start_time', 'end_time', 'status',
                  'total_cost', 'start_location', 'end_location',
                  'distanse_traveled_km'
                  )


class SkateboardReviewSerializer(serializers.ModelSerializer):
    """Сериализатор для модели SkateboardReview."""

    class Meta:
        model = SkateboardReview
        fields = ('id', 'user', 'skateboard', 'rating', 'text')
    





# class DefaultSkateBoardModelSerializer(serializer.ModelSerializer):
#     class Meta:
#         model = SkakeBoardModel
#         fields = ('id', 'name', 'max_speed_km_h',
#                   'battery_capacity_ah', 'power_reverse_km')


# class DefaultSkateBoardSerializer(serializer.ModelSerializer):
#     class Meta:
#         model = SkateBoard
#         fields = ('id', 'model', 'max_battery_charge_ah',
#                   'current_battery_charge_ah')


# class DefaultSkateBoardLocationSerializer(serializer.ModelSerializer):
#     class Meta:
#         model = SkateBoardLocation
#         fields = ('id', 'location_lat', 'location_lng', 'location_last_update')

# class SkateBoardModelSerializer(DefaultSkateBoardModelSerializer):
#     skateboards_count = models.IntegerField()
#     class Meta(DefaultSkateBoardModelSerializer.Meta):
#         fields = DefaultSkateBoardModelSerializer.Meta + ('skateboards_count',)

