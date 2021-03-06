/** Класс Popup, который отвечает за открытие и закрытие попапа
 *
 */
 export class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);

    // получаем иконку закрытия popup
    this._buttonClose = this._popup.querySelector('.popup__close-button');
  }


 /** Публичный метод, который отвечает за открытие popup
  *
  */
 open() {
  this._popup.classList.add('popup_opened');
  // добавялем обработчики закрытия по Esc. Заботимся о контексте
  // клик мыши на overlay мы добавляем один раз (!) при создании popup
  document.addEventListener('keydown', this._handleEscClose);
 }

 /** Публичный метод, который отвечает за закрытие popup
  *
  */
 close() {
  // Закрываем popup
  this._popup.classList.remove('popup_opened');
  // убираем обработчик Esc. Заботимся о контексте
  document.removeEventListener('keydown', this._handleEscClose);
 }

 /** Приватный метод, который содержит логику закрытия попапа клавишей Esc
  *
  */
 _handleEscClose(evt) {
  // если нажали Esc - закрываем popup
  if(evt.key === 'Escape') {
    this.close();
  }
}

 /** Публичный метод, который добавляет слушатель клика иконке закрытия попапа
  *
  */
 setEventListeners() {

  this._popup.addEventListener('mousedown', (event) => {
    if (event.target !== event.currentTarget && event.target !== this._buttonClose) {
      return;
    }
    else
      this.close();
    }
    );
  }
}
