import { checkId } from '../scripts/auxfunc.js';

/** Класс Card, который создаёт карточку с текстом и ссылкой на изображение
 *
 */
export class Card {
  // в конструкторе будут динамические данные,
  // для каждого экземпляра свои: карточка с текстом, с ссылкой на изображение и селектор её template-элемента;
  constructor(isTrash, userId, ownerId, id, text, image, likes, templateSelector, popupElem,
    handleCardClick, handleCardDelete, handleCardLike) {
    // приватные поля, они нужны только внутри класса
    this._text = text;
    this._image = image;
    this._likes = likes; // массив лайков карточки
    this._templateSelector = templateSelector;
    this._popupElem = popupElem;
    this._handleCardClick = handleCardClick;
    this._handleCardDelete = handleCardDelete;
    this._handleCardLike = handleCardLike;
    this._isTrash = isTrash;
    this._id = id; // id карточки
    this._userId = userId; // id пользователя из профиля
    this._ownerId = ownerId; //id пользователя, который добавил карточку
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
    this._handleCardLike({cardElem: this._element, cardId: this._id});
  }

  /** Функция - обработчик клика на кнопке trash
   * @param {object} evt - событие
   */
  _deleteCard(evt) {
      // передаем данные элемента на обработку
      this._handleCardDelete({cardElem: this._element, cardId: this._id});
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

    // иконка trash
    if (!this._isTrash)
      this._element.querySelector('.elements__trash-button').style.display = "none";

    // цвет сердечка: если id есть в likes, то добавляем elements__like-button_active
    if (checkId(this._likes, this._userId))
      this._element.querySelector('.elements__like-button').classList.add('elements__like-button_active');


    // Выставляем слушатели
    this._setEventListeners();

    // возвращаем готовую карточку
    return this._element;
  }

}

