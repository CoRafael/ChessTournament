/**
 * Created by rafael on 7/27/15.
 */
function devide_groups() {
    //container
    var newText = '<div class=\"container\">';
    //row title
    newText += '<div class="row text-center" >';
    newText += '<h1>Round 1</h1>';
    newText += '</div>';     //end row title
    //next row in container
    newText += '<div class="row">';
    //first Column with the first group
    newText += '<div class="col-sm-4 text-center pagination-centered center-block">';
    newText += '<h1>First Group</h1>';
    newText += parseFirstGroup();
    newText += '</div>'; // end of first column
    //middle Column with the vs word
    newText += '<div class="col-sm-4 text-center pagination-centered center-block">';
    newText += '<br>'
    newText += '<h1>Vs</h1>';
    newText += '</div>'; // end of middle Column with the vs word
    //second Column with the second group
    newText += '<div class="col-sm-4 text-center pagination-centered center-block">';
    newText += '<h1>Second Group</h1>';
    newText += parseSecondGroup();
    newText += '</div>  '; // end of second column with the second group
    newText += '</div>  ';// end of next row in container
    newText += '</div>'; // end container
    return newText;
}


function create_label_for_round(which) {
    var newText = '<div class="row text-center" >';
    newText += '<h1>Round ' + which + '</h1>';
    newText += '</div>';
    return newText;
}


function create_label_for_games_round(which) {
    var newText = '<div class=\"container\">';
    //row Games 1
    newText += '<div class="row text-center" >';
    newText += '<h3>Games of Round ' + which + '</h3>';
    newText += '<div class="row text-center" >';
    newText += '</div>';
    newText += '</div>';     //end row Games 1
    newText += '</div>';     //end of container
    return newText;
}


function first_round() {
    replace_content('#start_tournament_inner', create_item_to_place(devide_groups()));
    append_content('#start_tournament_inner', create_item_to_place(create_label_for_games_round(1)))

    $.ajax({
        type: 'GET',
        url: '/get_first_round/',
        dataType: 'text',
        async: false,
        success: function (message) {
            var toSplit = message.split('\n')
            for (var i in toSplit) {
                toAnalaze = toSplit[i].split(';')
                //next row in container
                var round1 = '<div class="row" >'
                //first Column with the first group
                round1 += '<div class="col-sm-3 text-center pagination-centered center-block">'
                round1 += '<img src="' + [DJANGO_STATIC_URL] + 'images/knight_black.jpg" width="50" height="50" alt="SomeImage"/>'
                round1 += '<h4>' + toAnalaze[0] + '</h4>'
                round1 += '</div>' // end of first column
                //middle Column with the vs word
                round1 += '<div id="vs" class="col-sm-3 text-center pagination-centered center-block">'
                round1 += '<br>'
                round1 += '<h4>Vs</h4>';
                round1 += '</div>' // end of middle Column with the vs word
                //second Column with the second group
                round1 += '<div class="col-sm-3 text-center pagination-centered center-block">'
                round1 += '<img src="' + [DJANGO_STATIC_URL] + 'images/knight_white.jpg" width="50" height="50" alt="SomeImage"/>'
                round1 += '<h4>' + toAnalaze[1] + '</h4>'
                round1 += '</div>  ' // end of second column with the second group
                round1 += '<div class="col-sm-3 text-center" id="replace_result_' + toAnalaze[4] + '">'
                round1 += '<br>'
                round1 += create_button_result(toAnalaze[0], toAnalaze[1], toAnalaze[2], toAnalaze[3], toAnalaze[4])
                round1 += '</div>  ' // end of second column with the second group
                append_content('#start_tournament_inner', create_item_to_place(round1))
            }
            append_content('#start_tournament_inner', create_button_next_round(2))

        }
    });


}

function parseFirstGroup() {
    var toReturn = '';
    $.ajax({
        type: 'GET',
        url: '/update_table/',
        dataType: 'text',
        async: false,
        success: function (message) {
            var json = jQuery.parseJSON(message);
            var test = json['chess_players'];
            var all_players = $.parseJSON(test);//parse
            var content = '';

            content += '<table class=\"table table-striped\">';
            content += '<thead>';
            content += '<tr>';
            content += '<th> Rank </th>';
            content += '<th> Name </th>';
            content += '<th> Surname </th>';
            content += '<th> Country </th>';
            content += '<th> Score </tr>';
            content += '</tr>';
            content += '</thead>';

            content += '<tbody>';
            for (var i in all_players) {
                if (i < all_players.length / 2) {
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
                else {
                    break
                }

            }
            content += '</tbody>';
            content += '</table>';

            toReturn = content
        }
    });
    return toReturn
}


function parseSecondGroup() {
    var toReturn = ''
    $.ajax({
        type: 'GET',
        url: '/update_table/',
        dataType: 'text',
        async: false,
        success: function (message) {
            var json = jQuery.parseJSON(message);
            var test = json['chess_players'];
            var all_players = $.parseJSON(test);//parse
            var content = '';

            content += '<table class=\"table table-striped\">';
            content += '<thead>';
            content += '<tr>';
            content += '<th> Rank </th>';
            content += '<th> Name </th>';
            content += '<th> Surname </th>';
            content += '<th> Country </th>';
            content += '<th> Score </tr>';
            content += '</tr>';
            content += '</thead>';

            content += '<tbody>';
            for (var i in all_players) {
                if (i >= all_players.length / 2) {
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
            }
            content += '</tbody>';
            content += '</table>';
            toReturn = content
        }
    });
    return toReturn
}



function create_button_result(player_1, player_2, user1, user2, id) {
    var button = '<br>'
    button += '<div class="btn-group">'
    button += ' <button type="button" class="btn btn-info dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" id="button_' + id + '">'
    button += 'Save Result <span class="caret"></span>'
    button += '</button>'
    button += '<ul class="dropdown-menu">'
    button += '<li><a onclick="place_result(' + id + ',1,\'' + player_1 + ' Won\')">' + player_1 + ' Won</a></li>';
    button += '<li><a onclick="place_result(' + id + ',0.5,\'Draw\')">' + 'Draw' + '</a></li>';
    button += '<li><a onclick="place_result(' + id + ',0,\'' + player_2 + ' Won \')">' + player_2 + ' Won</a></li>';
    button += '</ul>';
    button += '</div>';
    return button
}