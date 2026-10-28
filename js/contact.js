// Three-step contact form: each step is validated before moving on.
(function () {
  var form = document.getElementById('contact-form');
  var sent = document.getElementById('contact-sent');
  if (!form || !sent) return;

  var steps = Array.prototype.slice.call(form.querySelectorAll('.step'));
  var dots = Array.prototype.slice.call(form.querySelectorAll('.st'));
  var bars = Array.prototype.slice.call(form.querySelectorAll('.st-bar'));
  var stepNum = form.querySelector('.f-step');
  var back = form.querySelector('[data-action="back"]');
  var next = form.querySelector('[data-action="next"]');
  var submit = form.querySelector('[type="submit"]');
  var DIGITS = ['۱', '۲', '۳'];
  var last = steps.length - 1;
  var step = 0;

  function render() {
    steps.forEach(function (el, i) { el.hidden = i !== step; });
    dots.forEach(function (el, i) {
      el.classList.toggle('done', i < step);
      el.classList.toggle('current', i === step);
      if (i === step) el.setAttribute('aria-current', 'step');
      else el.removeAttribute('aria-current');
    });
    bars.forEach(function (el, i) { el.classList.toggle('on', step > i); });
    stepNum.textContent = DIGITS[step];
    back.hidden = step === 0;
    next.hidden = step === last;
    submit.hidden = step !== last;
  }

  function go(n) {
    step = n;
    render();
  }

  function message(field) {
    var v = field.validity;
    if (v.valueMissing) return 'لطفاً این فیلد را پر کنید';
    if (field.type === 'email' && v.typeMismatch) return 'ایمیل معتبر نیست';
    if (v.patternMismatch) return 'شماره موبایل معتبر نیست';
    return '';
  }

  function valid(i) {
    var fields = steps[i].querySelectorAll('input, select, textarea');
    for (var j = 0; j < fields.length; j++) {
      var f = fields[j];
      f.setCustomValidity('');
      if (!f.checkValidity()) {
        f.setCustomValidity(message(f));
        f.reportValidity();
        return false;
      }
    }
    return true;
  }

  next.addEventListener('click', function () {
    if (valid(step)) go(Math.min(last, step + 1));
  });
  back.addEventListener('click', function () { go(Math.max(0, step - 1)); });

  form.addEventListener('input', function (e) {
    if (e.target.setCustomValidity) e.target.setCustomValidity('');
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!valid(step)) return;
    if (step < last) {
      go(step + 1);
      return;
    }
    form.hidden = true;
    sent.hidden = false;
  });

  sent.querySelector('[data-action="reset"]').addEventListener('click', function () {
    form.reset();
    go(0);
    sent.hidden = true;
    form.hidden = false;
  });
})();
