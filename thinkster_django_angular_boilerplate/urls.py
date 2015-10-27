from django.conf.urls import patterns, url, include
from rest_framework_nested import routers

from authentication.views import AccountViewSet, LoginView, LogoutView, DirectionViewSet, AccountEquipmentViewSet, \
    EquipmentViewSet, StaffViewSet, api_root, AccountStaffViewSet
from thinkster_django_angular_boilerplate.views import IndexView
from posts.views import AccountPostsViewSet, PostViewSet

router = routers.SimpleRouter()
# router.register(r'api_root', api_root)
router.register(r'accounts', AccountViewSet)
router.register(r'posts', PostViewSet)
router.register(r'directions', DirectionViewSet)
router.register(r'equipment', EquipmentViewSet)
router.register(r'staff', StaffViewSet)
accounts_router = routers.NestedSimpleRouter(
    router, r'accounts', lookup='account'
)
accounts_router.register(r'posts', AccountPostsViewSet)

accounts_router.register(r'equipment', AccountEquipmentViewSet)

accounts_router.register(r'userstaff', AccountStaffViewSet)


urlpatterns = patterns(
    '',

    url(r'^api/v1/', include(router.urls)),
    url(r'^api/v1/', include(accounts_router.urls)),
    url(r'^api/v1/auth/login/$', LoginView.as_view(), name='login'),
    url(r'^api/v1/auth/logout/$', LogoutView.as_view(), name='logout'),

    # url('^.*$', IndexView.as_view(), name='index'),
    url('^$', IndexView.as_view(), name='index'),
    url(r'^api/v1/$', api_root, name='api_root'),

)
