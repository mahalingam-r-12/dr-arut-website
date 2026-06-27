/**
 * reveal.js — page-agnostic scroll-reveal helper.
 * Adds the `in` class to elements matching `selector` as they enter the viewport.
 */
(function (global) {
  function initReveal(selector, options) {
    selector = selector || '.reveal';
    var els = document.querySelectorAll(selector);
    if (!('IntersectionObserver' in global)) {
      els.forEach(function (el) { el.classList.add('in'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, options || { threshold: 0.12 });
    els.forEach(function (el) { io.observe(el); });
  }

  global.initReveal = initReveal;
})(window);
