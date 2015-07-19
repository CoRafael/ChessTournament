/**
 * Created by rafael on 7/19/15.
 */

$(document).ready(function () {

    $('#intupdatealert').hide()

    $('#kostis').click(function (e) {
        e.preventDefault()
        $('#intupdatealert').show().html('<div class="alert alert-success" role="alert" id="intupdatealert">Kostis</div>').delay(1000).fadeOut();
    })

});