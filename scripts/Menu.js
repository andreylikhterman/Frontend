window.addEventListener('scroll', function() {
  if (scrollY > window.screen.height) {
    document.querySelector('.header').style.position = 'fixed';
  } else {
    document.querySelector('.header').style.position = 'static';
  }
});