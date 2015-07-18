__author__ = 'rafael'

from django.conf.urls import patterns, url

from tournament import views


urlpatterns = patterns('',
                       url(r'^$', views.index, name='index'),
                       # url(r'^register/$', views.user_register, name='register'),
                       # url(r'^login/$', 'django.contrib.auth.views.login', {'template_name': 'base/register.html'}),
                       # url(r'^logout/$', views.user_logout, name='logout'),
                       # url(r'^contact_us/$', views.contact_us, name='contact_us'),
                       # url(r'^about/$', views.about, name='about'),
                )

