from rest_framework import permissions


class IsAuthorOrReadOnly(permissions.BasePermission):
    """
    Только авторы объекта могут редактировать его.
    Разрешения на чтение разрешены для любого запроса.
    """

    def has_permission(self, request, view) -> bool:
        return (
            request.method in permissions.SAFE_METHODS
            or request.user.is_authenticated
        )
    
    # def has_object_permission(self, request, view, obj) -> bool:
    #     return (
    #         request.method in permissions.SAFE_METHODS
    #         or obj.author == request.user
    #     )
