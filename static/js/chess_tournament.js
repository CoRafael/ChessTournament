/**
 * Created by rafael on 7/19/15.
 */

$(document).ready(function () {
    jQuery.support.cors = true;

    $('#intupdatealert').hide()

    $('#kostis').click(function (e) {
        e.preventDefault()

        alert('empika')

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
            }
        });
        //$('#intupdatealert').show().text(function (e) {
        //    return "You have potouo successfully"
        //}).delay(1000).fadeOut()
    })

    $('#create_chess_player').on('submit', function (event) {
        event.preventDefault();
        $.post('/addsinglechess/', $(this).serialize(), function (data) {
            $('#intupdatealert').html(data).show(400);
            setTimeout(function () {
                $('#intupdatealert').hide(400)
            }, 4000);
        });
        console.log("form submitted!")  // sanity check
        this.reset(); // clear form

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
            }
        });


    });

    $('upload_multiple').submit(upload);


})
;

function upload(event) {
    event.preventDefault();
    var data = new FormData($('form').get(0));

    $.ajax({
        url: $(this).attr('action'),
        type: $(this).attr('method'),
        data: data,
        cache: false,
        processData: false,
        contentType: false,
        success: function (data) {
            $('#intupdatealert').html(data).show(400);
            setTimeout(function () {
                $('#intupdatealert').hide(400)
            }, 4000);
        }
    });
}