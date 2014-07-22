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
	<body>
		<div id="fsvs-body">
			<div class="slide"></div>
			<div class="slide"></div>
			<div class="slide"></div>
		</div>
	</body>
</html>
```