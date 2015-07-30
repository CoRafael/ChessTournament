/**
 * Created by rafael on 7/27/15.
 */

function start_round(id) {

    jQuery.ajax({
        type: 'POST',
        url: '/check_round/',
        data: {
            csrfmiddlewaretoken: document.getElementsByName('csrfmiddlewaretoken')[0].value,
            round: id
        },
        success: function (data, status) {
            if (data == "True") {
                prepare_round(id)
            }
            else {
                print_alert_message(data)
            }
        }
    });
}


function prepare_round(id) {
    var winners = ''
    var loosers = ''

    var newText = '';
    var title_round_2 = create_label_for_round(id)
    newText += title_round_2;
    newText += add_label_winners_loosers("Winners vs Winners")
    //fetch winners
    newText += '<div id="round_' + id + '_contents_winners">'
    newText += winners
    newText += '</div>'
    newText += '<div id="round_' + id + '_contents_loosers">'
    newText += add_label_winners_loosers("Loosers vs Loosers")
    //fetch loosers
    newText += loosers
    newText += '</div>'
    replace_content('#go_round_' + id, create_item_to_place(newText))
    var buttonToAdd = create_button_next_round(id + 1)
    buttonToAdd += '<br>'
    buttonToAdd += '<br>'
    buttonToAdd += '<div class="row" id="end_tournament">'
    buttonToAdd += '<button type="submit" class="btn btn-primary login_logout" onclick="finalize(' + id + ')">End this Tournament</button>'
    buttonToAdd += '</div>'
    append_content('#go_round_' + id, create_item_to_place(buttonToAdd))

    $.ajax({
            type: 'GET',
            url: '/get_next_round/',
            dataType: 'text',
            data: {
                round_next: id
            },
            success: function (message) {
                var toSplit = message.split('_WINNERS_')
                win = toSplit[0]
                if (win != '')
                    create_line_to_append('#round_' + id + '_contents_winners', win)
                lose = toSplit[1]
                create_line_to_append('#round_' + id + '_contents_loosers', lose)
            }
        }
    )
}


function create_line_to_append(where, what) {
    var toSplit = what.split('\n')
    for (var i in toSplit) {
        toAnalaze = toSplit[i].split(';')
        //next row in container
        var round1 = '<div class="row">'
        //first Column with the first group
        round1 += '<div class="col-sm-3 text-center pagination-centered center-block">'
        round1 += '<img src="' + [DJANGO_STATIC_URL] + 'images/knight_black.jpg" width="50" height="50" alt="SomeImage"/>'

        round1 += '<h4>' + toAnalaze[0] + '</h4>'
        round1 += '</div>' // end of first column
        //middle Column with the vs word
        round1 += '<div class="col-sm-3 text-center pagination-centered center-block">'
        round1 += '<br>'

        round1 += '<h4>Vs</h4>';
        round1 += '</div>' // end of middle Column with the vs word
        //second Column with the second group
        round1 += '<div class="col-sm-3 text-center pagination-centered center-block">'
        round1 += '<img src="' + [DJANGO_STATIC_URL] + 'images/knight_white.jpg" width="50" height="50" alt="SomeImage"/>'
        round1 += '<h4>' + toAnalaze[1] + '</h4>'
        round1 += '</div>  ' // end of second column with the second group
        round1 += '<div class="col-sm-3 text-center" id="replace_result_' + toAnalaze[4] + '">'
        round1 += create_button_result(toAnalaze[0], toAnalaze[1], toAnalaze[2], toAnalaze[3], toAnalaze[4])
        round1 += '</div>  '
        round1 += '</div>  ' // end of second column with the second group
        append_content(where, create_item_to_place(round1))
    }
}