/**********************************************************************
inView.query.js
Based on inView.query.js by nox7

Modifications:
 1-Add a function updateWatchedElements(delay) to manually launch the inView function
 2-Add a class called 'in-view-watcher-once': if set, the class of 'is-in-view' or 'is-in-view-Y' will never be removed after the object entrer the viewport
 3-Update the class 'in-view-watcher': If set, the class of 'is-in-view' or 'is-in-view-Y' is added when the object is in the viewport and removed when the object goes out of the viewport
 4-Add a class called 'is-in-view-Y': A watched element will have this class is the element is in the viewport only based on the Y axie.
 5-Update the class 'is-in-view':  A watched element will have this class is the element is in the viewport based on X / Y axies.

*/
(function($) {
  var watchedElements = [];
  var doc = document.documentElement;
  var currentYScroll =
    (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);

  $(".in-view-watcher").each(function(i, v) {
    watchedElements.push($(v));
  });
  $(".in-view-watcher-once").each(function(i, v) {
    watchedElements.push($(v));
  });

  // Add the jQuery function "inViewWatcher()"
  $.fn.extend({
    inViewWatcher: function() {
      watchedElements.push(this);
      return this;
    }
  });

  // Add the jQuery function "updateWatchedElements(delay)"
  // Manual execution of the inView function to check .in-view-watcher / .in-view-watcher-one elements
  $.fn.updateWatchedElements = function(myDelay) {
    setTimeout(function() {
      checkWatchedElements();
    }, myDelay);
  };

  function checkWatchedElements() {
    // Get the current offset scrolled from the top
    currentYScroll =
      (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
    // Get the window's height
    var clientHeight = $(window).height();
    var clientWidth = $(window).width();

    // Loop through each of the elements gathered by the selector above this scroll event
    var newWatchedElementsList = [];
    $.each(watchedElements, function(_, obj) {
      if (typeof obj === "undefined") {
        return;
      }

      // Get the distance from the top of the document to the top of this element
      var topOfElement = obj.offset().top;
      // Get the distance from the top of the document to the bottom of this element
      var bottomOfElement = obj.offset().top + obj.height();

      var leftOfElement = obj.offset().left;
      var rightOfElement = obj.offset().left + obj.width();

      if (
        // Check if the top of the element is in the viewport
        (topOfElement > currentYScroll &&
          topOfElement < currentYScroll + clientHeight) ||
        // Or check if the bottom element is in view
        (bottomOfElement > currentYScroll &&
          bottomOfElement < currentYScroll + clientHeight)
      ) {
        // Check if the left of the element is in the viewport
        if (leftOfElement < clientWidth && rightOfElement > 0) {
          // Then the object is totaly in the viewport
          obj.addClass("is-in-view");
        } else {
          //Otherwise the object is in the viewport only from the Y point of view
          obj.addClass("is-in-view-Y");
        }
      } else {
        if (obj.hasClass("in-view-watcher")) {
          // For 'in-view-watcher' elements, remove the .is-in-view/.is-in-view-Y class if the element is no longer in the inView area
          if (obj.hasClass("is-in-view")) {
            obj.removeClass("is-in-view");
          }
          if (obj.hasClass("is-in-view-Y")) {
            obj.removeClass("is-in-view-Y");
          }
        }
      }
      // Check again ALL elements with the in-view-watcher class
      newWatchedElementsList.push(obj);
    });

    // Must be changed here, if changed in the loop (spliced) then some elements will be skipped
    watchedElements = newWatchedElementsList;
  }

  // Register to the scroll event
  $(window).on("scroll", checkWatchedElements);
  $(window).on("load", checkWatchedElements);
  // Run the function once to see if the plugin needs to add the class to any currently viewable elements before a scroll event
  checkWatchedElements();
})(jQuery);
