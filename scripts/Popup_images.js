const findImages = () => {
    const urls = [];
    for (const image of document.querySelectorAll('.images__container img')) {
        urls.push(image.getAttribute('src'));
    }
    return urls;
};
document.querySelectorAll('.images__container img').forEach(image => {
  image.onclick = () => {
    document.querySelector('.popup__container').style.display = 'block';
    document.querySelector('.popup__container img').src = image.getAttribute('src');
    var current_image = image.getAttribute('src');
    const slides = findImages();
    document.getElementById('next-button').onclick = function() {
      document.querySelector('.popup__container img').src = slides[(slides.indexOf(current_image) + 1) % slides.length];
      current_image = slides[(slides.indexOf(current_image) + 1) % slides.length];
      if (slides.indexOf(current_image) === slides.length - 1) {
        document.querySelector('.next-button').style.display = 'none';
        document.querySelector('.prev-button').style.display = 'block';
      } else {
        document.querySelector('.next-button').style.display = 'block';
        document.querySelector('.prev-button').style.display = 'block';
      }
    }

    document.getElementById('prev-button').onclick = function() {
      document.querySelector('.popup__container img').src = slides[(slides.indexOf(current_image) + slides.length - 1) % slides.length];
      current_image = slides[(slides.indexOf(current_image) + slides.length - 1) % slides.length];
      if (slides.indexOf(current_image) === 0) {
        document.querySelector('.prev-button').style.display = 'none';
        document.querySelector('.next-button').style.display = 'block';
      } else {
        document.querySelector('.prev-button').style.display = 'block';
        document.querySelector('.next-button').style.display = 'block';
      }
    }
  }
});

document.querySelector('.popup__container span').onclick = () => {
  document.querySelector('.popup__container').style.display = 'none';
}