function windowUp () {
  if (!sessionStorage.getItem('Closed')) {
    document.getElementById('darker').style.display = "block";
    document.body.style.overflow = 'hidden';
  }
}

window.onload = () => {
  setTimeout('windowUp();', 5000);
};

var close = document.getElementById("closebtn");
close.addEventListener("click", function () {
  sessionStorage.setItem('Closed', true);
  this.parentElement.style.display='none';
  document.body.style.overflow = 'auto';
  document.body.style.backgroundColor = back_color;
});
