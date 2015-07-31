/**
 * Created by rafael on 7/19/15.
 */

$(document).ready(function () {
    jQuery.support.cors = true;
    $('#intupdatealert').hide();
    $('#second_alert').hide()


});

$('#refresh_button').click(function (e) {
    e.preventDefault();
    refresh();
    print_alert_message("The League has been updated")
});


$('#proceed_tournament').click(function (e) {
    e.preventDefault();
    $('#label_start_tournament').html("Tournament Progress");
    $('#tournament_title').html("Tournament Progress");
    $('#inputName').prop("readonly", true);
    $('#inputSurname').prop("readonly", true);
    $('#inputEloRating').prop("readonly", true);
    $('#register_button').remove();
    $('#upload_file').remove();
    if (!$('#add_enter').length) {
        var toAddEnter = '<div class="alert alert-warning" role="alert" id="add_enter">Sorry but the tournament has started. No more chess players can be added </div>';
        $('#create_chess_player').append(toAddEnter)
    }
    if (!$('#add_upload').length) {
        var toAddUpload = '<div class="alert alert-warning" role="alert" id="add_upload">Yes, no .csv files are allowed as well. Observe the leaderboard. Feel the vibe  </div>';
        $('#upload_multiple').append(toAddUpload)
    }
    $('#preliminary_text').fadeOut();
    getLeaderBoard();
    //var item = $('<div class="alert alert-warning" role="alert" id="add_enter">Sorry but the tournament has started. No more chess players can be added </div>').hide().fadeIn(2000);
    //$('#start_tournament').append(getData);
    //$('html, body').animate({
    //    scrollTop: $("#enter_participants").offset().top
    //}, 1000);
});


function create_button_next_round(which) {
    var button = ''
    button += '<div class="col-sm-12 text-center" id="go_round_' + which + '">'
    button += '<button type="submit" class="btn btn-primary login_logout" onclick="start_round(' + which + ')">Let\'s Move to Round ' + which + '</button>'
    return button
}

function getLeaderBoardRowsToAdd(message) {
    var json = jQuery.parseJSON(message);
    var test = json['chess_players'];
    var all_players = $.parseJSON(test);//parse
    var content = '';
    content += '<tbody>';
    for (var i in all_players) {
        content += '<tr' + '">';
        var fields = all_players[i].fields;
        var index = parseInt(i, 10) + 1;
        content += '<td>' + index + '</td>';
        content += '<td>' + fields.name + '</td>';
        content += '<td>' + fields.surname + '</td>';
        content += '<td>' + fields.country + '</td>';
        content += '<td>' + fields.elo_rating + '</td>';
        content += '</tr>';
    }
    content += '</tbody>';
    content += '</table>';
    return content;
}


function getLeaderBoard() {
    var result = "Something went wrong. Please retry";
    $.ajax({
            type: 'GET',
            url: '/update_table/',
            dataType: 'text',
            async: false,
            success: function (message) {
                var rowsToAdd = getLeaderBoardRowsToAdd(message);
                var initTable = '';
                initTable += '<div class=\"container\">';
                initTable += '<div class=\"panel-body panel-refresh\">';
                initTable += '<table class=\"table table-striped\" id=\"leaderboard_to_add\">';
                initTable += '<thead>';
                initTable += '<tr>';
                initTable += '<th> Rank </th>';
                initTable += '<th> Name </th>';
                initTable += '<th> Surname </th>';
                initTable += '<th> Country </th>';
                initTable += '<th> Score </tr>';
                initTable += '</tr>';
                initTable += '</thead>';
                initTable += '<tbody>';
                initTable += rowsToAdd;
                initTable += '</tbody>';
                initTable += '</div>';
                initTable += '</div>';
                var newText = '<div class=\"container\">';
                newText += '<div class="row col-lg-12 text-center" >';
                newText += '<h4>These are the chess participants that are competing in our tournament</h4>';
                newText += '<h5>Wanna Move forward? </h5>';
                newText += '<button onclick="first_round()" class=\"btn btn-primary login_logout\">Yeah, Let\'s start! </button>';
                newText += '</div>';
                newText += '</div>';

                var item1 = create_item_to_place(initTable);
                var item2 = create_item_to_place(newText);

                replace_content('#start_tournament_inner', item1);
                append_content('#start_tournament_inner', item2);
            }
        }
    )
    ;
    return result;
}


function finalize(id) {

    id += 1
    var proceed = true
    jQuery.ajax({
        type: 'POST',
        url: '/check_round/',
        data: {
            csrfmiddlewaretoken: document.getElementsByName('csrfmiddlewaretoken')[0].value,
            round: id
        },
        async: false,
        success: function (data, status) {
            if (data == "True") {
                proceed = true
            }
            else {
                proceed = false
                print_alert_message(data)
            }
        }
    });

    if (proceed == true) {


        $.ajax({
            type: 'GET',
            url: '/finalize/',
            dataType: "json",
            async: false,
            success: function (message) {
                var chess_players = message.data
                var c1 = chess_players.sort(sortFunc);
                var initTable = '';
                initTable += '<div class=\"container\">';
                initTable += '<div class="row">'
                initTable += '<div class="col-lg-12 text-center" id="final_results">'
                initTable += '<br>'
                initTable += '<h2>Final Tournament Results</h2>'
                initTable += '<hr class="star-primary">'
                initTable += '</div>'
                initTable += '</div>'
                initTable += '<div class=\"panel-body panel-refresh\">';
                initTable += '<table class=\"table table-striped\" id=\"leaderboard_to_add\">';
                initTable += '<thead>';
                initTable += '<tr>';
                initTable += '<th> Rank </th>';
                initTable += '<th> Name </th>';
                initTable += '<th> Surname </th>';
                initTable += '<th> Country </th>';
                initTable += '<th> Wins </th>';
                initTable += '<th> Draws </th>';
                initTable += '<th> Losses </th>';
                initTable += '<th> Score </tr>';
                initTable += '</tr>';
                initTable += '</thead>';
                initTable += '<tbody>';
                initTable += analyzeFinalResults(c1);
                initTable += '</tbody>';
                initTable += '</table>';
                initTable += '</div>';
                initTable += '<div class="row">'
                initTable += '<div class="col-lg-12 text-center">'
                initTable += '<h3>End of the Tournament</h3>'
                initTable += '<br>'
                initTable += '<br>'
                initTable += '<h3>Thank you for choosing us today</h3>'
                initTable += '<br>'
                initTable += '<br>'
                initTable += '<h3>We salut you with the following quote... Hope to see you again soon!</h3>'

                initTable += '<blockquote> <p>When I found that idea I simply couldn’t resist playing it. And look, people talk about me as a player who doesn’t care about beauty. That’s not true. It’s simply that during the game each person sees beauty in different things. I like the beauty of the endgame, but I also get pleasure from finding ideas like those against Grischuk. - (on his game vs. Grischuk at the Tal Memorial 2012)&nbsp; - &nbsp; Magnus Carlsen</p> </blockquote>'
                initTable += '</div>';
                initTable += '</div>';
                initTable += '</div>';


                $('#go_round_' + id).html('');

                append_content_focus('#start_tournament', create_item_to_place(initTable), '#final_results')

            }
        });
    }
}


function analyzeFinalResults(c1) {
    var content = '';
    content += '<tbody>';
    for (var i = 0; i < c1.length; i++) {
        //alert(c1[i].name + '_' + c1[i].wins + '_' + c1[i].draws + '_' + c1[i].losses)
        content += '<tr' + '">';
        var index = i + 1;
        content += '<td>' + index + '</td>';
        content += '<td>' + c1[i].name + '</td>';
        content += '<td>' + c1[i].surname + '</td>';
        content += '<td>' + c1[i].country_name + '</td>';
        content += '<td>' + c1[i].wins + '</td>';
        content += '<td>' + c1[i].draws + '</td>';
        content += '<td>' + c1[i].losses + '</td>';
        content += '<td>' + c1[i].elo_rating + '</td>';
        content += '</tr>';
    }
    content += '</tbody>';
    return content;
}