import {Popup} from './Popup.js';

/** Класс PopupWithForm, который отвечает за открытие и закрытие попапа c формой
 *
 */
export class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmit) {
    super(popupSelector);
    // обработчик submit
    this._handleSubmit = handleSubmit;

    // список input-полей формы, которую "поднимает" popup
    // возможно, селектор input-полей также следует передавать в конструкторе!
    this._inputList = this._popup.querySelectorAll('.popup__input');
    // собственно форма
    // возможно, селектор формы также следует передавать в конструкторе!
    this._form = this._popup.querySelector('.popup__form');
    // кнопка submit
    this._submitButton = document.querySelector(popupSelector).querySelector('.popup__save-button');
    // надпись на кнопке submit
    this._submitButtonText = this._submitButton.textContent;
 }

 /** Приватный метод, который собирает данные всех полей формы
  *
  */
 _getInputValues() {
    // создаём пустой объект
    this._formValues = {};

    // добавляем в этот объект значения всех полей
    this._inputList.forEach(input => {
      // Ключами этого объекта будут атрибуты name каждого поля
      this._formValues[input.name] = input.value;
    });

    // возвращаем объект значений
    return this._formValues;
 }

 /** Метод не только добавляет обработчик клика иконке закрытия, но и обработчик сабмита формы
  *
  */
 setEventListeners() {

  this._popup.addEventListener('submit', (evt) => {
    evt.preventDefault();

    // меняем текст кнопки submit
    this.renderLoading(true);

    this._handleSubmit(this._getInputValues())
    .then(() => this.close()) // закрывается попап в `then`
    .finally(() => this.renderLoading(false)); //возвращаем текст кнопке

  });

  super.setEventListeners();
 }

 /** Метод, который будет вставлять данные в инпуты
  *
  */
 setInputValues(data) {
  this._inputList.forEach((input) => {
    // тут вставляем в `value` инпута данные из объекта по атрибуту `name` этого инпута
    input.value = data[input.name];
  });
}


 /** Перезаписывает родительский метод close, так как при закрытии попапа форма должна ещё и сбрасываться
  *
  */
 close() {
  //нужно очистить поля формы перед закрытием
  this._form.reset();

  super.close();
  }

 /** Метод, который менят текст submit кнопки формы на время запроса данных
  *
  * @param {*} isLoading
  * @param {*} buttonText
  */
 renderLoading(isLoading, buttonText='Сохранение...') {
  if(isLoading)
    this._submitButton.textContent = buttonText;
  else
    this._submitButton.textContent = this._submitButtonText;
  }

}
