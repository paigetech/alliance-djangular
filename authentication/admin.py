from django.contrib import admin
from django.contrib.auth import get_user_model
from django.contrib.auth.models import Group

class UserAdmin(admin.ModelAdmin):
    list_display = ('id', 'username', 'email', 'phone', 'created_at', 'updated_at', 'is_active')

admin.site.register(get_user_model(), UserAdmin)
admin.site.unregister(Group)
