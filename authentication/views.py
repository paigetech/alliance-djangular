import json

from django.contrib.auth import authenticate, login
from django.contrib.auth import logout

from rest_framework import permissions, viewsets
from rest_framework import status, views
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.reverse import reverse as rest_reverse
from rest_framework.permissions import IsAdminUser, IsAuthenticated, IsAuthenticatedOrReadOnly

from authentication.models import Account, Direction, Equipment, Staff
from authentication.permissions import IsAccountOwner, IsLabOfEquipment
from authentication.serializers import AccountSerializer, DirectionSerializer, EquipmentSerializer, StaffSerializer


class DirectionViewSet(viewsets.ModelViewSet):
    # lookup_field = 'name'
    queryset = Direction.objects.all()
    serializer_class = DirectionSerializer

    # def get_permissions(self):
    #     if self.request.method in permissions.SAFE_METHODS:
    #         return (permissions.AllowAny(),)
    #
    #     if self.request.method == 'POST':
    #         return (permissions.AllowAny(),)
    #
    #     return (permissions.IsAuthenticated(), IsAccountOwner(),)

    def create(self, request):
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            Direction.objects.create(**serializer.validated_data)

            return Response(serializer.validated_data, status=status.HTTP_201_CREATED)

        return Response({
            'status': 'Bad request',
            'message': 'Direction could not be created with received data.'
        }, status=status.HTTP_400_BAD_REQUEST)


class AccountViewSet(viewsets.ModelViewSet):
    lookup_field = 'username'
    queryset = Account.objects.all()
    serializer_class = AccountSerializer

    def get_permissions(self):
        if self.request.method in permissions.SAFE_METHODS:
            return (permissions.AllowAny(),)

        if self.request.method == 'POST':
            return (permissions.AllowAny(),)

        return (permissions.IsAuthenticated(), IsAccountOwner(),)

    def create(self, request):
        serializer = self.serializer_class(data=request.data)

        if 'direction' in request.data:
            direction_name = request.data.get('direction', )
            direction = Direction.objects.get_or_create(name=direction_name)[0]
            direction_serializer=DirectionSerializer(direction)

            request.data['direction'] = direction_serializer.data

        if serializer.is_valid():

            Account.objects.create_user(**serializer.validated_data)
            return Response(serializer.validated_data, status=status.HTTP_201_CREATED)
        return Response({
            'status': 'Bad request',
            'message': 'Account could not be created with received data.'
        }, status=status.HTTP_400_BAD_REQUEST)


class LoginView(views.APIView):
    def post(self, request, format=None):
        data = json.loads(request.body)

        email = data.get('email', None)
        password = data.get('password', None)
        account = authenticate(email=email, password=password)

        if account is not None:
            if account.is_active:
                login(request, account)

                serialized = AccountSerializer(account)
                return Response(serialized.data)
            else:
                return Response({
                    'status': 'Unauthorized',
                    'message': 'This account has been disabled.'
                }, status=status.HTTP_401_UNAUTHORIZED)
        else:
            return Response({
                'status': 'Unauthorized',
                'message': 'Username/password combination invalid.'
            }, status=status.HTTP_401_UNAUTHORIZED)


class LogoutView(views.APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request, format=None):
        logout(request)

        return Response({}, status=status.HTTP_204_NO_CONTENT)


class EquipmentViewSet(viewsets.ModelViewSet):
    queryset = Equipment.objects.all()
    serializer_class = EquipmentSerializer

    def get_permissions(self):
        if self.request.method in permissions.SAFE_METHODS:
            return (permissions.AllowAny(),)
        return (permissions.IsAuthenticated(), IsLabOfEquipment(),)

    def perform_create(self, serializer):
        instance = serializer.save(lab=self.request.user)

        return super(EquipmentViewSet, self).perform_create(serializer)


class AccountEquipmentViewSet(viewsets.ViewSet):
    queryset = Equipment.objects.select_related('lab').all()
    serializer_class = EquipmentSerializer

    def list(self, request, account_username=None):
        queryset = self.queryset.filter(lab__username=account_username)
        serializer = self.serializer_class(queryset, many=True)

        return Response(serializer.data)


class StaffViewSet(viewsets.ModelViewSet):
    queryset = Staff.objects.all()
    serializer_class = StaffSerializer

    def get_permissions(self):
        if self.request.method in permissions.SAFE_METHODS:
            return (permissions.AllowAny(),)
        return (permissions.IsAuthenticated(), IsLabOfEquipment(),)

    def perform_create(self, serializer):
        instance = serializer.save(lab=self.request.user)

        return super(StaffViewSet, self).perform_create(serializer)


class AccountStaffViewSet(viewsets.ViewSet):
    queryset = Staff.objects.select_related('lab').all()
    serializer_class = EquipmentSerializer

    def list(self, request, account_username=None):
        queryset = self.queryset.filter(lab__username=account_username)
        serializer = self.serializer_class(queryset, many=True)

        return Response(serializer.data)


@api_view(('GET',))
@permission_classes((IsAuthenticatedOrReadOnly, ))#IsAdminUser IsAuthenticated
def api_root(request, format=None):
    """Api Root"""
    return Response({
        'accounts': rest_reverse('account-list', request=request, format=format),
        'posts': rest_reverse('post-list', request=request, format=format),
        'directions': rest_reverse('direction-list', request=request, format=format),
        'equipment': rest_reverse('equipment-list', request=request, format=format),
        'staff': rest_reverse('staff-list', request=request, format=format),
    })