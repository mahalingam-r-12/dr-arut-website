/**
 * main.js — page initialisation for the Dr Arut site.
 * Depends on utils/reveal.js and utils/accordion.js (loaded before this file).
 */
(function () {
  'use strict';

  // ----- Nav scroll state -----
  var nav = document.getElementById('nav');
  if (nav) {
    window.addEventListener('scroll', function () {
      nav.classList.toggle('scrolled', window.scrollY > 40);
    });
  }

  // ----- Mobile menu -----
  var toggle = document.getElementById('navToggle');
  var links = document.getElementById('navLinks');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      var open = links.classList.toggle('open');
      toggle.classList.toggle('active', open);
      toggle.setAttribute('aria-expanded', open);
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    });
    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        links.classList.remove('open');
        toggle.classList.remove('active');
        toggle.setAttribute('aria-expanded', false);
      });
    });
  }

  // ----- Scroll reveal (util) -----
  if (typeof window.initReveal === 'function') {
    window.initReveal('.reveal', { threshold: 0.12 });
  }

  // ----- FAQ accordion (util) -----
  if (typeof window.initAccordion === 'function') {
    window.initAccordion({
      itemSelector: '.faq-item',
      triggerSelector: '.faq-q',
      panelSelector: '.faq-a'
    });
  }

  // ----- Enquiry form -> email via Formspree (AJAX) -----
  var form = document.getElementById('enquiryForm');
  if (form) {
    var ok = document.getElementById('formOk');
    var err = document.getElementById('formErr');
    form.addEventListener('submit', function (ev) {
      ev.preventDefault();
      if (ok) ok.classList.remove('show');
      if (err) err.classList.remove('show');

      // Guard: endpoint not yet configured
      if (form.action.indexOf('YOUR_FORM_ID') !== -1) {
        if (err) {
          err.textContent = 'Form not yet connected. Add your email endpoint (e.g. Formspree) to enable sending.';
          err.classList.add('show');
        }
        return;
      }
      var data = new FormData(form);
      fetch(form.action, { method: 'POST', body: data, headers: { 'Accept': 'application/json' } })
        .then(function (r) {
          if (r.ok) {
            form.reset();
            if (ok) { ok.classList.add('show'); ok.scrollIntoView({ behavior: 'smooth', block: 'center' }); }
          } else if (err) {
            err.classList.add('show');
          }
        })
        .catch(function () { if (err) err.classList.add('show'); });
    });
  }
})();
