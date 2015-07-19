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

});