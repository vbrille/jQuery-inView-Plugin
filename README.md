# jQuery-inView-Plugin
A jQuery plugin that is designed to integrate with CSS transitions. Will determine if an element is within the viewport

## HTML/CSS Only Usage
Add the class _in-view-watcher_  or _in-view-watcher-once_ like shown below
```html
<div class="in-view-watcher">

</div>
<div class="in-view-watcher-once">

</div>
```

_in-view-watcher_ : When the element is in the viewport of the browser, the class _is-in-view_ will be added to the element by the plugin. This class will be removed when the element is no longer in the viewport.
_in-view-watcher-once_ : When the element is in the viewport of the browser, the class _is-in-view_ will be added to the element by the plugin and will never be removed.

You have to write some CSS to make sure to only perform your transition, or whatever changes you have in mind, when that class is there.

```css
.in-view-watcher{
    height:100px;
}

.in-view-watcher.is-in-view{
    transition:height 200ms;
    height:20px;
}
```

This would transition the height to be 20px in 200ms (0.2s) each time the element comes into view.

```css
.in-view-watcher-once{
    height:100px;
}

.in-view-watcher-once.is-in-view{
    transition:height 200ms;
    height:20px;
}
```

This would transition the height to be 20px in 200ms (0.2s) when the element comes into view.


## jQuery Event Usage

The plugin also adds a new jQuery extension function called _inViewWatcher()_ that can register an element to be watched for whether or not it is in the viewport. Then, an event called "in-view" will fire whenever that element is in the viewport. This eliminates the need to add an additional class in the HTML by default.

```html
<div id="example"></div>
```

```javascript
$("#example").inViewWatcher().on("in-view", function(){
   console.log("The element is in the viewport!");
   // Do something here
});
```

## jQuery Manual Function Execution Usage

The plugin also adds a new jQuery function called _updateWatchedElements(delay)_ that can be executed to launch the plugin in case you need to refresh elements outside of an initial page load or scroll events. This function accept a delay as parameter.


```javascript
	//OnSlideChange, launch the inView update
	$(this).updateWatchedElements(5);
```

In this example, when the slide of my SlideShow is changing, I execute the inview watched elements to activate transitions within my next slide.