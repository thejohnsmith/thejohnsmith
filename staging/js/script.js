/*	
___________.__                  ____.      .__               _________       .__  __  .__     
\__    ___/|  |__   ____       |    | ____ |  |__   ____    /   _____/ _____ |__|/  |_|  |__  
  |    |   |  |  \_/ __ \      |    |/  _ \|  |  \ /    \   \_____  \ /     \|  \   __\  |  \ 
  |    |   |   $  \  ___/  /\__|    (  <_> )   $  \   |  \  /        \  $ $  \  ||  | |   $  \
  |____|   |___|  /\___  > \________|\____/|___|  /___|  / /_______  /__|_|  /__||__| |___|  /
                \/     \/ www.thejohnsmith.com  \/     \/          \/      \/              */


$(function() {
	var url =location.href;
	var stage_left = (($('body').width() - 866) / 2);
	var stage_top = 30;
	var yOffset = $('nav').offset().top;
	
	$('#oneCloud').pan( {fps: 30, speed: 0.7, dir: 'right', depth:5} );
	$('#blurryCloud').pan( {fps: 30, speed: 0.4, dir: 'right', depth:5} );
	$('#twoClouds').pan( {fps: 30, speed: 0.2, dir: 'right', depth:5} );
	
	$('#grass').pan( {fps: 30, speed: 0.3, dir: 'left', depth:5} );
	$('#trees').pan( {fps: 30, speed: 1, dir: 'left', depth:5} );
	$('#grass, #trees').spStop();
	
	$(window).scroll(function() {	
		/* A Sun that Sets! */
		$('#sun').stop().animate({top:'470px', opacity:'0'}, 1000);
		$('#grass, #trees').spStop();
		/* Friendly and Persistant Nav */
		if ($(window).scrollTop() > yOffset) {
			$('#oneCloud, #twoClouds, #blurryCloud').spStop();
			$('#grass, #trees').spStart();
			$('.mainNav').css({
				'top':'160px',
				'position': 'fixed'
			});
		} else {
			$('#sun').stop().animate({top:'0', opacity:'1'}, 1400);
			$('#oneCloud, #twoClouds, #blurryCloud').spStart();
			$('.mainNav').css( {
				'top': '160px',
				'position': 'absolute',
				'marginTop' : '0'
			});
		}
	});

	/* Sweet Arrows! */
	$('.portfolioWorkList a').append(' &rarr;');
	
	/* Kill the error message if you leave without fixing them */
	$('.mainNav li, .mainNav li a').click(function() {
		$('.error').fadeOut();
		$('#sun').stop().animate({top:'0', opacity:'1'}, 2000)
	});
	
	/* Auto year */
	$('#year').html(new Date().getFullYear());
	
	/* Yox viewer setup */
		$('.thumbnails').yoxview( {
			onOpen: function() { 
				$('#oneCloud, #twoClouds, #blurryCloud').spToggle();
			},
				backgroundColor: '#47ADE3',
				backgroundOpacity: 0.5,
				infoBackColor: '#000',
				infoBackOpacity: .9,
				allowInternalLinks: true,
				autoHideInfo: false,
				autoPlay: true,
				onClose: function(){ 
				$('#oneCloud, #twoClouds, #blurryCloud').spToggle();
			},
		});
	
		if(url.indexOf('#web') > -1) {
			$('.topLevel li').removeClass('active activeMenu');
			$('.topLevel #web').addClass('active activeMenu');
		} 
		else if(url.indexOf('#photo') > -1) {
			$('.topLevel li').removeClass('active activeMenu');
			$('.topLevel #photo').addClass('active activeMenu');		
		}	
		else if(url.indexOf('#paint') > -1) {
			$('.topLevel li').removeClass('active activeMenu');
			$('.topLevel #paint').addClass('active activeMenu');	
		}
		else if(url.indexOf('#contact') > -1) {
			$('.topLevel li').removeClass('active activeMenu');
			$('.topLevel #contactLink').addClass('active activeMenu');
		}		
	/* Scroll back to top 
	$('.backToTop').click(function(){
		rocketLaunch();
	});
	
	function rocketLaunch() {
		$('html, body').animate({scrollTop:0}, 1600);
	}
	*/
	/* Toggle BTT arrow color *//* Random Colors! */
	$('.backToTop').hover(function() {
		var hue = 'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')';
		$('.backToTop h2').animate( { color: hue, color: hue }, 1000);
	}, function() {
		$('.backToTop h2').css({'color' : '#47ADE3'});
	});

	/* Navigation */
	if($('.mainNav').hasClass('children')) {
		$('#portfolio').addClass('active, activeMenu');
		$('#home').removeClass('active, activeMenu');
	}
	$('.webLink').live('click', function() {
		$('#web').addClass('active');
	});
	// Parents
	$('.topLevel li').click(function() {
		if ($(this).hasClass('active')) {
		}
		else {
			$('.topLevels li').removeClass('active');
			$(this).addClass('active');
		}
	});	
	// Check to see if the link is the current one			
	$('.topLevel li a').click(function() {			  
		if ($(this).parent().hasClass('active')) {
		}
		else {
			$('.topLevel li').removeClass('active');
			$(this).parent().addClass('active');
		}
	});
	// Children
	$('.children li').click(function() {
		if ($(this).hasClass('active')) {
		}
		else {
			$('.children li').removeClass('active');
			$(this).addClass('active');
		}
	});
	// Check to see if the link is the current one
	$('.children li a').click(function() {					  
		if ($(this).parent().hasClass('active')) {
		}
		else {
			$('.children li').removeClass('active');
			$(this).parent().addClass('active');
		}
	});
});