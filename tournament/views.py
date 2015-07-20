import csv

from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.contrib.auth import logout
from django.contrib.auth import authenticate, login
from django.http import HttpResponseRedirect, HttpResponse

from forms import *

from models import *





# Create your views here.
def index(request):
    countries = Country.objects.values('name')
    titles_table = ["Rank", "Name", "Surname", "Country", "Score"]
    chess_players = ChessPlayer.objects.order_by('-elo_rating')
    return render(request, 'tournament/index.html', {'countries': countries, 'titles_table': titles_table, 'chess_players': chess_players})


# Use the login_required() decorator to ensure only those logged in can access the view.
@login_required
def user_logout(request):
    # Since we know the user is logged in, we can now just log them out.
    logout(request)
    # Take the user back to the homepage.
    return HttpResponseRedirect('/')


@login_required
def add_single_chess(request):
    if request.method == 'POST':
        name = request.POST.get('name')
        surname = request.POST.get('surname')
        country = request.POST.get('country')
        elo_rating = request.POST.get('elo_rating')
        countryGet = Country.objects.get(name=country)
        c = ChessPlayer.objects.get_or_create(name=name, surname=surname, country=countryGet, elo_rating=elo_rating)
        # print c
        return HttpResponse("Chess Player successfully created!")
    else:
        return HttpResponse("Malakies")


@login_required
def add_multiple_chess(request):
    if request.method == 'POST':
        form = UploadFileForm(data=request.POST, files=request.FILES)
        if form.is_valid():
            print 'valid form'
        else:
            print 'invalid form'
            print form.errors
        return HttpResponse("Chess Players have been successfully created!")
    else:
        return HttpResponse("Malakies")


def user_login(request):
    # If the request is a HTTP POST, try to pull out the relevant information.
    if request.method == 'POST':
        # Gather the username and password provided by the user.
        # This information is obtained from the login form.
        # We use request.POST.get('<variable>') as opposed to request.POST['<variable>'],
        # because the request.POST.get('<variable>') returns None, if the value does not exist,
        # while the request.POST['<variable>'] will raise key error exception
        username = request.POST.get('username')
        password = request.POST.get('password')

        # Use Django's machinery to attempt to see if the username/password
        # combination is valid - a User object is returned if it is.
        user = authenticate(username=username, password=password)

        # If we have a User object, the details are correct.
        # If None (Python's way of representing the absence of a value), no user
        # with matching credentials was found.
        if user:
            # Is the account active? It could have been disabled.
            if user.is_active:
                # If the account is valid and active, we can log the user in.
                # We'll send the user back to the homepage.
                login(request, user)
                return HttpResponseRedirect('/')
            else:
                # An inactive account was used - no logging in!
                return HttpResponse("Your Chess Tournament account is disabled.")
        else:
            # Bad login details were provided. So we can't log the user in.
            print "Invalid login details: {0}, {1}".format(username, password)
            return HttpResponse("Invalid login details supplied.")

    # The request is not a HTTP POST, so display the login form.
    # This scenario would most likely be a HTTP GET.
    else:
        # No context variables to pass to the template system, hence the
        # blank dictionary object...
        return HttpResponseRedirect('/')



def get_current_results():
    titles_table = ["Rank", "Name", "Surname", "Country", "Score"]
    chess_players = ChessPlayer.objects.order_by('-elo_rating')
    context = {'titles_table': titles_table, 'chess_players': chess_players}
    return context