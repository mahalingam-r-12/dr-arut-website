/**
 * accordion.js — page-agnostic accordion helper.
 * Each item (`itemSelector`) contains a trigger (`triggerSelector`) and a
 * panel (`panelSelector`). Toggling adds/removes the `open` class on the item
 * and animates the panel's max-height.
 */
(function (global) {
  function initAccordion(opts) {
    opts = opts || {};
    var itemSelector = opts.itemSelector || '.faq-item';
    var triggerSelector = opts.triggerSelector || '.faq-q';
    var panelSelector = opts.panelSelector || '.faq-a';

    document.querySelectorAll(triggerSelector).forEach(function (trigger) {
      trigger.addEventListener('click', function () {
        var item = trigger.closest(itemSelector);
        if (!item) return;
        var panel = item.querySelector(panelSelector);
        var isOpen = item.classList.toggle('open');
        trigger.setAttribute('aria-expanded', isOpen);
        if (panel) {
          panel.style.maxHeight = isOpen ? panel.scrollHeight + 'px' : null;
        }
      });
    });
  }

  global.initAccordion = initAccordion;
})(window);
