import {Popup} from './Popup.js';


/** Класс PopupWithImage, который отвечает за открытие и закрытие попапа c картинкой
 *
 */
 export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);

 }

 /** В методе open класса PopupWithImage нужно вставлять в попап картинку с src изображения и подписью к картинке
  *
  */
 open(newName, newLink) {
    this._pictureElem = this._popup.querySelector('.popup__picture');
    this._captionElem = this._popup.querySelector('.popup__figure-caption');

    this._pictureElem.src = newLink;
    this._pictureElem.alt = newName;
    this._captionElem.textContent = newName;

    super.open()
 }
}
