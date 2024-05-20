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
    this.openPopup();
  }

  registerEventListeners = () => {
    this.openingLink.addEventListener('click', this.preventAndOpenPopup);
    this.background.addEventListener('click', this.closePopup);
    this.submitButton.addEventListener('click', async () => {
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
      patternMismatch: 'Номер телефона в формате +79998887766',
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

  setButtonState = (inputList, button) => {
    button.disabled = false;
    inputList.forEach(input => {
      if (input.required && input.value === '') {
        button.disabled = true;
      }
      if (input.value === '') {
        button.disabled = true;
      }
      if(!input.validity.valid) {
        button.disabled = true;
      }
    });
  }

  isValid = (form, input) => {
    // check if we need to disable button
    const inputList = form.querySelectorAll('input, textarea');
    const button = form.querySelector('button[type="submit"]');
    this.setButtonState(inputList, button);
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
    if (input.value === '' && input.id !== 'feedback') {
      this.hideInputError(form, input);
    }
  }

  setInputEventListenter = (form) => {
    const inputList = form.querySelectorAll('input, textarea');
    const button = form.querySelector('button[type="submit"]');
    this.setButtonState(inputList, button);
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
