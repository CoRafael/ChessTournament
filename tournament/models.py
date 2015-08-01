from django.db import models
from django.contrib.auth.models import User


# Create your models here.


class Country(models.Model):
    name = models.CharField(max_length=100, primary_key=True, db_index=True)
    abbreviation = models.CharField(max_length=5)


class ChessPlayer(models.Model):
    name = models.CharField(max_length=100)
    surname = models.CharField(max_length=100)
    country = models.ForeignKey(Country)
    elo_rating = models.IntegerField(default=0)

    def country_name(self):
        return self.country.name

    def country_abbreviation(self):
        return self.country.abbreviation


class Game(models.Model):
    chessPlayer1 = models.ForeignKey(ChessPlayer, related_name='Game.chess_player1', db_index=True)
    chessPlayer2 = models.ForeignKey(ChessPlayer, related_name='Game.chess_player2')
    round = models.IntegerField(default=-1, db_index=True)
    active = models.BooleanField(default=True, db_index=True)
    result = models.FloatField(default=-1, db_index=True)

    def player_1(self):
        return self.chessPlayer1.name + ' ' + self.chessPlayer1.surname

    def player_2(self):
        return self.chessPlayer2.name + ' ' + self.chessPlayer2.surname



