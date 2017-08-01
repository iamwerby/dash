'use strict';

$(document).ready(function () {

    $( function() {
        $( ".info2__datepicker-body" ).datepicker({
            changeMonth: true,
            changeYear: true,
            onSelect: function (date) {
                $('.info2__datepicker-options').text(date);
            }
        });
    } );

});