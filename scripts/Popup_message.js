function windowUp () {
  if (!sessionStorage.getItem('Closed')) {
    document.getElementById('darker').style.display = "block";
  }
}

window.onload = () => {
  setTimeout('windowUp();', 30000);
};

var close = document.getElementById("closebtn");
close.addEventListener("click", function () {
  sessionStorage.setItem('Closed', true);
  this.parentElement.style.display='none';
  document.body.style.backgroundColor = back_color;
});
