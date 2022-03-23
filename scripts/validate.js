/** Объект с настройками валидации форм */
const enableValidationSettings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-buton_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};

/** Функция для показа ошибки в ходе валидации поля
 *
 * @param {object} formElement  - форма
 * @param {object} inputElement - input поле
 * @param {string} errorMessage - сообщение об ошибке
 * @param {string} inputErrorClass - класс типа ошибки в поле input
 * @param {string} errorClass - класс для отображения элемента с текстом ошибки в поле input
 */
 const showInputError = (formElement, inputElement, errorMessage, inputErrorClass, errorClass) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
};

/** Функция, скрывающая ошибку в ходе валидации поля
 *
 * @param {object} formElement
 * @param {object} inputElement
 * @param {string} inputErrorClass - класс типа ошибки в поле input
 * @param {string} errorClass - класс для отображения элемента с текстом ошибки в поле input
 */
const hideInputError = (formElement, inputElement, inputErrorClass, errorClass) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';
};

/** Функция для проверки input поля на валидность
 * @param {object} formElement - форма
 * @param {object} inputElemen - input поле
 * @param {string} inputErrorClass - класс типа ошибки в поле input
 * @param {string} errorClass - класс для отображения элемента с текстом ошибки в поле input
 */
 function checkInputValidity(formElement, inputElement, inputErrorClass, errorClass) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, inputErrorClass, errorClass);
  }
  else {
    hideInputError(formElement, inputElement, inputErrorClass, errorClass);
  }
}

/** Функция проверяет валиднось полей и возращает true или false
 *
 * @param {object} inputList - список input полей
 * @returns Boolean
 */
 function hasInvalidInput (inputList) {
  // проходим по этому массиву методом some
  return Array.from(inputList).some((inputElement) => {
    // Если поле не валидно, колбэк вернёт true
    // Обход массива прекратится и вся фунцкция hasInvalidInput вернёт true
    return !inputElement.validity.valid;
  })
}

/** Функция, которая меняет статус кнопки submit в зависимости от валидаци полей формы
 *
 * @param {object} inputList - список всех контролируемых input-полей
 * @param {object} buttonElement - кнопка submit
 * @param {string} inactiveButtonClass - класс для бана кнопки submit
 */
 function toggleButtonState (inputList, buttonElement, inactiveButtonClass) {
  // Если есть хотя бы один невалидный инпут
  if (hasInvalidInput(inputList)) {
    // сделай кнопку неактивной
    buttonElement.classList.add(inactiveButtonClass);
    //buttonElement.disabled=true;
    buttonElement.setAttribute('disabled', true);
  } else {
    // иначе сделай кнопку активной
    buttonElement.classList.remove(inactiveButtonClass);
    //buttonElement.disabled=false;
    buttonElement.removeAttribute('disabled');
  }
}

/** Функция-установщик слушателей на input поля
 *
 * @param {object} formElement - форма
 * @param {object} inputList - список полей input
 * @param {object} buttonElement - кнопка submit
 * @param {string} inactiveButtonClass - класс для бана кнопки submit
 * @param {string} inputErrorClass - класс типа ошибки в поле input
 * @param {string} errorClass - класс для отображения элемента с текстом ошибки в поле input
 */
 function setEventListeners (formElement, inputList, buttonElement, inactiveButtonClass, inputErrorClass, errorClass) {
  // до начала ввода данных в input делаем кнопку неактивной?
  toggleButtonState(inputList, buttonElement, inactiveButtonClass);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, inputErrorClass, errorClass);
      // нужно сверять состояние кнопки при каждом изменении полей формы!
      toggleButtonState(inputList, buttonElement, inactiveButtonClass);
    });
  });
}

/** Функция для включения механизма валидации форм
 * @param {object} validationSettings - настройки
 *
 * { formSelector: '.popup__form',
 * inputSelector: '.popup__input',
 * submitButtonSelector: '.popup__save-button',
 * inactiveButtonClass: 'popup__save-buton_inactive',
 * inputErrorClass: 'popup__input_type_error',
 * errorClass: 'popup__input-error' }
 */
 function  enableValidation(validationSettings) {
  // 1. получаем все формы в документе
  const formList = document.querySelectorAll(validationSettings.formSelector);

  // 2. проходим по всем input-полям в каждой форме
  formList.forEach((formElement) => {

    const inputList = Array.from(formElement.querySelectorAll(validationSettings.inputSelector));
    const buttonElement = formElement.querySelector(validationSettings.submitButtonSelector);

    setEventListeners (formElement, inputList, buttonElement,
      validationSettings.inactiveButtonClass, validationSettings.inputErrorClass, validationSettings.errorClass);

  });
}

/** Функция для очистки полей формы от элементов ошибок
 * @param {object} form - форма
 */
function clearFormInputError(form) {
const inputList =  form.querySelectorAll(enableValidationSettings.inputSelector);

inputList.forEach((inputElement) =>
  hideInputError(form, inputElement, enableValidationSettings.inputErrorClass,
    enableValidationSettings.errorClass));
}

/** Запускаем валидацию форм */
enableValidation(enableValidationSettings);
