from django.contrib import admin
from tournament.models import *

# Register your models here.


class ChessPlayerAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'surname', 'country', 'elo_rating', )


admin.site.register(ChessPlayer, ChessPlayerAdmin)
