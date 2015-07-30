import json
import random

from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.contrib.auth import logout
from django.contrib.auth import authenticate, login
from django.http import HttpResponseRedirect, HttpResponse
from django.core import serializers

from forms import *
from models import *














# Create your views here.
def index(request):
    Game.objects.all().delete()
    countries = Country.objects.values('name')
    titles_table = ["Rank", "Name", "Surname", "Country", "Score"]
    chess_players = ChessPlayer.objects.order_by('-elo_rating')
    get_data = get_current_results()
    return render(request, 'tournament/index.html', {'countries': countries, 'titles_table': get_data['titles_table'],
                                                     'chess_players': get_data['chess_players']})


# Use the login_required() decorator to ensure only those logged in can access the view.
@login_required
def user_logout(request):
    # Since we know the user is logged in, we can now just log them out.
    logout(request)
    # Take the user back to the homepage.
    return HttpResponseRedirect('/')


@login_required
def update_table(request):
    if request.method == 'GET':
        get_data = get_current_results()
        chess_players = get_data['chess_players']
        data = serializers.serialize("json", chess_players)
        get_data['chess_players'] = data
        return HttpResponse(json.dumps(get_data), content_type="application/json")
    else:
        return HttpResponse("Something went wrong. Please retry")


@login_required
def finalize(request):
    if request.method == 'GET':

        chess_players = ChessPlayer.objects.all()
        expected_scores = {}
        for ch_player1 in chess_players:
            for ch_player2 in chess_players:
                if ch_player1.id != ch_player2.id:
                    temp1 = (ch_player2.elo_rating - ch_player1.elo_rating) / 400.0
                    temp2 = 10 ** temp1
                    final = 1 / (1 + temp2)
                    expected_scores[ch_player1.name + '_' +
                                    ch_player2.name] = final

        for ch_player in chess_players:
            all_games = Game.objects.all().filter(chessPlayer1=ch_player.id, result__gt=-1)
            real = 0
            expected = 0
            for game in all_games:
                real += game.result
                expected += expected_scores[ch_player.name + '_' +
                                            game.chessPlayer2.name]
            sub = (real - expected) * 32
            final_elo_rating = ch_player.elo_rating + sub
            ch_player.elo_rating = int(final_elo_rating)
            ch_player.save()
        return HttpResponse("success")
    else:
        return HttpResponse("Something went wrong. Please retry")


@login_required
def get_first_round(request):
    if request.method == 'GET':
        chess_players = ChessPlayer.objects.order_by('-elo_rating')
        toSend = ''
        for x in range(0, len(chess_players) / 2):
            print chess_players[x].id
            getGame = Game.objects.get_or_create(chessPlayer1=chess_players[x],
                                                 chessPlayer2=chess_players[x + len(chess_players) / 2], round=1)[0]
            toSend += chess_players[x].surname + ' - ' + chess_players[x].country.abbreviation + ';' + chess_players[
                x + len(chess_players) / 2].surname + ' - ' + chess_players[
                          x + len(chess_players) / 2].country.abbreviation + ';' + str(chess_players[x].id) + ';' + str(
                chess_players[x + len(chess_players) / 2].id) + ';' + str(getGame.id)
            if x != (len(chess_players) / 2 - 1):
                toSend += '\n'
        return HttpResponse(toSend)
    else:
        return HttpResponse("Something went wrong. Please retry")


@login_required
def get_next_round(request):
    if request.method == 'GET':
        round_next = request.GET.get('round_next')
        roundGot = int(round_next) - 1
        winners = list(Game.objects.all().filter(result=1, round=roundGot))
        losers = list(Game.objects.all().filter(result=0, round=roundGot))
        draw = list(Game.objects.all().filter(result="0.5", round=roundGot))
        # random.shuffle(winners)

        if (len(winners) % 2 != 0):
            draw.sort(key=lambda x: x.chessPlayer1.elo_rating, reverse=True)
            winners.append(draw[0])
            del draw[0]

        random.shuffle(winners)

        winners.sort(key=lambda x: x.chessPlayer1.elo_rating, reverse=True)

        toSend = ''
        for index in range(len(winners) / 2):
            getGame = Game.objects.get_or_create(chessPlayer1=winners[index].chessPlayer1, chessPlayer2=winners[
                index + len(winners) / 2].chessPlayer1, round=round_next)[0]
            toSend += winners[index].chessPlayer1.surname + ' - ' + winners[
                index].chessPlayer1.country.abbreviation + ';' + winners[
                          index + len(winners) / 2].chessPlayer1.surname + ' - ' + winners[
                          index + len(winners) / 2].chessPlayer1.country.abbreviation + ';' + str(
                winners[index].chessPlayer1.id) + ';' + str(
                winners[index + len(winners) / 2].chessPlayer1.id) + ';' + str(getGame.id)
            if index != (len(winners) / 2 - 1):
                toSend += '\n'
        toSend += '_WINNERS_'
        for index in range(len(draw)):
            losers.append(draw[index])

        losers.sort(key=lambda x: x.chessPlayer1.elo_rating, reverse=True)

        random.shuffle(losers)
        for index in range(len(losers) / 2):
            getGame = Game.objects.get_or_create(chessPlayer1=losers[index].chessPlayer1, chessPlayer2=losers[
                index + len(losers) / 2].chessPlayer1, round=round_next)[0]
            toSend += losers[index].chessPlayer1.surname + ' - ' + losers[
                index].chessPlayer1.country.abbreviation + ';' + losers[
                          index + len(losers) / 2].chessPlayer1.surname + ' - ' + losers[
                          index + len(losers) / 2].chessPlayer1.country.abbreviation + ';' + str(
                losers[index].chessPlayer1.id) + ';' + str(
                losers[index + len(losers) / 2].chessPlayer1.id) + ';' + str(getGame.id)
            if index != (len(losers) / 2 - 1):
                toSend += '\n'

        return HttpResponse(toSend)
    else:
        return HttpResponse("Something went wrong. Please retry")


@login_required
def put_results(request):
    if request.method == 'POST':
        id = request.POST.get('id')
        result = request.POST.get('result')
        updateRecord = Game.objects.get(id=id)
        updateRecord.result = result
        updateRecord.save()
        res = updateRecord.result
        go = 0.5
        if res == '1':
            go = 0
        elif res == '0':
            go = 1
        Game.objects.get_or_create(chessPlayer1=updateRecord.chessPlayer2, chessPlayer2=updateRecord.chessPlayer1,
                                   round=updateRecord.round, result=go)
        return HttpResponse("Result saved successfully")
    else:
        return HttpResponse("Something went wrong. Please retry")


@login_required
def check_round(request):
    if request.method == 'POST':
        round = request.POST.get('round')
        toCheck = int(round) - 1
        getResults = Game.objects.all().filter(result=-1, round=toCheck)
        if len(getResults) == 0:
            return HttpResponse("True")
        else:
            return HttpResponse("Please place result for all matches before further proceeding")
    else:
        return HttpResponse("Something went wrong. Please retry")


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
        return HttpResponse("Something went wrong. Please retry")


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
        return HttpResponse("Something went wrong. Please retry")


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