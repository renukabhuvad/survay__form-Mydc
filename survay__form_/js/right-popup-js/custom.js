/*************************************
@@File: Law firm  Template Custom Js

All custom js files contents are below
**************************************
* 01. Menu Sticky
* 02. Date and Time picker
* 03. Preloader
* 04. Team  Carousel 
* 05. Testimonial  Carousel
* 06  News  Carousel 
* 07. Partner  Carousel
* 08. Appiontment now
* 09. Animation in animate.css
* 10. Scroll Top
* 11. Counter
* 12. Smoot scroll for one page 
* 13. Bxslider
**************************************/


(function($){
"use strict";

/* -------------------------- Global Variables ------------------------- */
var a2rDocument              = $(document),
	a2rWindow 			     = $(window),
    a2rHeader 			     = $('header'),
    a2rBody 				 = $('body'),
    primeMenu 				 = $('.nav_area'),
    a2rHeaderTop			 = $('.header-top-bar'),
    a2rDatepicker 		     = $('#datepicker'),
    a2rDatepicker2 		     = $('#datepicker2'),
    a2rPreLoderStatus        = $('#preLoaderBoxStatus'),
    a2rPreloaderBox 		 = $('#preLoaderBox'),
	a2rScrollUp 			 = $('#scrollTopButton'),
	a2rCunter 			     = $('.counter'),
    teamCarousel 			 = $('#team-carousel'),
    aboutCarousel 			 = $('#about-carousel'),
    blogCarousel 			 = $('#owl-news-slider'),
    a2rSliderv2  			 = $('.slider-v2'),
	a2rSliderv1              = $('.slider-v1'),
	a2rMainSlider            = $('.main-slider-v1'),
    partnerCarousel 		 = $('#owl-partner-slider'),
    photoPopUp  		     = $('.gallery-image'),
    videoPopUp  		     = $('.video-popup'),
    workGallery 		     = $('.filtr-container'),
    heroMenu				 = $('.main-navigation'),
    parimeSkillBar   	     = $('.skillbar'),
    testimonialCarousel 	 = $('#testimonial-carousel'),
    testimonialCarousel2 	 = $('#testimonial-carousel2');

    
	a2rWindow.on('load',function() {

	/* --------------------01/------ Menu Sticky -------------------------- */
	    
	a2rWindow.on('scroll',function() {
        if ($(this).scrollTop() > 50) {
            $('.header-wrapper').addClass("navbar-fixed-top");
        }
        else {
            $('.header-wrapper').removeClass("navbar-fixed-top");
        }
    }
    );
    
	/* --------------------02/--------- Date and Time picker -------------------------- */	
        a2rDatepicker.datepicker({ dateFormat: 'dd-mm-yy' });	
		
		a2rDatepicker2.datepicker({ dateFormat: 'dd-mm-yy' });	


	/* --------------------03/-----------Preloader ----------------------------- */

	a2rPreLoderStatus.fadeOut();
		a2rPreloaderBox.delay(350).fadeOut('slow'); 
		$('body').delay(350).css({
		'overflow': 'visible'
	});
	
	/* --------------------04/1-------Team  Carousel ----------------------------- */
	teamCarousel.owlCarousel({
    	loop: true,
	    autoplay: false,
	    margin: 15,
	    dots: false,
	    animateIn: true,
	    animateOut: 'fadeOut',
	    responsiveClass: true,
	    navText: [
	    '<i class="fa fa-angle-left"></i>',
	    '<i class="fa fa-angle-right"></i>'
	    ],
    	responsive:{
	        0:{
	            items:1,
	            nav:true
	        },
			480 : {
				items:2,
	            nav:true
			},
	        600:{
	            items:3,
	            nav:true
	        },
			768 : {
				items:3,
	            nav:true
			},
	        1000:{
	            items:3,
	            nav:true,
	            loop:true
	        }
	    }
  	});

	/* --------------------04/2-------Testimonial  Carousel ----------------------------- */
	testimonialCarousel.owlCarousel({
    	loop: true,
	    autoplay: true,
	    margin: 15,
	    dots: false,
	    animateIn: true,
	    responsiveClass: true,
	    navText: [
	    '<i class="fa fa-angle-left"></i>',
	    '<i class="fa fa-angle-right"></i>'
	    ],
    	responsive:{
	        0:{
	            items:1,
	            nav:true
	        },
	        600:{
	            items:1,
	            nav:true
	        },
	        1000:{
	            items:1,
	            nav:true,
	            loop:true
	        }
	    }
  	});
	
	  	testimonialCarousel2.owlCarousel({
    	loop: true,
	    autoplay: false,
	    margin: 15,
	    dots: true,
	    animateIn: true,
	    animateOut: 'fadeOut',
	    responsiveClass: true,
	    navText: [
	    '<i class="fa fa-angle-left"></i>',
	    '<i class="fa fa-angle-right"></i>'
	    ],
    	responsive:{
	        0:{
	            items:1,
	            nav:false
	        },
			480 : {
				items:1,
	            nav:false
			},
	        600:{
	            items:1,
	            nav:false
	        },
			768 : {
				items:1,
	            nav:false
			},
	        1000:{
	            items:1,
	            nav:false,
	            loop:true
	        }
	    }
  	});

	/* --------------------04/3-------News  Carousel ----------------------------- */
	blogCarousel.owlCarousel({
    	loop: true,
	    autoplay: false,
	    margin: 20,
	    dots: false,
	    animateIn: true,
	    responsiveClass: true,
	    navText: [
	    '<i class="fa fa-angle-left"></i>',
	    '<i class="fa fa-angle-right"></i>'
	    ],
    	responsive:{
	        0:{
	            items:1,
	            nav:true
	        },
			480 : {
				items:1,
	            nav:true
			},
	        600:{
	            items:2,
	            nav:true
	        },
			768 : {
				items:2,
	            nav:true
			},
	        1000:{
	            items:3,
	            nav:true,
	            loop:true
	        }
	    }
  	});
	
	/* --------------------04/4-------Partner  Carousel ----------------------------- */
	partnerCarousel.owlCarousel({
    	loop: true,
	    autoplay: true,
	    margin: 15,
	    dots: false,
	    animateIn: true,
	    responsiveClass: true,
	    navText: [
	    '<i class="fa fa-angle-left"></i>',
	    '<i class="fa fa-angle-right"></i>'
	    ],
    	responsive:{
	        0:{
	            items:1,
	            nav:false
	        },
			480 : {
				items:2,
	            nav:false
			},
	        600:{
	            items:4,
	            nav:false
	        },
			768 : {
				items:5,
	            nav:false
			},
	        1000:{
	            items:5,
	            nav:false,
	            loop:true
	        }
	    }
  	});


	/* --------------------04/5-------about  Carousel ----------------------------- */
	aboutCarousel.owlCarousel({
    	loop: true,
	    autoplay: true,
	    margin: 15,
	    dots: false,
	    animateIn: true,
	    responsiveClass: true,
	    navText: [
	    '<i class="fa fa-angle-left"></i>',
	    '<i class="fa fa-angle-right"></i>'
	    ],
    	responsive:{
	        0:{
	            items:1,
	            nav:true
	        },
			480 : {
				items:1,
	            nav:true,
	            loop:true
			},
	        600:{
	            items:1,
	            nav:true,
	            loop:true
	        },
			768 : {
				items:1,
	            nav:true
			},
	        1000:{
	            items:1,
	            nav:true,
	            loop:true
	        }
	    }
  	});	

  		/* --------------------05/5-------Slider  Carousel ----------------------------- */
        a2rMainSlider.owlCarousel({
            loop: true,
            autoplay: true,
            rtl:false,
        	smartSpeed: 2000,
            dots: false,
            responsiveClass: true,
            navText: [
                '<i class="fa fa-angle-left"></i>',
                '<i class="fa fa-angle-right"></i>'
            ],
            responsive: {
                0: {
                    items: 1,
                    nav: true
                },
                600: {
                    items: 1,
                    nav: true
                },
                1000: {
                    items: 1,
                    nav: true,
                    loop: true
                }
            }
        });
		 a2rMainSlider.on('translate.owl.carousel', function () {
            $('.animate-item h2').removeClass('fadeInUp animated').hide();
            $('.animate-item h3').removeClass('zoomInDown animated').hide();
            $('.animate-item a.btn-1').removeClass('fadeInUp animated').hide();
            $('.animate-item a.btn-2').removeClass('fadeInUp animated').hide();
        });

        a2rMainSlider.on('translated.owl.carousel', function () {
            $('.animate-item h2').addClass('fadeInUp animated').show();
            $('.animate-item h3').addClass('zoomInDown animated').show();
            $('.animate-item .btn-1').addClass('fadeInUp animated').show();
            $('.animate-item .btn-2').addClass('fadeInUp animated').show();
        });

	/* --------------------05/--- Magnific Popup------------------------------ */

	photoPopUp.magnificPopup({
		type: 'image',
            gallery: {
              enabled: true
            },
	});
	
	/* magnificPopup video view */
		videoPopUp.magnificPopup({
			type: 'iframe'
		});	

	/* --------------------05/--- Appiontment now------------------------------- */

	 $(function() {
		$("#appiontment-now-box .toggle").on("click", function() {
		  $( ".appiontment-now" ).toggleClass( "open", 200 );
	  });
	});
	

	/* ---------------------07/--Animation in animate.css ------------------------ */	
		new WOW().init();

	/* ---------------------07/--Animation in animate.css ------------------------ */	
	//heroMenu.meanmenu();
	
	/* ---------------------------11/--Google map ------------------------ */	
		//googleMap();
		
	/* ---------------------------09/--Scroll Top ------------------------ */
    a2rWindow.on('scroll',function() {
        if ($(this).scrollTop() > 200) {
            a2rScrollUp.fadeIn();
        }
        else {
           a2rScrollUp.fadeOut();
        }
    }
    );

    a2rScrollUp.on('click',function() {
        $("html, body").animate( {
            scrollTop: 0
        }
        , 600);
        return false;
    }
    );

	/* ---------------------------10/--Counter ------------------------ */
    //a2rCunter.counterUp({
    //    delay: 10,
    //    time: 1000
    //});
	

	/* ---------------------------11/--Smoot scroll for one page ------------------------ */	
	$('li a[href^="#"]').on('click', function(event) {
		var target = $(this.getAttribute('href'));
		if( target.length ) {
			event.preventDefault();
			$('html, body').stop().animate({
				scrollTop: target.offset().top
			}, 1000);
		}
	});	
	
	$(".btn-pref .btn").on('click',(function () {
	    $(".btn-pref .btn").removeClass("btn-primary").addClass("btn-default");
	    // $(".tab").addClass("active"); // instead of this do the below 
	    $(this).removeClass("btn-default").addClass("btn-primary");   
	}));
	
	/* --------------------05/--- filterizr----------------------------- */
	//workGallery.filterizr();
	
});
})(jQuery);

