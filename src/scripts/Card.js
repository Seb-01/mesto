//import {showPopup} from './index.js';

/** Класс Card, который создаёт карточку с текстом и ссылкой на изображение
 *
 */
export class Card {
  // в конструкторе будут динамические данные,
  // для каждого экземпляра свои: карточка с текстом, с ссылкой на изображение и селектор её template-элемента;
  constructor(owner, text, image, likes, templateSelector, popupElem, handleCardClick, handleCardDelete) {
    // приватные поля, они нужны только внутри класса
    this._text = text;
    this._image = image;
    this._likes = likes; // массив лайков карточки
    this._templateSelector = templateSelector;
    this._popupElem = popupElem;
    this._handleCardClick = handleCardClick;
    this._handleCardDelete = handleCardDelete;
    this._owner = owner;
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

    if (this._handleCardDelete()) {
    this._element.remove();
    // После удаления this._element лучше зануллить
    this._element = null;
    }
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
    //обработчик в конструкторе получили
    this._element.querySelector('.elements__photo').addEventListener('click', this._handleCardClick);
  }

  /**  Функция, которая подготавливает карточку на основе шаблона
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
    this._element.querySelector('.elements__likes-number').textContent = this._likes.length;

    //иконка trash


    // Выставляем слушатели
    this._setEventListeners();

    // возвращаем готовую карточку
    return this._element;
  }

}

