$(document).ready(function(){
	$('.tabs-menu a').click(function (e) {
		e.preventDefault();
		$('.tabs-menu a').removeClass('active')
		$(this).addClass('active');

		var id = $(this).attr('href');
		
		$('.tabcontent').css('display', 'none')
		$(id).css('display', 'flex')
	})
})


