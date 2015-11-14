from django.conf.urls import patterns, url

from .views import FakeView

urlpatterns = patterns('',
    url(r'^/$', FakeView.as_view(), name='fake'),
)