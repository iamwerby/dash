'use strict';

$(document).ready(function () {

    $( function() {
        $( ".info2__datepicker-body" ).datepicker({
            dayNamesMin: [ "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat" ],
            firstDay: 1,
            onSelect: function (date) {
                $('.info2__datepicker-options').text(date);
            }
        });
    } );

});