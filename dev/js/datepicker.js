'use strict';

$(document).ready(function () {

    $('.info2__datepicker-options').text(moment().format('MM/DD/YYYY')); //подставляем текущую дату в поле по умолчанию

    $( function() {
        $( ".info2__datepicker-body" ).datepicker({ //инициализируем datepicker
            changeMonth: true,
            changeYear: true,
            onSelect: function (date) {
                $('.info2__datepicker-options').text(date); //передаем выбранную дату в поле
            }
        });
    } );
});