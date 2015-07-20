/**
 * Created by rafael on 7/19/15.
 */

$(document).ready(function () {

    $('#intupdatealert').hide()

    //$('#kostis').click(function (e) {
    //    e.preventDefault()
    //    $('#intupdatealert').show().text(function (e) {
    //        return "You have potouo successfully"
    //    }).delay(1000).fadeOut()
    //})

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
    });

    $('upload_multiple').submit(upload);








    //$('#upload_multiple').on('submit', function (event) {
    //    event.preventDefault();
    //    console.log("form submitted!")  // sanity check
    //    alert("sss")
    //    $.post('/addmultiplechess/', $(this).serialize(), function (data) {
    //        $('#intupdatealert').html(data).show(400);
    //        setTimeout(function () {
    //            $('#intupdatealert').hide(400)
    //        }, 4000);
    //    });
    //    alert("sss")
    //
    //    this.reset(); // clear form
    //});
});

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