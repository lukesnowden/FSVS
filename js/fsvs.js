
/*!
* 	@plugin 	FSVS - Full Screen Vertical Scroller
* 	@version 	2.0.0
* 	@home 		https://github.com/lukesnowden/FSVS
*
* 	Copyright 2014 Luke Snowden
* 	Released under the MIT license:
* 	http://www.opensource.org/licenses/mit-license.php
*/

;( function( $, $w, $d ){

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

		}, _options );

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

		var afterSlide = function() {

		};

		/**
		 * [isFirstSlide Cant he go instead? I don't want to go first!]
		 * @return {Boolean} [description]
		 */

		var isFirstSlide = function() {

		};

		/**
		 * [isLastSlide last but not least... or is it?]
		 * @return {Boolean} [description]
		 */

		var isLastSlide = function() {

		};

		/**
		 * [enteredViewPortFromAbove description]
		 * @return {[type]} [description]
		 */

		var enteredViewPortFromAbove = function(){

		};

		/**
		 * [enteredViewPortFromBelow description]
		 * @return {[type]} [description]
		 */

		var enteredViewPortFromBelow = function() {

		};

		/**
		 * [app play with me!]
		 * @type {Object}
		 */

		var app = {

			/**
			 * [slideUp how am I sliding up? as is?]
			 * @return {[type]} [description]
			 */

			slideUp : function() {

			},

			/**
			 * [slideDown how am I sliding down? as is?]
			 * @return {[type]} [description]
			 */

			slideDown : function() {

			},

			/**
			 * [slideTo description]
			 * @return {[type]} [description]
			 */

			slideTo : function() {

			},

			/**
			 * [slideToIndex description]
			 * @return {[type]} [description]
			 */

			slideToIndex : function() {

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

			jqElm.data( 'fsvs', app );

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