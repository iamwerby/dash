"use strict";

function checkForFilledInput(value) {
    var regExp = /([A-Za-zА-Яа-яёЁ0-9-+.,!@#$%^&*();\/\\\|:<>"'?=_]+)/g;
    var result = value.search(regExp);

    if (!value || result == -1) {
        alert('Field is empty, please enter info into field');
        return false;
    }

    alert('Its OK');
    return true;
}


$(document).ready(function(){

    $( '.header__menu-items li:first-child' ).on( 'click', function (event) {
        event.preventDefault();
        var value = $ ( '#jsSearch' ).val();
        checkForFilledInput(value);

    } );

});

