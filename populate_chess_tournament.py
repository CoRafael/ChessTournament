__author__ = 'rafael'
import os

import django


os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'unNoobMe.settings')
django.setup()


def populate():
    print 'Creating Interests...'


