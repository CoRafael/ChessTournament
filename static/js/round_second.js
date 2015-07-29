/**
 * Created by rafael on 7/27/15.
 */

function start_round_2() {
    jQuery.ajax({
        type: 'POST',
        url: '/check_round/',
        data: {
            csrfmiddlewaretoken: document.getElementsByName('csrfmiddlewaretoken')[0].value,
            round: 2
        },
        success: function (data, status) {
            if (data == "True") {
                prepare_round_2()
            }
            else {
                print_alert_message(data)
            }
        }
    });
}


function prepare_round_2() {
    var winners = ''
    var loosers = ''

    var newText = '';
    var title_round_2 = create_label_for_round(2)
    newText += title_round_2;
    newText += add_label_winners_loosers("Winners vs Winners")
    //fetch winners
    newText += '<div id="round_2_contents_winners">'
    newText += winners
    newText += '</div>'
    newText += '<div id="round_2_contents_loosers">'
    newText += add_label_winners_loosers("Loosers vs Loosers")
    //fetch loosers
    newText += loosers
    newText += '</div>'
    replace_content('#go_round_2', create_item_to_place(newText))
    var buttonToAdd = create_button_next_round(3)
    append_content('#go_round_2', create_item_to_place(buttonToAdd))

    $.ajax({
            type: 'GET',
            url: '/get_next_round/',
            dataType: 'text',
            data: {
                round_next: 2
            },
            success: function (message) {
                var toSplit = message.split('\n')
                for (var i in toSplit) {
                    toAnalaze = toSplit[i].split(';')
                    //next row in container
                    var round1 = '<div class="row">'
                    //first Column with the first group
                    round1 += '<div class="col-sm-3 text-center pagination-centered center-block">'
                    round1 += '<h4>' + toAnalaze[0] + '</h4>'
                    round1 += '</div>' // end of first column
                    //middle Column with the vs word
                    round1 += '<div class="col-sm-3 text-center pagination-centered center-block">'
                    round1 += '<h4>Vs</h4>';
                    round1 += '</div>' // end of middle Column with the vs word
                    //second Column with the second group
                    round1 += '<div class="col-sm-3 text-center pagination-centered center-block">'
                    round1 += '<h4>' + toAnalaze[1] + '</h4>'
                    round1 += '</div>  ' // end of second column with the second group
                    round1 += '<div class="col-sm-3 text-center" id="replace_result_' + toAnalaze[4] + '">'
                    round1 += create_button_result(toAnalaze[0], toAnalaze[1], toAnalaze[2], toAnalaze[3], toAnalaze[4])
                    round1 += '</div>  '
                    round1 += '</div>  ' // end of second column with the second group
                    if (i < toSplit.length / 2) {
                        append_content('#round_2_contents_winners', create_item_to_place(round1))
                    }
                    else {
                        append_content('#round_2_contents_loosers', create_item_to_place(round1))
                    }
                }
            }
        }
    )
}
function my_animate(where) {
    $('html, body').animate({
        scrollTop: $(where).offset().top
    }, 500);
}