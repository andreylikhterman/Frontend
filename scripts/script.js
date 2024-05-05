
//Смена цвета
let button = document.getElementById("change_theme");
button.addEventListener("click", function () {
  document.body.classList.toggle("dark-theme");
  for (elem of document.querySelectorAll('.Block')) {
      elem.classList.toggle('dark');
  }
  button.innerText = (button.innerText === 'Тёмная тема' ? "Светлая тема" : "Тёмная тема");
});

//Время
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

//Всплывающее окно
let back_color = document.body.style.backgroundColor;
function windowUp () {
  console.log("de");
  document.getElementById('darker').style.display = "block";
}

window.onload = () => {
  setTimeout('windowUp();', 30000);
};

var close = document.getElementById("closebtn");
close.addEventListener("click", function () {
  this.parentElement.style.display='none';
  document.body.style.backgroundColor = back_color
});

//Фиксированнаое меню
window.addEventListener('scroll', function() {
  if (scrollY > window.screen.height) {
    document.querySelector('.header').style.position = 'fixed';
  } else {
    document.querySelector('.header').style.position = 'static';
  }
});


//Картинки
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

//Обратная связь
class FeedbackPopup {

  constructor(form_index) {
    this.container = document.querySelector("#feedback-form");
    this.form = this.container.querySelector(`#form-${form_index}`);
    this.submitButton = this.form.querySelector("button[type=submit]");
    this.background = this.container.querySelector(".popup-background");
    this.openingLink = document.querySelector("#feedback-opening-link");
    this.isOpened = false;
    this.registerEventListeners();
  }

  openPopup = () => {
    this.isOpened = true;
    this.container.classList.remove("feedback-form-container--closed");
    this.container.classList.add("feedback-form-container--opened");
    this.container.classList.add("popup-container--opened");
    this.background.classList.add("popup-background--opened");
  }

  closePopup = () => {
    this.isOpened = false;
    this.container.classList.add("feedback-form-container--closed");
    this.container.classList.remove("feedback-form-container--opened");
    this.container.classList.remove("popup-container--opened");
    this.background.classList.remove("popup-background--opened");
    this.submitButton.textContent = "Отправить";
    this.submitButton.disabled = false;
  }

  preventAndOpenPopup = (event) => {
    event.preventDefault();
    this.openPopup();
  }

  keyboardListener = (event) => {
    let keyName = event.key;
    if (this.isOpened) {
      switch (keyName) {
        case "Escape":
          this.closePopup();
          break;
      }
    }
  }

  registerEventListeners = () => {
    this.openingLink.addEventListener('click', this.preventAndOpenPopup);
    document.addEventListener('keydown', this.keyboardListener);
    this.background.addEventListener('click', this.closePopup);
    this.submitButton.addEventListener('click', async (event) => {
      event.preventDefault();
      this.submitButton.disabled = true;
      this.submitButton.textContent = "Отправка, подождите";
      await new Promise(_ => setTimeout(_, 3000));
      this.submitButton.textContent = "Отправлено!";
      await new Promise(_ => setTimeout(_, 2000));
      this.closePopup();
    });
  }
}

class FormValidation {

  constructor() {
    this.setErrors();
    this.setValidationForAllForms();
  }

  setErrors = () => {
    this.errors = {
      badInput: '',
      customError: '',
      patternMismatch: 'Используйте латиницу и кирилицу, а также символы \' и -',
      rangeOverflow: 'Введите целое число от 10 до 100 включительно',
      rangeUnderflow: 'Введите целое число от 10 до 100 включительно',
      stepMismatch: '',
      tooLong: '',
      tooShort: '',
      typeMismatch: 'Введите корректный e-mail: латинские буквы, разделённые символом @',
      valid: '',
      valueMissing: '',
    };
  }

  showInputError = (form, input, message) => {
    input.classList.add('invalid-input');
    const span = form.querySelector(`.${input.id}-error`);
    span.classList.add('invalid-message-span');
    span.innerText = message;
  }

  hideInputError = (form, input) => {
    input.classList.remove('invalid-input');
    const span = form.querySelector(`.${input.id}-error`);
    span.classList.remove('invalid-message-span');
    span.innerText = '';
  }

  setRightButtonState = (inputList, button) => {
    button.disabled = false;
    inputList.forEach(input => {
      if (input.required && input.value == '') {
        button.disabled = true;
      }
      if (!input.validity.valid) {
        button.disabled = true;
      }
    });
  }

  isValid = (form, input) => {
    // check if we need to disable button
    const inputList = form.querySelectorAll('input, textarea');
    const button = form.querySelector('button[type="submit"]');
    this.setRightButtonState(inputList, button);
    // check input validity
    if (!input.validity.valid) {
      const errorKey = Object.keys(this.errors).find(el => input.validity[el]);
      let message = this.errors[errorKey] || input.validationMessage;
      if (input.type === 'email') {
        message = this.errors['typeMismatch'];
      }
      this.showInputError(form, input, message);
    } else {
      this.hideInputError(form, input);
    }
    if (input.value === '') {
      this.hideInputError(form, input);
    }
  }

  setInputEventListenter = (form) => {
    const inputList = form.querySelectorAll('input, textarea');
    const button = form.querySelector('button[type="submit"]');
    this.setRightButtonState(inputList, button);
    inputList.forEach(input => {
      input.addEventListener('input', () => {
        this.isValid(form, input)
      });
    });
  }

  setValidationForAllForms = () => {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
      this.setInputEventListenter(form);
    });
  }

}


let feedbackPopup = new FeedbackPopup(1);
let feedbackError = new FormValidation();