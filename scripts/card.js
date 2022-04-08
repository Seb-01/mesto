import {showPopup} from './index.js';

/** Класс Card, который создаёт карточку с текстом и ссылкой на изображение
 *
 */
export class Card {
  // в конструкторе будут динамические данные,
  // для каждого экземпляра свои: карточка с текстом, с ссылкой на изображение и селектор её template-элемента;
  constructor(text, image, templateSelector, popupElem) {
    // приватные поля, они нужны только внутри класса
    this._text = text;
    this._image = image;
    this._templateSelector = templateSelector;
    this._popupElem = popupElem;

    this._pictureElem = popupElem.querySelector('.popup__picture');
    this._captionElem = popupElem.querySelector('.popup__figure-caption');
  }

  /** Функция, которая вернет разметку для карточки
   *
   */
  _getTemplate() {
    // забираем разметку из HTML и клонируем элемент
    const cardElement = document
    .querySelector(this._templateSelector)
    .content
    // Почему мы селектор карточки также не передаем в конструкторе?
    .querySelector('.elements__card')
    .cloneNode(true);

    // вернём DOM-элемент карточки
    return cardElement;
  }

  /** Функция - обработчик клика на кнопке Like
   * @param {object} evt - событие
   */
  _likeCard(evt) {
    evt.target.classList.toggle('elements__like-button_active');
  }

  /** Функция - обработчик клика на кнопке trash
   * @param {object} evt - событие
   */
  _deleteCard(evt) {
    this._element.remove();
  }


  /** Функция - обработчик клика на изображении карточки
   *
   */
  _showPicture(cardData, popupElem) {
    // заполняем данные в input полях
    this._pictureElem.src = cardData.src;
    this._pictureElem.alt = cardData.name;
    this._captionElem.textContent = cardData.name;

    //поднимаем popup
    showPopup(popupElem);
  }

  /** Функция, которая навешивает слушатели
   *
   */
  _setEventListeners() {
    // кнопка Like
    this._element.querySelector('.elements__like-button').addEventListener('click', (evt) => {
      this._likeCard(evt);
    })

    // кнопка trash
    this._element.querySelector('.elements__trash-button').addEventListener('click', (evt) => {
      this._deleteCard(evt);
    })

    // клик на изображении карточки
    this._element.querySelector('.elements__photo').addEventListener('click', () => {
      this._showPicture({src: this._image, name: this._text}, this._popupElem);
    })

  }
  /**  Функция, которая готовит и публикует карточку в DOM
   *
   */
  prepareCard() {
    // Запишем разметку в приватное поле _element. У других элементов появится доступ к ней.
    this._element = this._getTemplate();
    const photoElem = this._element.querySelector('.elements__photo');

    // Добавим данные
    photoElem.src = this._image;
    photoElem.alt = this._text;
    this._element.querySelector('.elements__title').textContent = this._text;

    // Выставляем слушатели
    this._setEventListeners();

    // возвращаем готовую карточку
    return this._element;
  }

}

