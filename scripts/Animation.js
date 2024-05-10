const cubeSvg = document.getElementById('cube-svg');
const width = cubeSvg.clientWidth;
const height = cubeSvg.clientHeight;

let rotationAngle = 0;
let isScrolling = false;

window.addEventListener('scroll', (event) => {
  isScrolling = true;
  rotationAngle += scrollY / 100;
});

function updateRotation() {
  if (isScrolling) {
    cubeSvg.style.transform = `rotate(${rotationAngle}deg)`;
  }
  requestAnimationFrame(updateRotation);
}

updateRotation();