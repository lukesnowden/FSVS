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
			speed 				: 1000,
			mouseSwipeDisance 	: 40,
			mouseWheelDelay 	: false,
			mouseDragEvents 	: true,
			touchEvents 		: true,
			arrowKeyEvents 		: true,
			pagination 			: true,
			paginationTemplate	: '<li data-slide-index="[%num%]"><span></span></li>',
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
						fsvsClass.hidePagination();
					} else if( fsvsClass.isLastSlide() && scrollingDown( event ) ) {
						event.preventDefault();
						bindScrollHandeler();
						unbindWheelHandeler();
						fsvsClass.unjackScreen();
						fsvsClass.hidePagination();
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
							fsvsClass.showPagination();
							fsvsClass.hijackScreen();
							unbindScrollHandeler();
							bindWheelHandeler();
						} else if( fsvsClass.isLastSlide() && fsvsClass.enteredViewPortFromBelow( event ) ) {
							fsvsClass.showPagination();
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
			$(w).bind( 'wheel.fsvs mousewheel.fsvs DOMMouseScroll.fsvs MozMousePixelScroll.fsvs', mouseWheelHandler );
		};

		/**
		 * [unbindWheelHandeler description]
		 * @return {[type]} [description]
		 */

		var unbindWheelHandeler = function() {
			$(w).unbind( 'wheel.fsvs mousewheel.fsvs DOMMouseScroll.fsvs MozMousePixelScroll.fsvs' );
		}

		/**
		 * [bindScrollHandeler description]
		 * @return {[type]} [description]
		 */

		var bindScrollHandeler = function() {
			$(w).bind( 'scroll.fsvs', scrollHandeler );
		};

		/**
		 * [bindScrollHandeler description]
		 * @return {[type]} [description]
		 */

		var unbindScrollHandeler = function() {
			$(w).unbind( 'scroll.fsvs' );
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

			$(w).on( "touchstart.fsvs", function(ev) {
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

			$(w).on( "touchmove.fsvs", function(ev) {
				if( activeFSVS = anyActiveFSVS() ) {
					ev.preventDefault();
					if( activeFSVS.fsvs.isFirstSlide() && isDraggingDown( ev ) ) {
						bindScrollHandeler();
						activeFSVS.fsvs.unjackScreen();
					} else if( activeFSVS.fsvs.isLastSlide() && isDraggingUp( ev ) ) {
						bindScrollHandeler();
						activeFSVS.fsvs.unjackScreen();
					} else
					if( isDraggingUp(ev) ) {
						activeFSVS.fsvs.slideUp();
					} else if( isDraggingDown(ev) ) {
						activeFSVS.fsvs.slideDown();
					}
				} else {
					//scrollHandeler(ev);
				}
			});
		};

		/**
		 * [fsvsApp description]
		 * @return {[type]} [description]
		 */

		var fsvsApp = function( elm ) {

			/**
			 * [that description]
			 * @type {[type]}
			 */

			var that = this;

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
			 * [fsvsPagination description]
			 * @type {[type]}
			 */

			var fsvsPagination = null;

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
				changePagination( index );
				if( isYoungAndHip() ) {
					cssSlide( index );
				} else {
					animateSlide( index );
				}
			};

			/**
			 * [showPagination description]
			 * @return {[type]} [description]
			 */

			this.showPagination = function() {
				fsvsPagination.addClass('visible');
			};

			/**
			 * [hidePagination description]
			 * @return {[type]} [description]
			 */

			this.hidePagination = function() {
				fsvsPagination.removeClass('visible');
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
			 * [unjackScreen description]
			 * @return {[type]}           [description]
			 */

			this.unjackScreen = function() {
				$('html').removeClass( 'hijacked' );
				jqElm.removeClass('active');
				activated = false;
			};


			/**
			 * [hijackScreen description]
			 * @return {[type]} [description]
			 */

			this.hijackScreen = function() {
				$("html, body").scrollTop( jqElmOffset.top );
				$('html').addClass( 'hijacked' );
				jqElm.addClass('active');
				activated = true;
			};

			/**
			 * [changePagination description]
			 * @param  {[type]} index [description]
			 * @return {[type]}       [description]
			 */

			var changePagination = function( index ) {
				$('.active', fsvsPagination).removeClass('active');
				$('> *', fsvsPagination).eq( index ).addClass('active');
			};

			/**
			 * [pagination description]
			 * @return {[type]} [description]
			 */

			var pagination = function() {
				fsvsPagination = $('<ul class="fsvs-pagination"></ul>');
				$( '> div > div', jqElm ).each( function(i){
					var temp = options.paginationTemplate.replace( /\[%num%\]/g, (i+1) );
					var link = $(temp).addClass( i === 0 ? 'active' : '' );
					link.appendTo( fsvsPagination );
					link.on( 'click.fsvs', { index : i }, function(e){
						e.preventDefault();
						that.slideToIndex( e.data.index );
					});
				});
				fsvsPagination.insertAfter( jqElm );
				fsvsPagination.css({
					'margin-top' : '-' + (fsvsPagination.height()/2) + 'px'
				});
			};

			/**
			 * [pixelTick description]
			 * @return {[type]} [description]
			 */

			var pixelTick = function( index, currentIndex ) {
				var frequency = 1;
				var loop = 0;
				var percentage = 0;
				var now = Date.now();
				var interval = setInterval( function(){

					var ev = $.Event( 'pixelTick.fsvs' );
					loop = Number(Date.now()-now);
					percentage = (loop/(options.speed/100)).toFixed(0);
					ev.transitionSpeed = Number(((options.speed/height)/100));
					ev.slideIndex = index;
					ev.slideFrom = $('> div > div', jqElm).eq(currentIndex);
					ev.slideTo = $('> div > div', jqElm).eq(index);
					ev.slidingDown = index > currentIndex;
					ev.slidingUp = ! ev.slidingDown;

					ev.percentageIn = percentage;
					ev.heightPixelsIn = Number(((height/100)*percentage));
					ev.widthPixelsIn = Number((($(window).width()/100)*percentage));
					ev.opacityIn = Number((percentage/100));

					ev.percentageOut = 100-percentage;
					ev.heightPixelsOut = height-ev.heightPixelsIn;
					ev.widthPixelsOut = $(window).width()-ev.widthPixelsIn;
					ev.opacityOut = 1-ev.opacityIn;

					if( percentage >= 100 ) {
						clearInterval( interval );
					}

					jqElm.trigger( ev );
				}, options.speed/height );
			};

			/**
			 * [beforeSlide description]
			 * @param  {[type]} index [description]
			 * @return {[type]}       [description]
			 */

			var beforeSlide = function( index ) {
				var ev = $.Event( 'beforeSlide.fsvs' );
				ev.slideIndex = index;
				jqElm.trigger( ev );
			};

			/**
			 * [afterSlide description]
			 * @param  {[type]} index [description]
			 * @return {[type]}       [description]
			 */

			var afterSlide = function( index ) {
				var ev = $.Event( 'afterSlide.fsvs' );
				ev.slideIndex = index;
				jqElm.trigger( ev );
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
				pixelTick( index, currentSlideIndex );
				$( '> div', jqElm ).css({
					'-webkit-transform' : 'translate3d(0, -' + (index*height) + 'px, 0)',
					'-moz-transform' 	: 'translate3d(0, -' + (index*height) + 'px, 0)',
					'-ms-transform' 	: 'translate3d(0, -' + (index*height) + 'px, 0)',
					'transform' 		: 'translate3d(0, -' + (index*height) + 'px, 0)'
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
			if( options.nthClasses ) nthClasses( options.nthClasses );
			if( options.pagination ) pagination();
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