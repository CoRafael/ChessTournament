from django.contrib import admin

from tournament.models import *


# Register your models here.


class ChessPlayerAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'surname', 'country_name', 'country_abbreviation', 'elo_rating', )


class CountryAdmin(admin.ModelAdmin):
    list_display = ('name', 'abbreviation',)


class GameAdmin(admin.ModelAdmin):
    list_display = ('player_1', 'player_2', 'round', 'result','active')


admin.site.register(ChessPlayer, ChessPlayerAdmin)
admin.site.register(Country, CountryAdmin)
admin.site.register(Game, GameAdmin)