
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

	$.fn.fsvs = function( options ) {

		/**
		 * [app description]
		 * @type {Object}
		 */

		var app = {

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