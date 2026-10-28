// Shared page behaviour: glass highlight that follows the pointer, nav lens, mobile menu.
(function () {
  var root = document.documentElement;

  // The .lg-spec highlight reads --mx / --my; update them once per frame.
  var raf = 0;
  var pt = null;
  document.addEventListener('mousemove', function (e) {
    pt = [e.clientX, e.clientY];
    if (raf) return;
    raf = requestAnimationFrame(function () {
      raf = 0;
      root.style.setProperty('--mx', pt[0] + 'px');
      root.style.setProperty('--my', pt[1] + 'px');
    });
  });

  // The lens slides under the hovered link and returns to the current page on leave.
  var LINK_WIDTH = 104;
  var links = document.querySelector('.nav-links');
  if (links) {
    var lens = links.querySelector('.nav-lens');
    var items = Array.prototype.slice.call(links.querySelectorAll('.nav-link'));
    var current = Math.max(0, items.findIndex(function (a) {
      return a.getAttribute('aria-current') === 'page';
    }));
    var moveTo = function (i) {
      lens.style.transform = 'translateX(' + (-i * LINK_WIDTH) + 'px)';
    };
    items.forEach(function (a, i) {
      a.addEventListener('mouseenter', function () { moveTo(i); });
    });
    links.addEventListener('mouseleave', function () { moveTo(current); });
  }

  // Phone menu sheet.
  var toggle = document.querySelector('.nav-menu');
  var sheet = document.getElementById('menu-sheet');
  if (toggle && sheet) {
    var setOpen = function (open) {
      sheet.hidden = !open;
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'بستن منو' : 'باز کردن منو');
    };
    toggle.addEventListener('click', function () { setOpen(sheet.hidden); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !sheet.hidden) {
        setOpen(false);
        toggle.focus();
      }
    });
  }
})();
