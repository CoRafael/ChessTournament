/**
 * Created by rafael on 7/19/15.
 */

$(document).ready(function () {

    $('#intupdatealert').hide()

    $('#kostis').click(function (e) {
        e.preventDefault()
        $('#intupdatealert').show().text(function (e) {
            return "You have potouo successfully"
        }).delay(1000).fadeOut()
    })

    $('#create_chess_player').on('submit', function (event) {
        event.preventDefault();
        alert("ssx")
        $.post('/addsinglechess/', $(this).serialize(), function (data) {
            $('#intupdatealert').html(data).show(400);
            setTimeout(function () {
                $('#intupdatealert').hide(400)
            }, 4000);
        });
        console.log("form submitted!")  // sanity check
    });


});