__author__ = 'rafael'

from django.conf.urls import patterns, url

from tournament import views


urlpatterns = patterns('',
                       url(r'^$', views.index, name='index'),
                       # url(r'^register/$', views.user_register, name='register'),
                       url(r'^login/$', views.user_login, name='login'),
                       url(r'^logout/$', views.user_logout, name='logout'),
                       url(r'^addsinglechess/$', views.add_single_chess, name='add_single_chess'),
                       url(r'^addmultiplechess/$', views.add_multiple_chess, name='add_multiple_chess'),
                       # url(r'^contact_us/$', views.contact_us, name='contact_us'),
                       # url(r'^about/$', views.about, name='about'),
)

