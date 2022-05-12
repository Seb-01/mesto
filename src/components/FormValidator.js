/** Класс FormValidator для валидации заданной формы
 *
 */
export class FormValidator {
   constructor(settings, formElem) {
    this._formSelector = settings.formSelector;
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;
    this._formElem = formElem;

    // добавляем в арибуты класса все input-поля формы
    this._inputList = Array.from(this._formElem.querySelectorAll(this._inputSelector));
    // добавляем в арибуты класса кнопку submit формы
    this._buttonElement = this._formElem.querySelector(this._submitButtonSelector);

  }

  /** Функция проверки списка полей ввода инфо на наличие хоть одной ошибки
   *
   */
  _hasInvalidInput() {
    // проходим по массиву полей ввода методом some
  return Array.from(this._inputList).some((inputElement) => {
    // Если поле не валидно, колбэк вернёт true
    // Обход массива прекратится и вся фунцкция hasInvalidInput вернёт true
    return !inputElement.validity.valid;
  })
  }


  /** Функция актуализации кнопки submit
   *
   */
   _toggleButtonState() {
    // Если есть хотя бы один невалидный инпут
    if (this._hasInvalidInput()) {
      // сделай кнопку неактивной
      this._buttonElement.classList.add(this._inactiveButtonClass);
      this._buttonElement.setAttribute('disabled', true);
    } else {
      // иначе - сделай кнопку активной
      this._buttonElement.classList.remove(this._inactiveButtonClass);
      this._buttonElement.removeAttribute('disabled');
    }
  }

  /** Функция для вывода сообщения об ошибке в поле input
   *
   * @param {object} inputElement - поле input
   */
  _showInputError(inputElement) {
    // находим элемент span, где выводится ошибка (суффикс -error)
    const errorElement = this._formElem.querySelector(`.${inputElement.id}-error`);
    // оформляем поле input как содержащее ошибку ввода
    inputElement.classList.add(this._inputErrorClass);
    // оформляем элемент, информирующий об ошибке
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(this._errorClass);
  }

  /** Функция для скрытия сообщения об ошибке в поле input
   *
   * @param {object} inputElement - поле input
   */
  _hideInputError(inputElement) {
    // находим элемент span, где выводится ошибка (суффикс -error)
    const errorElement = this._formElem.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  }

  /** Функция проверяет поле на валидность
   *
   */
  _checkInputValidity(inputElement) {
    // если поле не валидно, то показываем ошибку
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    }
    // иначе - причем ошибки
    else {
      this._hideInputError(inputElement);
    }
  }

  /** Устанавливаем слушатели
   *
   */
  _setEventListeners() {
    // до начала ввода данных в форме актуализируем кнопку submit
    this._toggleButtonState();

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        // актуализируем кнопку submit
        this._toggleButtonState();
      });
    });
  }


  /** Метод, который очищает поля формы от ошибок и акутализирует статус кнопки submit
   *
   *
   */
  clearFormInputError() {

    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });

    this._toggleButtonState();
  }

  /** Функция включает валидацию формы
   *
   */
  enableValidation() {
    this._setEventListeners ();
  }
}

