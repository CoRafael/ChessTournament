from django.db import models
from django.contrib.auth.models import User


# Create your models here.


class Country(models.Model):
    name = models.CharField(max_length=100, primary_key=True)
    abbreviation = models.CharField(max_length=5)


class ChessPlayer(models.Model):
    name = models.CharField(max_length=100)
    surname = models.CharField(max_length=100)
    country = models.OneToOneField(Country)
    elo_rating = models.IntegerField(default=0)

    def country_name(self):
        return self.country.name

    def country_abbreviation(self):
        return self.country.abbreviation






