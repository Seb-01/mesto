import {Popup} from './Popup.js';



/** Класс PopupWithForm, который отвечает за открытие и закрытие попапа c формой
 *
 */
export class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmit) {
    super(popupSelector);
    // обработчик submit
    this._handleSubmit = handleSubmit;
 }

 /** Приватный метод, который собирает данные всех полей формы
  *
  */
 _getInputValues() {
    // список input-полей формы, которую "поднимает" popup
    // возможно, селектор input-полей также следует передавать в конструкторе!
    this._inputList = this._popup.querySelectorAll('.popup__input');

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
    this._handleSubmit(this._getInputValues());
    //this.close();
  });

  super.setEventListeners();
 }

 /** Перезаписывает родительский метод close, так как при закрытии попапа форма должна ещё и сбрасываться
  *
  */
 close() {
  //нужно очистить поля формы перед закрытием
  // возможно, селектор формы также следует передавать в конструкторе!
  this._popup.querySelector('.popup__form').reset();

  super.close();
 }

}
