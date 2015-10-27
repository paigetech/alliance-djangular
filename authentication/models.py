from django.contrib.auth.models import AbstractBaseUser
from django.db import models
from django.contrib.auth.models import BaseUserManager


class Direction(models.Model):
    name = models.CharField(u'Direction', max_length=200,)

    def __unicode__(self):
        return u'%s' % (self.name)

    def get_absolute_url(self):
        #from django.core.urlresolvers import reverse
        #return reverse('lab.views.direction', str(self.id))#)args=[self.name]
        return "direction/%i/" % self.id

    class Meta:
        verbose_name = u"Direction"
        verbose_name_plural = u"Direction"


class AccountManager(BaseUserManager):  # , PermissionsMixin):
    def create_user(self, email, password=None, **kwargs):
        if not email:
            raise ValueError('Users must have a valid email address.')

        if not kwargs.get('username'):
            raise ValueError('Users must have a valid username.')

        if not kwargs.get('direction'):
            raise ValueError('Users must have a valid direction.')

        if not isinstance(kwargs['direction'], Direction):
            direction_name = kwargs['direction']['name']
            kwargs['direction'] = Direction.objects.get(name=direction_name)

        account = self.model(
            email=self.normalize_email(email), username=kwargs.get('username'), direction=kwargs.get('direction'),
        )

        account.set_password(password)
        account.save()

        return account

    def create_superuser(self, email, password, **kwargs):
        kwargs['direction'] = Direction.objects.create(name='Space Research')
        account = self.create_user(email, password, **kwargs)

        account.is_admin = True
        account.save()

        return account


class Account(AbstractBaseUser):
    email = models.EmailField(unique=True)
    username = models.CharField(max_length=200, unique=True)

    direction = models.ForeignKey(Direction, verbose_name=u'Direction', null=True)

    first_name = models.CharField(max_length=40, blank=True)
    last_name = models.CharField(max_length=40, blank=True)
    tagline = models.CharField(max_length=140, blank=True)
    phone = models.CharField(max_length=140, blank=True, null=True)
    description = models.TextField(blank=True, null=True)

    is_admin = models.BooleanField(default=False)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    objects = AccountManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    def __unicode__(self):
        return self.email

    def get_full_name(self):
        return ' '.join([self.first_name, self.last_name])

    def get_short_name(self):
        return self.first_name

    @property
    def is_superuser(self):
        return self.is_admin

    @property
    def is_staff(self):
        "Is the user a member of staff?"
        return self.is_admin

    def has_perm(self, perm, obj=None):
        return self.is_admin

    def has_module_perms(self, app_label):
        return self.is_admin


class Equipment(models.Model):
    lab = models.ForeignKey(Account)
    name = models.CharField(u'Equipment', max_length=200,)

    def __unicode__(self):
        return u'%s' % (self.name)

    def get_absolute_url(self):
        #from django.core.urlresolvers import reverse
        #return reverse('lab.views.direction', str(self.id))#)args=[self.name]
        return "equipment/%i/" % self.id

    class Meta:
        verbose_name = u"Equipment"
        verbose_name_plural = u"Equipment"


class Staff(models.Model):
    lab = models.ForeignKey(Account)
    name = models.CharField(u'Staff', max_length=200,)

    def __unicode__(self):
        return u'%s' % (self.name)

    class Meta:
        verbose_name = u"Staff"
        verbose_name_plural = u"Staff"

