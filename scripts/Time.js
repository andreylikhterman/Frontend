document.addEventListener('DOMContentLoaded', function() {
  const deadline = new Date(2027, 6, 20);
  let timerId = null;
  function countdownTimer() {
    const diff = deadline - new Date();
    if (diff <= 0) {
      clearInterval(timerId);
    }
    const days = diff > 0 ? Math.floor(diff / 1000 / 60 / 60 / 24) : 0;
    const hours = diff > 0 ? Math.floor(diff / 1000 / 60 / 60) % 24 : 0;
    const minutes = diff > 0 ? Math.floor(diff / 1000 / 60) % 60 : 0;
    const seconds = diff > 0 ? Math.floor(diff / 1000) % 60 : 0;
    let str = "МФТИ ВШПИ ";
    str += (days < 10 ? '0' + days : days) + ":";
    str += (hours < 10 ? '0' + hours : hours) + ":";
    str += (minutes < 10 ? '0' + minutes : minutes) + ":";
    str += seconds < 10 ? '0' + seconds : seconds;
    timer.textContent = str;
  }
  var timer = document.querySelector('.timer');
  countdownTimer();
  timerId = setInterval(countdownTimer, 1000);
});