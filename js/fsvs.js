
/*!
* 	@plugin 	FSVS - Full Screen Vertical Scroller
* 	@version 	2.0.0
* 	@home 		https://github.com/lukesnowden/FSVS
*
* 	Copyright 2014 Luke Snowden
* 	Released under the MIT license:
* 	http://www.opensource.org/licenses/mit-license.php
*/

;( function($){

	/**
	 * [fsvs description]
	 * @param  {[type]} options [description]
	 * @return {[type]}         [description]
	 */

	$.fn.fsvs = function( _options ) {

		/**
		 * [options description]
		 * @type {[type]}
		 */

		var options = $.extend({

		}, _options );

		/**
		 * [isHijacked description]
		 * @return {Boolean} [description]
		 */

		var isHijacked = function() {

		};

		/**
		 * [canSlideUp description]
		 * @return {[type]} [description]
		 */

		var canSlideUp = function() {

		};

		/**
		 * [canSlideDown description]
		 * @return {[type]} [description]
		 */

		var canSlideDown = function() {

		};

		/**
		 * [slideUp description]
		 * @return {[type]} [description]
		 */

		var slideUp = function() {

		};

		/**
		 * [slideDown description]
		 * @return {[type]} [description]
		 */

		var slideDown = function() {

		};

		/**
		 * [slideToIndex description]
		 * @return {[type]} [description]
		 */

		var slideToIndex = function() {

		};

		/**
		 * [afterSlide description]
		 * @return {[type]} [description]
		 */

		var afterSlide = function() {

		};

		/**
		 * [isFirstSlide description]
		 * @return {Boolean} [description]
		 */

		var isFirstSlide = function() {

		};

		/**
		 * [isLastSlide description]
		 * @return {Boolean} [description]
		 */

		var isLastSlide = function() {

		};

		/**
		 * [app description]
		 * @type {Object}
		 */

		var app = {

			/**
			 * [slideUp description]
			 * @return {[type]} [description]
			 */

			slideUp : function() {

			},

			/**
			 * [slideDown description]
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

			var jqElm = $( elm );

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

})( jQuery );