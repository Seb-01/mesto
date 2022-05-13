import {Popup} from './Popup.js';

/** Класс PopupWithConfirmation, который отвечает за открытие и закрытие попапа c формой
 *
 */
export class PopupWithConfirmation extends Popup {
  constructor(popupSelector, handleSubmit) {
    super(popupSelector);
    // обработчик submit
    this._handleSubmit = handleSubmit;

    // собственно форма
    // возможно, селектор формы также следует передавать в конструкторе!
    this._form = this._popup.querySelector('.popup__form');
 }

 /** Метод не только добавляет обработчик клика иконке закрытия, но и обработчик сабмита формы
  *
  */
 setEventListeners() {

  this._popup.addEventListener('submit', (evt) => {
    evt.preventDefault();
    this._handleSubmit();
   });

  super.setEventListeners();
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
