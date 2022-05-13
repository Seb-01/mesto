
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

 /** В методе open класса PopupWithImage нужно вставлять в попап картинку с src изображения и подписью к картинке
  *
  */
 open(cardText, cardImage) {

    // сообщаем popup данные картинки, которую поднимаем
    this._pictureElem.src = cardImage;
    this._pictureElem.alt = cardText;
    this._captionElem.textContent = cardText;

    super.open()

 }
}
