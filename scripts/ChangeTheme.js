
let button = document.getElementById("change_theme");
button.addEventListener("click", function () {
  document.body.classList.toggle("dark-theme");
  for (elem of document.querySelectorAll('.Block')) {
      elem.classList.toggle('dark');
  }
  button.innerText = (button.innerText === 'Тёмная тема' ? "Светлая тема" : "Тёмная тема");
});