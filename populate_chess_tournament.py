__author__ = 'rafael'
import os

import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'ChessTournament.settings')
django.setup()


from tournament.models import *

def populate():
    print 'Creating Chess Participants...'

    User.objects._create_user('admin', 'a@a.a', 'admin', True, True)


    userData = '''Magnus;Carlsen;NOR;2853;1990
    Viswanathan;Anard;IND;2816;1969
    Veselin;Topalov;BUL;2816;1995'''


    print "ccscs"

    for x in userData.split('\n'):
        f = x.split(';')
        ChessPlayer.objects.get_or_create(name=f[0], surname=f[1], country=f[3], elo_rating=f[4])


if __name__ == '__main__':
    print "Starting Rango population script..."
    populate()
