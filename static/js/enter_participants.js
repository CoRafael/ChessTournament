/**
 * Created by rafael on 7/27/15.
 */

$('#create_chess_player').on('submit', function (event) {
    event.preventDefault();
    $.post('/addsinglechess/', $(this).serialize(), function (data) {
        print_alert_message(data)
    });
    console.log("form submitted!");  // sanity check
    this.reset(); // clear form
    print_second_alert_message("Chess Player has been registered successfully");
    refresh()
});
