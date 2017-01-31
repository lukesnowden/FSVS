#Showcase
Send a pull request to add your projects to the showcase list

* http://specialebrides.com/ - Divisum
* https://cryptuitive.com/ - Jon Cursi
* https://www.lukesnowden.co.uk/ - Me

#FSVS2 (BETA) on development branch

link: https://github.com/lukesnowden/FSVS/tree/development
demo: https://www.lukesnowden.co.uk/full-screen-vertical-scroll/v2

I am currently having issues trying to hijack the screen on scroll for mobiles. If anyone cares to try and accomplish this as I've currently ran out of ideas, it would be greatly appreciated and you will be accredited for it.

#FSVS - Full Screen Vertical Scroller

more information https://www.lukesnowden.co.uk/full-screen-vertical-scroll

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
		scrollableArea : 'scrollable',
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
	//slider.unbind();
	//slider.rebind();
});
```

###Basic HTML structure
(please note that the fsvs class is needed on the HTML tag)


```html
<!doctype html>
<html class="fsvs" lang="en">
	<head>
		<link href="assets/css/style.css" media="all" rel="stylesheet" type="text/css" />
        <script src="//code.jquery.com/jquery-1.11.0.min.js"></script>
        <script src="//code.jquery.com/jquery-migrate-1.2.1.min.js"></script>
        <script src="assets/js/bundle.js"></script>
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
