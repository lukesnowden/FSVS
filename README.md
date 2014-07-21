#FSVS - Full Screen Vertical Scroller

more information http://luke.sno.wden.co.uk/full-screen-vertical-scroll

initiate the plugin:

```javascript
$(document).ready( function() {
	var slider = $.fn.fsvs({
		speed : 5000,
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