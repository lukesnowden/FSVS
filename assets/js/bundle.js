/*!
* 	@plugin 	FSVS - Full Screen Vertical Scroller
* 	@version 	2.0.0
* 	@home 		https://github.com/lukesnowden/FSVS
*
* 	Copyright 2014 Luke Snowden
* 	Released under the MIT license:
* 	http://www.opensource.org/licenses/mit-license.php
*/

;( function( $, w, d ){

	/**
	 * [fsvs extend the jQuery core to allow a public call to our plugin]
	 * @param  {[type]} options [description]
	 * @return {[type]}         [description]
	 */

	$.fn.fsvs = function( _options ) {

		/**
		 * [options override our default settings with the developer settings]
		 * @type {[type]}
		 */

		var options = $.extend({
			speed 				: 500,
			mouseSwipeDisance 	: 40,
			mouseWheelDelay 	: false,
			mouseDragEvents 	: true,
			touchEvents 		: true,
			arrowKeyEvents 		: true,
			pagination 			: true,
			nthClasses 			: 5,
			detectHash 			: true
		}, _options );

		/**
		 * [fsvs description]
		 * @type {Array}
		 */

		var fsvsObjects = [];

		/**
		 * [isCustomScrollHandelerActive description]
		 * @type {Boolean}
		 */

		var isCustomScrollHandelerActive = false;

		/**
		 * [handelerInterval description]
		 * @type {[type]}
		 */

		var handelerInterval = null;

		/**
		 * [wheelEvent description]
		 * @type {[type]}
		 */

		var wheelEvent = null;

		/**
		 * [handelerStart description]
		 * @type {Number}
		 */

		var handelerStart = 0;

		/**
		 * [windowScrollTop description]
		 * @type {Number}
		 */

		var windowScrollTop = 0;

		/**
		 * [lastScrollTop description]
		 * @type {Number}
		 */

		var lastScrollTop = 0;

		/**
		 * [anyActiveFSVS description]
		 * @return {[type]} [description]
		 */

		var anyActiveFSVS = function() {
			for( var i in fsvsObjects ) {
				if( fsvsObjects[i].fsvs.isActivated() ) {
					return fsvsObjects[i];
				}
			}
			return false;
		};

		/**
		 * [scrollingDown description]
		 * @param  {[type]} e [description]
		 * @return {[type]}   [description]
		 */

		var scrollingDown = function( e ) {
			return ! scrollingUp( e );
		};

		/**
		 * [scrollingUp description]
		 * @param  {[type]} e [description]
		 * @return {[type]}   [description]
		 */

		var scrollingUp = function( e ) {
			if( e.type === 'scroll' ) {
				var hasScrolledUp = lastScrollTop > windowScrollTop;
				return hasScrolledUp;
			} else {
				return e.originalEvent.detail < 0 || e.originalEvent.wheelDelta > 0;
			}
		};

		/**
		 * [isChrome description]
		 * @reference http://stackoverflow.com/questions/4565112/javascript-how-to-find-out-if-the-user-browser-is-chrome
		 * @return {Boolean} [description]
		 */

		var isChrome = function() {
			var isChromium = window.chrome,
			    vendorName = window.navigator.vendor;
			if( isChromium !== null && vendorName === "Google Inc." ) {
			   return true;
			}
			return false;
		};

		/**
		 * [isYoungAndHip - you know I'm not talking about Internet Explorer]
		 * @return {Boolean} [description]
		 */

		var isYoungAndHip = function() {
			prefixes = ['Webkit','Moz','ms','O'];
		   	for( var i in prefixes ) {
		   		if( typeof document.getElementsByTagName( 'body' )[0].style[prefixes[i] + 'Transform' ] !== 'undefined' ) {
		   			return true;
		   		}
		   	}
		    return false;
		};

		/**
		 * [bindKeyArrows description]
		 * @return {[type]} [description]
		 */

		var bindKeyArrows = function() {
			window.onkeydown = function(e) {
				if( activeFSVS = anyActiveFSVS() ) {
					e = e || window.event;
				    if ( e.keyCode == '38' ) {
				        activeFSVS.fsvs.slideDown();
				    }
				    else if ( e.keyCode == '40' ) {
						activeFSVS.fsvs.slideUp();
				    }
				}
			}
		};

		/**
		 * [customScrollHandeler description]
		 * @param  {[type]}   e        [description]
		 * @param  {Function} callback [description]
		 * @return {[type]}            [description]
		 */

		var customScrollHandeler = function( callback ) {
			isCustomScrollHandelerActive = true;
			handelerInterval = setInterval( function(){
				if( ( Date.now() - handelerStart ) > 100 ) {
					isCustomScrollHandelerActive = false;
					clearInterval( handelerInterval );
				} else {
					callback();
				}
			}, 10 );
		};

		/**
		 * [doTheFunkyStuff description]
		 * @param  {[type]} wheely [description]
		 * @param  {[type]} event  [description]
		 * @return {[type]}        [description]
		 */

		var doTheFunkyStuff = function( wheely, event ) {

			var activeFSVS = anyActiveFSVS();
			if( activeFSVS ) {
				fsvsClass = activeFSVS.fsvs;
				fsvsClass.setOffset();
				if( ! fsvsClass.isAnimated() && wheely > 1 ) {
					if( fsvsClass.isFirstSlide() && ! scrollingDown( event ) ) {
						event.preventDefault();
						bindScrollHandeler();
						unbindWheelHandeler();
						fsvsClass.unjackScreen();
					} else if( fsvsClass.isLastSlide() && scrollingDown( event ) ) {
						event.preventDefault();
						bindScrollHandeler();
						unbindWheelHandeler();
						fsvsClass.unjackScreen();
					} else if( scrollingDown( event ) ) {
						fsvsClass.slideUp();
					} else {
						fsvsClass.slideDown();
					}
				}
			}
		};

		/**
		 * [mouseWheelHandler description]
		 * @param  {[type]} e [description]
		 * @return {[type]}   [description]
		 */

		var mouseWheelHandler = function(e) {
			wheelEvent = e;
			handelerStart = Date.now();
			if( ! isCustomScrollHandelerActive ) {
				customScrollHandeler( function(){

					var wheely = Number( ( Math.abs( wheelEvent.originalEvent.wheelDelta ) / 40 ).toFixed(0) );
					doTheFunkyStuff( wheely, wheelEvent );

				});
			}
		};

		/**
		 * [scrollHandeler description]
		 * @param  {[type]} e [description]
		 * @return {[type]}   [description]
		 */

		var scrollHandeler = function(event) {
			windowScrollTop = $(w).scrollTop();
			var activeFSVS = anyActiveFSVS();
			if( ! activeFSVS ) {
				for( var i in fsvsObjects ) {
					var fsvs = fsvsObjects[i];
					var fsvsClass = fsvs.fsvs;
					fsvsClass.setOffset();
					if( ! fsvsClass.isAnimated() ) {
						if( fsvsClass.isFirstSlide() && fsvsClass.enteredViewPortFromAbove( event ) ) {
							fsvsClass.hijackScreen();
							unbindScrollHandeler();
							bindWheelHandeler();
						} else if( fsvsClass.isLastSlide() && fsvsClass.enteredViewPortFromBelow( event ) ) {
							fsvsClass.hijackScreen();
							unbindScrollHandeler();
							bindWheelHandeler();
						}
					}
				}
			}
			lastScrollTop = windowScrollTop;
		};

		/**
		 * [bindScrollingEvent description]
		 * @return {[type]} [description]
		 */

		var bindWheelHandeler = function() {
			$(w).bind( 'wheel mousewheel DOMMouseScroll MozMousePixelScroll', mouseWheelHandler );
		};

		/**
		 * [unbindWheelHandeler description]
		 * @return {[type]} [description]
		 */

		var unbindWheelHandeler = function() {
			$(w).unbind( 'wheel mousewheel DOMMouseScroll MozMousePixelScroll' );
		}

		/**
		 * [bindScrollHandeler description]
		 * @return {[type]} [description]
		 */

		var bindScrollHandeler = function() {
			$(w).bind( 'scroll', scrollHandeler );
		};

		/**
		 * [bindScrollHandeler description]
		 * @return {[type]} [description]
		 */

		var unbindScrollHandeler = function() {
			$(w).unbind( 'scroll' );
		};

		/**
		 * [bindTouchSwipe description]
		 * @return {[type]} [description]
		 */

		var bindTouchSwipe = function() {

			// $(w).scroll(function(e){
			// 	console.log(e);
			// });

			var startY = null;

			/**
			 * [isDraggingUp description]
			 * @param  {[type]}  ev [description]
			 * @return {Boolean}    [description]
			 */

			var isDraggingUp = function(ev) {
				var e = ev.originalEvent;
				if( startY !== null ) {
					var touches = e.touches;
					if( touches && touches.length ) {
						var deltaY = startY - touches[0].pageY;
						if ( deltaY >= options.mouseSwipeDisance ) {
							startY = null;
							return true;
						}
					}
				}
				return false;
			};

			/**
			 * [isDraggingDown description]
			 * @param  {[type]}  ev [description]
			 * @return {Boolean}    [description]
			 */

			var isDraggingDown = function(ev) {
				var e = ev.originalEvent;
				if( startY !== null ) {
					var touches = e.touches;
					if( touches && touches.length ) {
						var deltaY = startY - touches[0].pageY;
						if ( deltaY <= ( options.mouseSwipeDisance * -1 ) ) {
							startY = null;
							return true;
						}
					}
				}
				return false;
			};

			/**
			 * [description]
			 * @param  {[type]} ev [description]
			 * @return {[type]}    [description]
			 */

			$(w).on( "touchstart", function(ev) {
    			var e = ev.originalEvent;
				if( e.target.nodeName.toLowerCase() !== 'a' ) {
					var touches = e.touches;
					if( touches && touches.length ) startY = touches[0].pageY;
				}
			});

			/**
			 * [description]
			 * @param  {[type]} ev [description]
			 * @return {[type]}    [description]
			 */

			$(w).on( "touchmove", function(ev) {
				if( activeFSVS = anyActiveFSVS() ) {
					if( activeFSVS.fsvs.isFirstSlide() && isDraggingDown( ev ) ) {
						ev.preventDefault();
						bindScrollHandeler();
						activeFSVS.fsvs.unjackScreen();
					} else if( activeFSVS.fsvs.isLastSlide() && isDraggingUp( ev ) ) {
						ev.preventDefault();
						bindScrollHandeler();
						activeFSVS.fsvs.unjackScreen();
					} else if( isDraggingUp(ev) ) {
						activeFSVS.fsvs.slideUp();
					} else if( isDraggingDown(ev) ) {
						activeFSVS.fsvs.slideDown();
					}
				}
			});
		};

		/**
		 * [fsvsApp description]
		 * @return {[type]} [description]
		 */

		var fsvsApp = function( elm ) {

			/**
			 * [jqElm description]
			 * @type {[type]}
			 */

			var jqElm = $(elm);

			/**
			 * [currentSlideIndex description]
			 * @type {Number}
			 */

			var currentSlideIndex = 0;

			/**
			 * [speed description]
			 * @type {Number}
			 */

			var speed = 0;

			/**
			 * [height description]
			 * @type {Number}
			 */

			var height = 0;

			/**
			 * [jqElmOffset description]
			 * @type {Number}
			 */

			var jqElmOffset = 0;

			/**
			 * [animated description]
			 * @type {Boolean}
			 */

			var animated = false;

			/**
			 * [activated description]
			 * @type {Boolean}
			 */

			var activated = false;

			/**
			 * [unjackScreen description]
			 * @return {[type]}           [description]
			 */

			this.unjackScreen = function() {
				$('html').removeClass( 'hijacked' );
				activated = false;
			};

			/**
			 * [setOffset description]
			 */

			this.setOffset = function() {
				jqElmOffset = jqElm.offset();
			};

			/**
			 * [slideUp description]
			 * @return {[type]} [description]
			 */

			this.slideUp = function() {
				if( canSlideUp() ) {
					this.slideToIndex( currentSlideIndex + 1 );
				}
			};

			/**
			 * [slideDown description]
			 * @return {[type]} [description]
			 */

			this.slideDown = function() {
				if( canSlideDown() ) {
					this.slideToIndex( currentSlideIndex - 1 );
				}
			};

			/**
			 * [slideToIndex description]
			 * @param  {[type]} index [description]
			 * @return {[type]}       [description]
			 */

			this.slideToIndex = function( index ) {
				if( isYoungAndHip() ) {
					cssSlide( index );
				} else {
					animateSlide( index );
				}
			};

			/**
			 * [isAnimated description]
			 * @return {Boolean} [description]
			 */

			this.isAnimated = function() {
				return animated;
			};

			/**
			 * [isHijacked description]
			 * @return {Boolean} [description]
			 */

			this.isHijacked = function() {
				return $('html').hasClass( 'hijacked' );
			};

			/**
			 * [isFirstSlide Cant he go instead? I don't want to go first!]
			 * @return {Boolean} [description]
			 */

			this.isFirstSlide = function() {
				return currentSlideIndex === 0;
			};

			/**
			 * [isLastSlide last but not least... or is it?]
			 * @return {Boolean} [description]
			 */

			this.isLastSlide = function() {
				return currentSlideIndex === ( $( '> div > div', jqElm ).length - 1 );
			};

			/**
			 * [enteredViewPortFromAbove description]
			 * @param  {[type]} e [description]
			 * @return {[type]}   [description]
			 */

			this.enteredViewPortFromAbove = function(e){
				if( ! this.isHijacked() ) {
					if( scrollingDown(e) && jqElmOffset.top <= windowScrollTop ) {
						activeJqElm = jqElm;
						return true;
					}
				}
				return false;
			};

			/**
			 * [enteredViewPortFromBelow description]
			 * @return {[type]} [description]
			 */

			this.enteredViewPortFromBelow = function(e) {
				if( ! this.isHijacked() ) {
					if( scrollingUp(e) && windowScrollTop <= jqElmOffset.top ) {
						return true;
					}
				}
				return false;
			};

			/**
			 * [isActivated description]
			 * @return {Boolean} [description]
			 */

			this.isActivated = function() {
				return activated;
			};

			/**
			 * [hijackScreen description]
			 * @return {[type]} [description]
			 */

			this.hijackScreen = function() {
				$("html, body").scrollTop( jqElmOffset.top );
				$('html').addClass( 'hijacked' );
				activated = true;
			};

			/**
			 * [beforeSlide description]
			 * @param  {[type]} index [description]
			 * @return {[type]}       [description]
			 */

			var beforeSlide = function( index ) {

			};

			/**
			 * [afterSlide description]
			 * @param  {[type]} index [description]
			 * @return {[type]}       [description]
			 */

			var afterSlide = function( index ) {

			};

			/**
			 * [canSlideUp from our position, can we slide up?]
			 * @return {[type]} [description]
			 */

			var canSlideUp = function() {
				return ( currentSlideIndex + 1 ) !== $( '> div > div', jqElm ).length;
			};

			/**
			 * [canSlideDown from our position, can we slide down?]
			 * @return {[type]} [description]
			 */

			var canSlideDown = function() {
				return currentSlideIndex !== 0;
			};

			/**
			 * [nthClasses description]
			 * @param  {[type]} nthClassLimit [description]
			 * @return {[type]}               [description]
			 */

			var nthClasses = function( nthClassLimit ) {
				$( '> div > div', jqElm ).each( function( i ) {
					var nthClass = 'nth-class-' + ((i%options.nthClasses)+1);
					if( ! $(this).hasClass( nthClass ) ) $(this).addClass( nthClass );
				});
			};

			/**
			 * [setDimentions description]
			 */

			var setDimentions = function() {
				var width = $(w).width();
				height = $(w).height();
				jqElm.width( width ).height( height );
				$( '> div > div', jqElm ).width( width ).height( height );
			};

			/**
			 * [setSpeed description]
			 * @param {[type]} _speed [description]
			 */

			var setSpeed = function( _speed ) {
				speed = _speed/1000;
				$( '> div', jqElm ).css({
					'-webkit-transition': 'all ' + speed + 's',
					'-moz-transition'	: 'all ' + speed + 's',
					'-o-transition'		: 'all ' + speed + 's',
					'transition'		: 'all ' + speed + 's'
				});
			};

			/**
			 * [cssSlide description]
			 * @param  {[type]} index [description]
			 * @return {[type]}       [description]
			 */

			var cssSlide = function( index ) {
				if( animated ) return;
				animated = true;
				beforeSlide( index );
				$( '> div', jqElm ).css({
					'-webkit-transform' : 'translate3d(0, -' + (index*height) + 'px, 0)',
					'-moz-transform' : 'translate3d(0, -' + (index*height) + 'px, 0)',
					'-ms-transform' : 'translate3d(0, -' + (index*height) + 'px, 0)',
					'transform' : 'translate3d(0, -' + (index*height) + 'px, 0)'
				});
				bodyTimeout = setTimeout( function(){
					animated = false;
					currentSlideIndex = index;
					afterSlide( index );
				}, options.speed );
			}

			/**
			 * [animateSlide description]
			 * @param  {[type]} index [description]
			 * @return {[type]}       [description]
			 */

			var animateSlide = function( index ) {
				if( animated ) return;
				animated = true;
				$( '> div', jqElm ).animate({
					top : '-' + (index*height) + 'px'
				}, options.speed, function() {
					animated = false;
					currentSlideIndex = index;
					afterSlide( index );
				});
			};

			setDimentions();
			setSpeed( options.speed );
			$(w).resize( setDimentions );

		};

		bindScrollHandeler();
		//bindWheelHandeler();
		bindKeyArrows();
		bindTouchSwipe();

		return $(this).each( function(){
			this.fsvs = new fsvsApp( this );
			fsvsObjects.push(this);
		});

	};

})( jQuery, window, document );