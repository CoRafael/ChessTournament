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

    button += '<br>'
    button += '<br>'
    button += '<button type="submit" class="btn btn-primary login_logout" onclick="finalize()">End this Tournament' + which + '</button>'

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

function refresh() {
    $.ajax({
        type: 'GET',
        url: '/update_table/',
        dataType: 'text',
        success: function (message) {
            $('#table_results tbody').replaceWith(getLeaderBoardRowsToAdd(message));
            print_alert_message("The League has been updated")
        }
    });
}

function finalize() {
    $.ajax({
        type: 'GET',
        url: '/finalize/',
        dataType: 'text',
        success: function (message) {
            alert(message)
        }
    });
}