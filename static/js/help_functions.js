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

function add_label_winners_loosers(what) {
    var toReturn = '<div class="col-sm-12 text-center pagination-centered center-block">';
    toReturn += '<h3>' + what + '</h3>';
    toReturn += '</div>';
    return toReturn;
}