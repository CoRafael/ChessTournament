/**
 * Created by rafael on 7/19/15.
 */

$(document).ready(function () {


    $('#intupdatealert').hide()

    $('#success').click(function (e) {
        e.preventDefault()
        $('#message').html('<div class="alert alert-success fade in"><button type="button" class="close close-alert" data-dismiss="alert" aria-hidden="true">×</button>This is a success message</div>');
    })


    $('#kostis').click(function (e) {
        e.preventDefault()
        $('#intupdatealert').show().html('<div class="alert alert-success" role="alert" id="intupdatealert">Kostis</div>')

    })

});