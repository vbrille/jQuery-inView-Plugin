!(function(a) {
  function e() {
    d = (window.pageYOffset || c.scrollTop) - (c.clientTop || 0);
    var e = a(window).height(),
      f = a(window).width(),
      g = [];
    a.each(b, function(a, b) {
      if ("undefined" !== typeof b) {
        var c = b.offset().top,
          h = b.offset().top + b.height(),
          i = b.offset().left,
          j = b.offset().left + b.width();
        (c > d && c < d + e) || (h > d && h < d + e)
          ? b.addClass(i < f && j > 0 ? "is-in-view" : "is-in-view-Y")
          : b.hasClass("in-view-watcher") &&
            (b.hasClass("is-in-view") && b.removeClass("is-in-view"),
            b.hasClass("is-in-view-Y") && b.removeClass("is-in-view-Y")),
          g.push(b);
      }
    }),
      (b = g);
  }
  var b = [],
    c = document.documentElement,
    d = (window.pageYOffset || c.scrollTop) - (c.clientTop || 0);
  a(".in-view-watcher").each(function(c, d) {
    b.push(a(d));
  }),
    a(".in-view-watcher-once").each(function(c, d) {
      b.push(a(d));
    }),
    a.fn.extend({
      inViewWatcher: function() {
        return b.push(this), this;
      }
    }),
    (a.fn.updateWatchedElements = function(a) {
      setTimeout(function() {
        e();
      }, a);
    }),
    a(window).on("scroll", e),
    a(window).on("load", e),
    e();
})(jQuery);
