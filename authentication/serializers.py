from django.contrib.auth import update_session_auth_hash

from rest_framework import serializers

from authentication.models import Account, Direction


class DirectionSerializer(serializers.ModelSerializer):
    # password = serializers.CharField(write_only=True, required=False)

    class Meta:
        model = Direction
        fields = ('id', 'name')
        # read_only_fields = ('created_at', 'updated_at',)

    def create(self, validated_data):
        print validated_data
        return Direction.objects.create(**validated_data)


class AccountSerializer(serializers.ModelSerializer):
    direction = DirectionSerializer()
    password = serializers.CharField(write_only=True, required=False)
    confirm_password = serializers.CharField(write_only=True, required=False)

    class Meta:
        model = Account
        fields = ('id', 'email', 'username', 'created_at', 'updated_at', 'direction',
                  'first_name', 'last_name', 'tagline', 'password',
                  'confirm_password',)
        read_only_fields = ('created_at', 'updated_at',)

    def create(self, validated_data):
        direction_data = validated_data.pop('direction')
        account = Account.objects.create(**validated_data)
        Direction.objects.create(account=account, **direction_data)
        return account

    def update(self, instance, validated_data):
        direction_data = validated_data.pop('direction')

        direction_name = direction_data.get('name', instance.direction)

        if direction_name:
            dir = Direction.objects.get_or_create(name=direction_name)

        if not instance.direction:
            instance.direction = dir[0]
        direction = instance.direction

        print direction.id

        instance.username = validated_data.get('username', instance.username)
        instance.tagline = validated_data.get('tagline', instance.tagline)

        instance.save()

        direction.name = direction_data.get('name', direction.name)
        direction.save()

        password = validated_data.get('password', None)
        confirm_password = validated_data.get('confirm_password', None)

        if password and confirm_password and password == confirm_password:
            instance.set_password(password)
            instance.save()

        update_session_auth_hash(self.context.get('request'), instance)

        return instance
