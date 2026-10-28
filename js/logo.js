// Replays the logo entrance animation.
(function () {
  var button = document.querySelector('.replay');
  var logo = document.querySelector('.dr-host .dr-logo');
  if (!button || !logo || !logo.getAnimations) return;

  button.addEventListener('click', function () {
    logo.getAnimations({ subtree: true }).forEach(function (a) {
      a.cancel();
      a.play();
    });
  });
})();
