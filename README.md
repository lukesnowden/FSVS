#Development

~~I wrote FSVS drunk on my sofa on my day off. I will be writing a new version (can't promise I wont be drunk) which will handle multiple instances on a single page (a kind of semi-hijack with the ability to leave the hijack).~~

#HTML Structure

It is worth taking note that from version 1 to version 2 the HTML structure has changed, but not by much:

```html
<div id="fsvs1" class="fsvs">
	<div>
		<div>Slide 1</div>
		<div>Slide 2</div>
		<div>Slide 3</div>
	</div>
</div>
```

And yes, this means you can have multiple instances on a single page.

#jQuery

Again, this has had to change

```javascript
jQuery(document).ready( function(e) {
	$('.fsvs').fsvs({
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
	});

	// added in some events for more control
	$('#fsvs1')
	.on( 'beforeSlide.fsvs', function(e){
		console.log(e);
	})
	.on( 'afterSlide.fsvs', function(e){
		console.log(e);
	})
	.on( 'pixelTick.fsvs', function(e){

		/**
		 * [slideIndex description]
		 * The index of the slide which the slide is bringing into play
		 */

		e.slideIndex;

		/**
		 * [slideFrom description]
		 * jQuery object of the "leaving" slide
		 */

		e.slideFrom;

		/**
		 * [slideTo description]
		 * jQuery object of the "coming in" slide
		 */

		e.slideTo;

		/**
		 * [slidingDown description]
		 * Bool, is sliding down?
		 */

		e.slidingDown;

		/**
		 * [slidingUp description]
		 * Bool, is sliding up?
		 */

		e.slidingUp;

		/**
		 * [percentageIn description]
		 * Percentage of slide completion from 0 - 100
		 */

		e.percentageIn;

		/**
		 * [heightPixelsIn description]
		 * percentage of height completion from 0 - windowHeight
		 */

		e.heightPixelsIn;

		/**
		 * [widthPixelIn description]
		 * percentage of width completion from 0 - windowWidth
		 */

		e.widthPixelsIn;

		/**
		 * [opacityIn description]
		 * percentage of completion of opacity from 0 - 1
		 */

		e.opacityIn;

		/**
		 * [percentageOut description]
		 * Percentage of slide completion from 100 - 0
		 */

		e.percentageOut;

		/**
		 * [heightPixelOut description]
		 * percentage of height completion from windowHeight - 0
		 */

		e.heightPixelsOut;

		/**
		 * [opacityOut description]
		 * percentage of completion of opacity from 1 - 0
		 */

		e.opacityOut;

	});

});
```
