from django.contrib.auth import update_session_auth_hash

from rest_framework import serializers

from authentication.models import Account, Direction, Equipment, Staff


# class PrimaryKeyNestedMixin(serializers.RelatedField, serializers.ModelSerializer):
#
#     def to_internal_value(self, data):
#         return serializers.PrimaryKeyRelatedField.to_internal_value(self, data)
#
#     def to_representation(self, data):
#         return serializers.ModelSerializer.to_representation(self, data)


class DirectionSerializer( serializers.ModelSerializer):

    class Meta:
        model = Direction
        fields = ('id', 'name')
        # read_only_fields = ('created_at', 'updated_at',)

class EquipmentSerializer(serializers.ModelSerializer):
    # lab = AccountSerializer(read_only=True, required=False)

    class Meta:
        model = Equipment

        fields = ('id', 'lab', 'name',)
        read_only_fields = ('id',)

    def get_validation_exclusions(self, *args, **kwargs):
        exclusions = super(EquipmentSerializer, self).get_validation_exclusions()

        return exclusions + ['lab']
    

class StaffSerializer(serializers.ModelSerializer):
    # lab = AccountSerializer(read_only=True, required=False)

    class Meta:
        model = Staff

        fields = ('id', 'lab', 'name',)
        read_only_fields = ('id',)

    def get_validation_exclusions(self, *args, **kwargs):
        exclusions = super(StaffSerializer, self).get_validation_exclusions()

        return exclusions + ['lab']


class AccountSerializer(serializers.ModelSerializer):   # serializers.ModelSerializer serializers.HyperlinkedModelSerializer
    direction = DirectionSerializer()
    password = serializers.CharField(write_only=True, required=False)
    confirm_password = serializers.CharField(write_only=True, required=False)
    equipment_set = EquipmentSerializer(many=True, required=False)
    staff_set = StaffSerializer(many=True, required=False)

    class Meta:
        model = Account
        fields = ('id', 'email', 'username', 'created_at', 'updated_at', 'direction', 'equipment_set', 'staff_set',
                  'first_name', 'last_name', 'address', 'phone', 'description', 'password',  # 'tagline',
                  'confirm_password',)
        read_only_fields = ('created_at', 'updated_at',)

    def update(self, instance, validated_data):
        direction_data = validated_data.pop('direction')

        direction_name = direction_data.get('name')
        direct = Direction.objects.get_or_create(name=direction_name)
        instance.direction = direct[0]
        direction = instance.direction

        instance.username = validated_data.get('username', instance.username)
        instance.address = validated_data.get('address', instance.address)
        instance.phone = validated_data.get('phone', instance.phone)
        instance.description = validated_data.get('description', instance.description)

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
