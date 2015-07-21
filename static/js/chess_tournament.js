/**
 * Created by rafael on 7/19/15.
 */

$(document).ready(function () {
    jQuery.support.cors = true;

    $('#intupdatealert').hide()
    $('#second_alert').hide()


    $('#refresh_button').click(function (e) {
        e.preventDefault()
        refresh()
        print_alert_message("The League has been updated")
    })

    $('#proceed_tournament').click(function (e) {
        e.preventDefault()
        $('#label_start_tournament').html("Tournament Progress")
        $('#tournament_title').html("Tournament Progress")
        $('#inputName').prop("readonly", true);
        $('#inputSurname').prop("readonly", true);
        $('#inputEloRating').prop("readonly", true);
        $('#register_button').remove()
        $('#upload_file').remove()
        if (!$('#add_enter').length) {
            var toAddEnter = '<div class="alert alert-warning" role="alert" id="add_enter">Sorry but the tournament has started. No more chess players can be added </div>';
            $('#create_chess_player').append(toAddEnter)
        }
        if (!$('#add_upload').length) {
            var toAddUpload = '<div class="alert alert-warning" role="alert" id="add_upload">Yes, no .csv files are allowed as well. Observe the leaderboard. Feel the vibe  </div>';
            $('#upload_multiple').append(toAddUpload)
        }
        $('#preliminary_text').fadeOut()


        var getData = getLeaderBoard()

        //var item = $('<div class="alert alert-warning" role="alert" id="add_enter">Sorry but the tournament has started. No more chess players can be added </div>').hide().fadeIn(2000);
        //$('#start_tournament').append(getData);
        //$('html, body').animate({
        //    scrollTop: $("#enter_participants").offset().top
        //}, 1000);

    })


    $('#create_chess_player').on('submit', function (event) {
        event.preventDefault();
        $.post('/addsinglechess/', $(this).serialize(), function (data) {
            print_alert_message(data)
        });
        console.log("form submitted!")  // sanity check
        this.reset(); // clear form
        print_second_alert_message("Chess Player has been registered successfully")
        refresh()
    });
});


function print_alert_message(message) {
    $('#intupdatealert').html(message).show(400);
    setTimeout(function () {
        $('#intupdatealert').hide(400)
    }, 3000);
}


function print_second_alert_message(message) {
    $('#second_alert').html(message).show(400);
    setTimeout(function () {
        $('#second_alert').hide(400)
    }, 3000);
}


function getLeaderBoardRowsToAdd(message) {
    var json = jQuery.parseJSON(message);
    var test = json['chess_players']
    var all_players = $.parseJSON(test);//parse
    var content = '';
    content += '<tbody>';
    for (var i in all_players) {
        content += '<tr' + '">';
        var fields = all_players[i].fields
        var index = parseInt(i, 10) + 1;
        content += '<td>' + index + '</td>';
        content += '<td>' + fields.name + '</td>';
        content += '<td>' + fields.surname + '</td>';
        content += '<td>' + fields.country + '</td>';
        content += '<td>' + fields.elo_rating + '</td>';
        content += '</tr>';
    }
    content += '</tbody>';
    return content
}


function getLeaderBoard() {
    var result = "Something went wrong. Please retry";
    $.ajax({
            type: 'GET',
            url: '/update_table/',
            dataType: 'text',
            async: false,
            success: function (message) {
                var rowsToAdd = getLeaderBoardRowsToAdd(message)
                var initTable = ''
                initTable += '<div class=\"container\">'
                initTable += '<div class=\"panel-body panel-refresh\">'
                initTable += '<table class=\"table table-striped\" id=\"leaderboard_to_add\">'
                initTable += '<thead>'
                initTable += '<tr>'
                initTable += '<th> Rank </th>'
                initTable += '<th> Name </th>'
                initTable += '<th> Surname </th>'
                initTable += '<th> Country </th>'
                initTable += '<th> Score </tr>'
                initTable += '</tr>'
                initTable += '</thead>'
                initTable += '<tbody>'
                initTable += rowsToAdd
                initTable += '</tbody>'
                initTable += '</div>'
                initTable += '</div>'
                var kokos = '<div class=\"container\">'
                kokos += '<div class="row col-lg-12 text-center" >'
                kokos += '<h4>These are the chess participants that are competing in our tournament... Move forward? </h4>'
                kokos += '<button type=\"submit\" class=\"btn btn-primary login_logout\" id=\"yeah_let_start\">Yeah, Let\'s start! </button>'
                kokos += '</div>'
                kokos += '</div>'


                var item1 = $(initTable).hide().fadeIn(2000);
                var item2 = $(kokos).hide().fadeIn(2000);
                $('#start_tournament_inner').html(item1).append(item2);

                $('html, body').animate({
                    scrollTop: $("#start_tournament_inner").offset().top
                }, 1000);
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