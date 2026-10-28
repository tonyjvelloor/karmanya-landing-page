(function () {
  'use strict';
  document.querySelectorAll('[data-video-id]').forEach(function (button) {
    button.addEventListener('click', function () {
      var id = button.getAttribute('data-video-id');
      if (!/^[A-Za-z0-9_-]+$/.test(id)) return;
      var frame = document.createElement('iframe');
      frame.src = 'https://www.instagram.com/reel/' + id + '/embed/';
      frame.title = button.getAttribute('aria-label');
      frame.width = '320'; frame.height = '540';
      frame.setAttribute('allow', 'encrypted-media; picture-in-picture');
      frame.setAttribute('loading', 'eager');
      button.parentNode.replaceChild(frame, button);
    }, { once: true });
  });

  function revealHashTarget() {
    var id;
    try { id = decodeURIComponent(location.hash.slice(1)); } catch (_) { return; }
    var target = id && document.getElementById(id);
    if (!target) return;
    var parent = target.closest('details');
    while (parent) {
      parent.open = true;
      parent = parent.parentElement.closest('details');
    }
  }
  window.addEventListener('hashchange', revealHashTarget);
  revealHashTarget();
})();
