/**
 * Created by rafael on 7/19/15.
 */

$(document).ready(function () {
    jQuery.support.cors = true;

    $('#intupdatealert').hide()

    $('#refresh_button').click(function (e) {
        e.preventDefault()
        refresh()
        print_alert_message("The League has been updated")
    })

    $('#create_chess_player').on('submit', function (event) {
        event.preventDefault();
        $.post('/addsinglechess/', $(this).serialize(), function (data) {
            print_alert_message(data)
        });
        console.log("form submitted!")  // sanity check
        this.reset(); // clear form
        refresh()
    });
});


function print_alert_message(message) {
    $('#intupdatealert').html(message).show(400);
    setTimeout(function () {
        $('#intupdatealert').hide(400)
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