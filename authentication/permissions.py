from rest_framework import permissions


class IsAccountOwner(permissions.BasePermission):
    def has_object_permission(self, request, view, account):
        if request.user:
            return account == request.user
        return False


class IsLabOfEquipment(permissions.BasePermission):
    def has_object_permission(self, request, view, equip):
        if request.user:
            return equip.lab == request.user
        return False