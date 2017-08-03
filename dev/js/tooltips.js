"use strict";

$(document).ready(function(){

	$('.hex').mouseover(function(){
		$(".hex").removeClass('active');
  		$(this).addClass('active');
	});

	$('.hex').mouseout(function(event){
		$(".hex").removeClass('active');
	});

});