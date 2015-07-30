/**
 * Created by rafael on 7/27/15.
 */

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

function create_item_to_place(what) {
    return $(what).hide().fadeIn(2000);
}

function replace_content(where, what) {
    $(where).html(what);

    $('html, body').animate({
        scrollTop: $(where).offset().top
    }, 500);
}

function append_content(where, what) {
    $(where).append(what);

    $('html, body').animate({
        scrollTop: $(where).offset().top
    }, 500);
}

function append_content_focus(where, what, focus) {
    $(where).append(what);

    $('html, body').animate({
        scrollTop: $(focus).offset().top
    }, 500);
}

function add_label_winners_loosers(what) {
    var toReturn = '<div class="col-sm-12 text-center pagination-centered center-block">';
    toReturn += '<h3>' + what + '</h3>';
    toReturn += '</div>';
    return toReturn;
}

function place_result(id, result, who_won) {
    jQuery.ajax({
        type: 'POST',
        url: '/put_results/',
        data: {
            csrfmiddlewaretoken: document.getElementsByName('csrfmiddlewaretoken')[0].value,
            id: id,
            result: result
        },
        success: function (data, status) {
            print_alert_message(data)
            var toAddUpload = '<br>';
            toAddUpload += '<div class="alert alert-warning" role="alert">' + who_won + '</div>'
            $('#replace_result_' + id).html(toAddUpload)
        }
    });
}


function sortFunc(a, b) {
    if (a.wins < b.wins)
        return 1;
    else if (a.wins > b.wins)
        return -1;
    else if (a.wins == b.wins) {
        if (a.elo_rating < b.elo_rating)
            return 1;
        else
            return -1;
    }
    else if (a.draws = b.draws) {
        if (a.losses < b.losses)
            return 1;
        else if (a.losses > b.losses)
            return -1;
        else {
            if (a.elo_rating > b.elo_rating)
                return 1;
            else
                return -1;
        }
    }
    else if (a.draws > b.draws && a.losses < b.losses)
        return 1;
    else if (a.draws < b.draws && a.losses > b.losses)
        return -1;
}