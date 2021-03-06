__author__ = 'rafael'
import os

import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'ChessTournament.settings')
django.setup()

from tournament.models import *


def populate():
    User.objects._create_user('admin', 'a@a.a', 'admin', True, True)

    userData = '''Magnus;Carlsen;Norway;2853
    Viswanathan;Anard;India;2816
    Veselin;Topalov;Bulgaria;2816
    Hikaru;Nakamura;United States;2814
    Fabiano;Caruana;United States;2797
    Anish;Giri;Netherlands;2791
    Vladimir;Kramnik;Russia;2783'''

    countryFile = open("countries.csv", "r")
    countries = countryFile.readlines()

    print 'Creating Countries...'

    for line in countries:
        toSplit = line.split(',')
        Country.objects.get_or_create(name=toSplit[0].replace("\"", ""), abbreviation=toSplit[3])

    print 'Creating Chess Participants...'

    for x in userData.split('\n'):
        f = x.split(';')
        country = Country.objects.get(name=f[2])
        ChessPlayer.objects.get_or_create(name=f[0], surname=f[1], country=country, elo_rating=f[3])


if __name__ == '__main__':
    print "Starting Chess Tournament population script..."
    populate()
