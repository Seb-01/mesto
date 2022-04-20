
import {Popup} from './Popup.js';

/** Класс PopupWithImage, который отвечает за открытие и закрытие попапа c картинкой
 *
 */
 export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);

    this._pictureElem = this._popup.querySelector('.popup__picture');
    this._captionElem = this._popup.querySelector('.popup__figure-caption');

 }

 /** Метод для установки данных, поднимаемой карточки
  *
  * @param {string} cardText
  * @param {string} cardImage
  */
 setCardData(cardText, cardImage) {
  this._cardText = cardText;
  this._cardImage = cardImage;
 }

 /** В методе open класса PopupWithImage нужно вставлять в попап картинку с src изображения и подписью к картинке
  *
  */
 open() {

    //
    this._pictureElem.src = this._cardImage;
    this._pictureElem.alt = this._cardText;
    this._captionElem.textContent = this._cardText;

    super.open()

 }
}
