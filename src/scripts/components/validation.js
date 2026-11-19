const formControls = new WeakMap();

function showInputError(formElement, inputElement, errorMessage, settings) {
  const errorElement = formControls.get(formElement).errors.get(inputElement);
  errorElement.textContent = errorMessage;
  inputElement.classList.add(settings.inputErrorClass);
  inputElement.setAttribute('aria-invalid', 'true');
  errorElement.classList.add(settings.errorClass);
}

function hideInputError(formElement, inputElement, settings) {
  const errorElement = formControls.get(formElement).errors.get(inputElement);
  errorElement.textContent = '';
  inputElement.classList.remove(settings.inputErrorClass);
  inputElement.removeAttribute('aria-invalid');
  errorElement.classList.remove(settings.errorClass);
}

function checkInputValidity(formElement, inputElement, settings) {
  inputElement.setCustomValidity('');
  if (inputElement.validity.patternMismatch && inputElement.dataset.errorMessage) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  }

  if (inputElement.validity.valid) {
    hideInputError(formElement, inputElement, settings);
  } else {
    showInputError(formElement, inputElement, inputElement.validationMessage, settings);
  }
}

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => !inputElement.validity.valid);
}

function disableSubmitButton(buttonElement, settings) {
  buttonElement.disabled = true;
  buttonElement.classList.add(settings.inactiveButtonClass);
}

function enableSubmitButton(buttonElement, settings) {
  buttonElement.disabled = false;
  buttonElement.classList.remove(settings.inactiveButtonClass);
}

function toggleButtonState(inputList, buttonElement, settings) {
  if (hasInvalidInput(inputList)) {
    disableSubmitButton(buttonElement, settings);
  } else {
    enableSubmitButton(buttonElement, settings);
  }
}

function setEventListeners(formElement, settings) {
  if (formControls.has(formElement)) return;

  const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
  const buttonElement = formElement.querySelector(settings.submitButtonSelector);
  const errors = new Map(inputList.map((inputElement) => [
    inputElement,
    formElement.querySelector(`#${CSS.escape(inputElement.id)}-error`),
  ]));
  formControls.set(formElement, { inputList, buttonElement, errors });
  toggleButtonState(inputList, buttonElement, settings);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, settings);
      toggleButtonState(inputList, buttonElement, settings);
    });
  });
}

export function clearValidation(formElement, settings) {
  const { inputList, buttonElement } = formControls.get(formElement);
  inputList.forEach((inputElement) => {
    inputElement.setCustomValidity('');
    hideInputError(formElement, inputElement, settings);
  });
  disableSubmitButton(buttonElement, settings);
}

export function enableValidation(settings) {
  document.querySelectorAll(settings.formSelector).forEach((formElement) => {
    setEventListeners(formElement, settings);
  });
}
