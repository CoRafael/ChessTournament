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


function refresh() {
    $.ajax({
        type: 'GET',
        url: '/update_table/',
        dataType: 'text',
        success: function (message) {
            $('#table_results tbody').replaceWith(getLeaderBoardRowsToAdd(message));
            print_alert_message("The League has been updated")
        }
    });
}