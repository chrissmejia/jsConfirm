from django.conf.urls import patterns, url

from .views import IndexView, GalleryView

urlpatterns = patterns('',
    url(r'^$', IndexView.as_view(), name='index'),
    url(r'^gallery/$', GalleryView.as_view(), name='gallery'),
)