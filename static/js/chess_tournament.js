/**
 * Created by rafael on 7/19/15.
 */

$(document).ready(function () {
    jQuery.support.cors = true;

    $('#intupdatealert').hide()
    $('#second_alert').hide()
    $('#test').hide()

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
        var toAddEnter = '<div class="alert alert-warning" role="alert">Sorry but the tournament has started. No more chess players can be added </div>';
        var toAddUpload = '<div class="alert alert-warning" role="alert">Yes, no .csv files are allowed as well. Observe the leaderboard. Feel the vibe  </div>';
        $('#create_chess_player').append(toAddEnter)
        $('#upload_multiple').append(toAddUpload)


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


function refresh() {
    $.ajax({
        type: 'GET',
        url: '/update_table/',
        dataType: 'text',
        success: function (message) {
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
            $('#table_results tbody').replaceWith(content);
            print_alert_message("The League has been updated")
        }
    });
}