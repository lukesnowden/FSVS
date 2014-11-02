
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
			speed 				: 5000,
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
		 * [windowScrollTop description]
		 * @type {Number}
		 */

		var windowScrollTop = 0;

		/**
		 * [isCustomeScrollHandelerActive description]
		 * @type {Boolean}
		 */

		var isCustomScrollHandelerActive = false;

		/**
		 * [handelerInterval description]
		 * @type {[type]}
		 */

		var handelerInterval = null;

		/**
		 * [handelerStart description]
		 * @type {[type]}
		 */

		var handelerStart = false;

		/**
		 * [jqElmOffset description]
		 * @type {Object}
		 */

		var jqElmOffset = {};

		/**
		 * [currentSlideIndex description]
		 * @type {Number}
		 */

		var currentSlideIndex = 0;

		/**
		 * [isYoungAndHip - you know I'm not talking about Internet Explorer]
		 * @return {Boolean} [description]
		 */

		var isYoungAndHip = function() {

		};

		/**
		 * [jqElm the FSVS jQuery object]
		 * @type {[type]}
		 */

		var jqElm = null;

		/**
		 * [isHijacked check if we are currently being hijacked]
		 * @return {Boolean} [description]
		 */

		var isHijacked = function() {
			return jqElm.hasClass( 'hijacked' );
		};

		/**
		 * [canSlideUp from our position, can we slide up?]
		 * @return {[type]} [description]
		 */

		var canSlideUp = function() {

		};

		/**
		 * [canSlideDown from our position, can we slide down?]
		 * @return {[type]} [description]
		 */

		var canSlideDown = function() {

		};

		/**
		 * [slideUp slide up mother trucker!]
		 * @return {[type]} [description]
		 */

		var slideUp = function() {

		};

		/**
		 * [slideDown your going down!]
		 * @return {[type]} [description]
		 */

		var slideDown = function() {

		};

		/**
		 * [slideToIndex go to slide, minus the 1]
		 * @return {[type]} [description]
		 */

		var slideToIndex = function() {

		};

		/**
		 * [afterSlide ok, I've slid... what next]
		 * @return {[type]} [description]
		 */

		var afterSlide = function( index ) {

		};

		/**
		 * [beforeSlide description]
		 * @return {[type]} [description]
		 */

		var beforeSlide = function( index ) {

		};

		/**
		 * [isFirstSlide Cant he go instead? I don't want to go first!]
		 * @return {Boolean} [description]
		 */

		var isFirstSlide = function() {

		};

		/**
		 * [hijackScreen description]
		 * @return {[type]} [description]
		 */

		var hijackScreen = function() {
			$("html, body").scrollTop( jqElmOffset.top );
			$('html').addClass( 'hijacked' );
		};

		/**
		 * [scrollingDown description]
		 * @param  {[type]} e [description]
		 * @return {[type]}   [description]
		 */

		var scrollingDown = function( wheely ) {
			return ! scrollingUp( wheely );
		};

		/**
		 * [scrollingUp description]
		 * @param  {[type]} e [description]
		 * @return {[type]}   [description]
		 */

		var scrollingUp = function( wheely ) {
			return wheely < 0 || wheely > 0;
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
		 * [isLastSlide last but not least... or is it?]
		 * @return {Boolean} [description]
		 */

		var isLastSlide = function() {

		};

		/**
		 * [nthClasses description]
		 * @param  {[type]} nthClassLimit [description]
		 * @return {[type]}               [description]
		 */

		var nthClasses = function( nthClassLimit ) {
			$( '> div > div', jqElm ).each( function( i ) {
				var nthClass = 'nth-class-' + ((i%options.nthClasses)+1);
				if( ! $(this).hasClass( nthClass ) ) {
					$(this).addClass( nthClass );
				}
			});
		};

		/**
		 * [enteredViewPortFromAbove description]
		 * @return {[type]} [description]
		 */

		var enteredViewPortFromAbove = function(e){
			if( ! isHijacked() ) {
				if( scrollingDown(e) && windowScrollTop >= jqElmOffset.top ) {
					return true;
				}
			}
			return false;
		};

		/**
		 * [enteredViewPortFromBelow description]
		 * @return {[type]} [description]
		 */

		var enteredViewPortFromBelow = function(e) {
			if( ! isHijacked() ) {

			}
			return false;
		};

		/**
		 * [customScrollHandeler description]
		 * @param  {[type]}   e        [description]
		 * @param  {Function} callback [description]
		 * @return {[type]}            [description]
		 */

		var customScrollHandeler = function( e, callback ) {
			isCustomScrollHandelerActive = true;
			handelerInterval = setInterval( function(){
				if( ( Date.now() - handelerStart ) > 100 ) {
					isCustomScrollHandelerActive = false;
					clearInterval( handelerInterval );
				} else {
					callback(e);
				}
			}, 10 );
		}

		/**
		 * [mouseWheelHandler description]
		 * @param  {[type]} e [description]
		 * @return {[type]}   [description]
		 */

		var mouseWheelHandler = function(e) {
			handelerStart = Date.now();
			if( ! isCustomScrollHandelerActive ) {
				customScrollHandeler( e, function(e){
					var e = window.event || e;
					var wheely = ( e.wheelDelta || e.detail || e.originalEvent.detail );
					var delta = Math.max( -1, Math.min( 1, wheely ) );
					if( isChrome() ) wheely = Math.floor( wheely / 5 );

					windowScrollTop = $(window).scrollTop();
					jqElmOffset = jqElm.offset();

					if( enteredViewPortFromAbove( wheely ) ) {
						e.preventDefault();
						hijackScreen();
					} else if( enteredViewPortFromBelow( wheely ) ) {
						e.preventDefault();
						hijackScreen();
					} else if( isHijacked() ) {

					}
				});
			}
		};

		/**
		 * [bindScrollingEvent description]
		 * @return {[type]} [description]
		 */

		var bindScrollingEvent = function() {
			$(window).bind( 'wheel mousewheel DOMMouseScroll MozMousePixelScroll', mouseWheelHandler );
		};

		/**
		 * [bindKeyArrows description]
		 * @return {[type]} [description]
		 */

		var bindKeyArrows = function() {
			window.onkeydown = function(e) {
				e = e || window.event;
			    if ( e.keyCode == '38' ) slideUp();
			    else if ( e.keyCode == '40' ) slideDown();
			};
		};

		/**
		 * [setDimentions description]
		 */

		var setDimentions = function() {
			var width = $(w).width();
			var height = $(w).height();
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
			beforeSlide( index );
			$( '> div', body ).css({
				'-webkit-transform' : 'translate3d(0, -' + (index*100) + '%, 0)',
				'-moz-transform' : 'translate3d(0, -' + (index*100) + '%, 0)',
				'-ms-transform' : 'translate3d(0, -' + (index*100) + '%, 0)',
				'transform' : 'translate3d(0, -' + (index*100) + '%, 0)'
			});
			bodyTimeout = setTimeout( function(){
				currentSlideIndex = index + 1;
				afterSlide( index );
			}, options.speed );
		}

		/**
		 * [app play with me!]
		 * @type {Object}
		 */

		var app = function(){

			/**
			 * [slideUp how am I sliding up? as is?]
			 * @return {[type]} [description]
			 */

			this.slideUp = function() {
				slideUp();
			};

			/**
			 * [slideDown how am I sliding down? as is?]
			 * @return {[type]} [description]
			 */

			this.slideDown = function() {
				slideDown();
			};

			/**
			 * [slideTo description]
			 * @return {[type]} [description]
			 */

			this.slideTo = function( number ) {
				slideToIndex( number-1 );
			},

			/**
			 * [slideToIndex description]
			 * @return {[type]} [description]
			 */

			this.slideToIndex = function( index ) {
				slideToIndex( index );
			}

		};

		/**
		 * [init description]
		 * @param  {[type]} elm   [description]
		 * @param  {[type]} index [description]
		 * @return {[type]}       [description]
		 */

		var init = function( elm, index ) {

			jqElm = $( elm );

			setDimentions();
			bindScrollingEvent();
			setSpeed( options.speed );
			if( options.nthClasses ) {
				nthClasses();
			}

			jqElm.data( 'fsvs', new app() );

			$(w).resize( setDimentions );

		};

		/**
		 * [description]
		 * @param  {[type]} i [description]
		 * @return {[type]}   [description]
		 */

		return $(this).each( function ( i ) {
			init( this, i );
		});

	};

})( jQuery, window, document );