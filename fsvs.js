
;( function($){

	$.fn.fsvs = function( options ) {

		/**
		 * [defaults description]
		 * @type {Object}
		 */

		var defaults = {
			speed : 5000,
			selector : '> .slide',
			mouseSwipeDisance : 40,
			afterSlide : function(){},
			beforeSlide : function(){},
			endSlide : function(){},
			mouseWheelEvents : true,
			mouseDragEvents : true,
			arrowKeyEvents : true
		};

		for( var i in options ) {
			defaults[i] = options[i];
		}
		options = defaults;

		/**
		 * [currentSlideIndex description]
		 * @type {Number}
		 */

		var currentSlideIndex = 0;

		/**
		 * [body description]
		 * @type {[type]}
		 */

		var body = null;

		/**
		 * [scrolling description]
		 * @type {Boolean}
		 */

		var scrolling = false;

		/**
		 * [mouseWheelTimer description]
		 * @type {Boolean}
		 */

		var mouseWheelTimer = false;

		/**
		 * [hasTransition description]
		 * @return {Boolean} [description]
		 */

		var hasTransition = function(){
		    prefixes = ['Webkit','Moz','ms','O'];
		   	for( var i in prefixes ) {
		   		if( typeof document.getElementsByTagName( 'body' )[0].style[prefixes[i] + 'Transition' ] !== 'undefined' ) {
		   			return true;
		   		}
		   	}
		    return false;
		}

		/**
		 * [bindDeviceSwipes description]
		 * @return {[type]} [description]
		 */

		var bindDeviceSwipes = function() {
			var x, y;
			window.onmousedown = function(e) {
				e.preventDefault();
				y = e.y;
			}
			window.onmouseup = function(e) {
				if( e.y > ( y+options.mouseSwipeDisance ) ) {
					app.slideDown();
				} else if( e.y < ( y-options.mouseSwipeDisance ) ) {
					app.slideUp();
				}
			}
		};

		/**
		 * [mouseWheelHandler description]
		 * @param  {[type]} e [description]
		 * @return {[type]}   [description]
		 */

		var mouseWheelHandler = function( e ) {
			var e = window.event || e;
			var wheely = ( e.wheelDelta || -e.detail );
			var delta = Math.max( -1, Math.min( 1, wheely ) );
			if( ! scrolling && Math.abs( wheely ) > 70 ) {
				if( delta > 0 ) {
					app.slideUp();
				} else {
					app.slideDown();
				}
			}
		};

		/**
		 * [bindMouseWheelEvent description]
		 * @return {[type]} [description]
		 */

		var bindMouseWheelEvent = function() {
			var doc = window;
			if ( doc.addEventListener) {
				doc.addEventListener( "mousewheel", mouseWheelHandler, false );
				doc.addEventListener( "DOMMouseScroll", mouseWheelHandler, false );
			} else {
				doc.attachEvent( "onmousewheel", mouseWheelHandler );
			}
		};

		/**
		 * [bindKeyArrows description]
		 * @return {[type]} [description]
		 */

		var bindKeyArrows = function() {
			window.onkeydown = function(e) {
				e = e || window.event;
			    if ( e.keyCode == '38' ) {
			        app.slideUp();
			    }
			    else if ( e.keyCode == '40' ) {
					app.slideDown();
			    }
			}
		};

		/**
		 * [slideCallback description]
		 * @param  {[type]} index [description]
		 * @return {[type]}       [description]
		 */

		var slideCallback = function( index ) {
			currentSlideIndex = index;
			options.afterSlide( index );
			if( ! app.canSlideDown() ) {
				options.endSlide( index );
			}
			if( ! mouseWheelTimer ) {
				scrolling = false;
			}
		};

		/**
		 * [addPagination description]
		 */

		var addPagination = function() {
			var pagination = $('<ul id="fsvs-pagination"></ul>');
			$( options.selector, body ).each( function(i) {
				$('<li>' + (i+1) + '</li>').appendTo( pagination );
			});
			if( $('#fsvs-pagination').length !== 0 ) {
				$('#fsvs-pagination').remove();
			}
			pagination.appendTo( body );
			var paginationHeight = pagination.height();
			pagination.css({
				marginTop : '-' + (paginationHeight/2) + 'px',
				right : '25px'
			});
			$('li', pagination).click( function(){
				app.slideToIndex( $(this).index() );
			});
		}

		/**
		 * [app description]
		 * @type {Object}
		 */

		var app = {

			/**
			 * [setSpeed description]
			 * @param {[type]} _speed [description]
			 */

			setSpeed : function( _speed ) {
				speed = _speed/1000;
				body.css({
					'-webkit-transition': 'all ' + speed + 's',
					'-moz-transition'	: 'all ' + speed + 's',
					'-o-transition'		: 'all ' + speed + 's',
					'transition'		: 'all ' + speed + 's'
				});
			},

			/**
			 * [shouldRun description]
			 * @return {[type]} [description]
			 */

			shouldRun : function() {
				return $('html').hasClass( 'fsvs' );
			},

			/**
			 * [canSlideUp description]
			 * @return {[type]} [description]
			 */

			canSlideUp : function() {
				if( currentSlideIndex === 0 ) return false;
				return true;
			},

			/**
			 * [canSlideDown description]
			 * @return {[type]} [description]
			 */

			canSlideDown : function() {
				if( $( options.selector, body ).eq( (currentSlideIndex+1) ).length === 0 ) return false;
				return true;
			},

			/**
			 * [slideToIndex description]
			 * @param  {[type]} index [description]
			 * @return {[type]}       [description]
			 */

			slideToIndex : function( index ) {
				scrolling = true;
				options.beforeSlide( index );
				if( hasTransition() ) {
					body.css({ top : "-" + (index*100) + '%' });
					setTimeout( function(){
						slideCallback( index );
					}, options.speed );
				} else {
					body.animate({
						top : '-' + (index*$(window).height()) + 'px'
					}, options.speed, function() {
						slideCallback( index );
					});
				}
			},

			/**
			 * [slideDown description]
			 * @return {[type]} [description]
			 */

			slideDown : function() {
				if( app.canSlideDown() ) {
					app.slideToIndex( (currentSlideIndex+1) );
				}
			},

			/**
			 * [slideUp description]
			 * @return {[type]} [description]
			 */

			slideUp : function() {
				if( app.canSlideUp() ) {
					app.slideToIndex( (currentSlideIndex-1) );
				}
			},

			/**
			 * [init description]
			 * @return {[type]} [description]
			 */

			init : function() {
				body = $('body');
				app.setSpeed( options.speed );
				addPagination();
				if( options.mouseWheelEvents ) {
					bindMouseWheelEvent();
				}
				if( options.arrowKeyEvents ) {
					bindKeyArrows();
				}
				if( options.mouseDragEvents ) {
					bindDeviceSwipes();
				}
			}

		};

		if( app.shouldRun() ) {
			app.init();
		}
		return app;

	};

	$(document).ready( function() {
		var slider = $.fn.fsvs({
			speed : 500
		});
	});

})( jQuery );