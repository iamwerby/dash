"use strict";

function checkForFilledInput(value) {
    var regExp = /([A-Za-zА-Яа-яёЁ0-9-+.,!@#$%^&*();\/\\\|:<>"'?=_]+)/g;
    var result = value.search(regExp);

    if (!value || result == -1) {
        $('#jsSearch').popover('show');
        return false;
    }

    $('#jsSearch').popover('destroy');
    return true;
}

$(document).ready(function(){
    $('#jsSearch').popover('destroy');

    $( '.header__menu-items li:first-child' ).on( 'click', function (event) {
        event.preventDefault();
        var value = $ ( '#jsSearch' ).val();
        checkForFilledInput(value);
    } );

});

