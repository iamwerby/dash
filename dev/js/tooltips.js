$(document).ready(function(){

	$('.hex').mouseover(function(){
		$(".hex").removeClass('active');
  		$(this).addClass('active');
	});

	$('.hex').mouseout(function(event){
		$(".hex").removeClass('active');
	});

	var counter = 0;

  $( '.menu-top__config li' ).on( 'click', function (event) {
      counter++;
      event.preventDefault();
      $( '.menu-top__config li' ).removeClass( 'active' );
      $( this ).addClass( 'active' );

      $( '.settings .hex' ).animate({
          deg: 360*counter
      }, {
          duration: 2000,
          step: function (now) {
              $( this ).css({
                  transform: 'rotate(' + now + 'deg)'
              });
          }

      });

  } )
})