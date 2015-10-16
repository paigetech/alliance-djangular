from django.contrib.auth import update_session_auth_hash

from rest_framework import serializers

from authentication.models import Account, Direction


class PrimaryKeyNestedMixin(serializers.RelatedField, serializers.ModelSerializer):

    def to_internal_value(self, data):
        print "to in", data
        return serializers.PrimaryKeyRelatedField.to_internal_value(self, data)
    def to_representation(self, data):
        print "to re", data
        return serializers.ModelSerializer.to_representation(self, data)

class DirectionSerializer( serializers.ModelSerializer):
    # password = serializers.CharField(write_only=True, required=False)

    class Meta:
        model = Direction
        fields = ('id', 'name')
        # read_only_fields = ('created_at', 'updated_at',)

    # def create(self, validated_data):
    #     print "Create Direction"
    #     print validated_data
    #     return Direction.objects.create(**validated_data)

from rest_framework.reverse import reverse
class AccountSerializer(serializers.ModelSerializer):
    direction = DirectionSerializer()#queryset=Direction.objects.all()serializers.PrimaryKeyRelatedField(source='category')
    # direction = serializers.PrimaryKeyRelatedField()
    password = serializers.CharField(write_only=True, required=False)
    confirm_password = serializers.CharField(write_only=True, required=False)

    class Meta:
        model = Account
        fields = ('id', 'email', 'username', 'created_at', 'updated_at', 'direction',
                  'first_name', 'last_name', 'tagline', 'password',
                  'confirm_password',)
        read_only_fields = ('created_at', 'updated_at',)

    # def get_direction(self, obj):
    #     request = self.context['request']
    #     return {
    #         'self': reverse('direction-detail',
    #             kwargs={'pk': obj.pk}, request=request),
    #         'tasks': reverse('direction-list',
    #             request=request) + '?sprint={}'.format(obj.pk),}

    # def validate(self, attrs):
    #     print "Attrs", attrs


    def create(self, validated_data):
        print "Create account", validated_data
        direction_data = validated_data.pop('direction')
        account = Account.objects.create(**validated_data)
        Direction.objects.create(account=account, **direction_data)
        return account

    def update(self, instance, validated_data):
        direction_data = validated_data.pop('direction')

        direction_name = direction_data.get('name', None)
        if direction_name:
            direct = Direction.objects.get_or_create(name=direction_name)
            print direct
        # if not instance.direction:
        instance.direction = direct[0]
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

    # def get_validation_exclusions(self, *args, **kwargs):
    #     exclusions = super(AccountSerializer, self).get_validation_exclusions()
    #     return exclusions + ['direction']
