#FSVS2 (BETA) on development branch

link: https://github.com/lukesnowden/FSVS/tree/development
demo: http://luke.sno.wden.co.uk/full-screen-vertical-scroll/v2

I am currently having issues trying to hijack the screen on scroll for mobiles. If anyone cares to try and accomplish this as I've currently ran out of ideas, it would be greatly appreciated and you will be accredited for it.

#FSVS - Full Screen Vertical Scroller

more information http://luke.sno.wden.co.uk/full-screen-vertical-scroll

###initiate the plugin:

```javascript
$(document).ready( function() {
	var slider = $.fn.fsvs({
		speed : 5000,
		bodyID : 'fsvs-body',
		selector : '> .slide',
		mouseSwipeDisance : 40,
		afterSlide : function(){},
		beforeSlide : function(){},
		endSlide : function(){},
		mouseWheelEvents : true,
		mouseWheelDelay : false,
		mouseDragEvents : true,
		touchEvents : true,
		arrowKeyEvents : true,
		pagination : true,
		nthClasses : false,
		detectHash : true
	});
	//slider.slideUp();
	//slider.slideDown();
	//slider.slideToIndex( index );
});
```

###Basic HTML structure



```html
<!doctype html>
<html class="fsvs" lang="en">
	<head>
		<script src="jquery.js">
		<script src="fsvs.js">
	</head>
	<body>
		<div id="fsvs-body">
			<div class="slide"></div>
			<div class="slide"></div>
			<div class="slide"></div>
		</div>
	</body>
</html>
```
