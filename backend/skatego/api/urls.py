"""
Конфигурация URL для API endpoints.
"""
from django.urls import include, path
from rest_framework.routers import DefaultRouter

from api.views import (
    SkateboardModelViewSet, SkateboardViewSet, SkateboardLocationViewSet,
    SkateboardRentalViewSet, SkateboardReviewViewSet
)

api_router = DefaultRouter()

# Скейтборды
api_router.register('skateboards', SkateboardViewSet, basename='skateboards')
api_router.register(r'skateboards/(?P<post_id>\d+)/location', SkateboardLocationViewSet, basename='skateboards-location')
api_router.register(r'skateboards/(?P<post_id>\d+)/reviews', SkateboardReviewViewSet, basename='skateboards-reviews')

# Модели скейтбордов
api_router.register('skateboard-models', SkateboardModelViewSet, basename='skateboard-models')

# Аренда
api_router.register('rentals', SkateboardRentalViewSet, basename='rental')


# Отзывы
# api_router.register('reviews', SkateboardReviewViewSet, basename='reviews')

urlpatterns = [
    path('', include('djoser.urls')),
    path('', include('djoser.urls.jwt')),
    path('', include(api_router.urls)),
]


# api_v1_router.register('posts', PostViewSet, basename='posts')
# api_v1_router.register(
#     r'posts/(?P<post_id>\d+)/comments',
#     CommentViewSet,
#     basename='comments'
# )
# api_v1_router.register('groups', GroupViewSet, basename='groups')
# api_v1_router.register('follow', FollowViewSet, basename='follow')

# urlpatterns = [
#     path('v1/', include('djoser.urls')),
#     path('v1/', include('djoser.urls.jwt')),
#     path('v1/', include(api_v1_router.urls)),
# ]