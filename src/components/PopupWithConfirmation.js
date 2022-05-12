import {Popup} from './Popup.js';

/** Класс PopupWithConfirmation, который отвечает за открытие и закрытие попапа c формой
 *
 */
export class PopupWithConfirmation extends Popup {
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
  this._form.reset();

  super.close();
 }

 /** Удаляет карточку
  *
  */
  deleteCard() {
    // удалим элемент из DOM
    this._cardElem.remove();
    // после удаления element лучше занулить
    this._cardElem = null;
  }

  /** Получаем элемент и id карточки, удаление которой подтверждаем
  * @param {object} cardElem
  * @param {object} cardId
  */
  setCardData(cardElem, cardId) {
    this._cardElem = cardElem;
    this._cardId = cardId;
  }

  /** Функция для возврата id карточки
   *
  */
  getCardId() {
    return this._cardId;
  }

}
