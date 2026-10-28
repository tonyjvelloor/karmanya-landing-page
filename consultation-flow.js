(function () {
  'use strict';
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
