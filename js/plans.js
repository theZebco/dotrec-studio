// Monthly / yearly billing toggle. CSS shows the matching prices and moves the pill.
(function () {
  var main = document.querySelector('[data-billing]');
  var buttons = Array.prototype.slice.call(document.querySelectorAll('.bill-btn'));
  if (!main) return;

  buttons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      main.setAttribute('data-billing', btn.getAttribute('data-period'));
      buttons.forEach(function (b) {
        b.setAttribute('aria-pressed', String(b === btn));
      });
    });
  });
})();
