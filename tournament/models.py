from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class ChessPlayer(models.Model):
    name = models.CharField(max_length=100)
    surname = models.CharField(max_length=100)
    country = models.CharField(max_length=100)
    elo_rating = models.IntegerField(default=0)
