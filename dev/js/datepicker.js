'use strict';

$(document).ready(function () {

    $('.info2__datepicker-options').text(moment().format('MM/DD/YYYY')); //подставляем текущую дату в поле по умолчанию

    $( function() {
        $( ".info2__datepicker-body" ).datepicker({
            dayNamesMin: [ "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat" ],
            firstDay: 1,
            onSelect: function (date) {
                $('.info2__datepicker-options').text(date); //передаем выбранную дату в поле
            }
        });
    } );
});