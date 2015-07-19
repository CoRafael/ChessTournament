from django.contrib import admin
from tournament.models import *

# Register your models here.


class ChessPlayerAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'surname', 'country_name', 'country_abbreviation', 'elo_rating', )

class CountryAdmin(admin.ModelAdmin):
    list_display = ('name', 'abbreviation',)

admin.site.register(ChessPlayer, ChessPlayerAdmin)
admin.site.register(Country, CountryAdmin)
