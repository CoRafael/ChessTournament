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
                       url(r'^update_table/$', views.update_table, name='update_table'),
                       url(r'^get_first_round/$', views.get_first_round, name='get_first_round'),
                       url(r'^put_results/$', views.put_results, name='put_results'),
                       url(r'^check_round/$', views.check_round, name='check_round'),
                       url(r'^get_next_round/$', views.get_next_round, name='get_next_round'),
                       url(r'^finalize/$', views.finalize, name='finalize'),
                       url(r'^temp_finalize/$', views.temp_finalize, name='temp_finalize'),
                       url(r'^user_authenticate/$', views.user_authenticate, name='user_authenticate'),
)

