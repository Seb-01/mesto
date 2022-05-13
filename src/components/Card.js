/** Класс Card, который создаёт карточку с текстом и ссылкой на изображение
 *
 */
export class Card {
  // в конструкторе будут динамические данные,
  // для каждого экземпляра свои: карточка с текстом, с ссылкой на изображение и селектор её template-элемента;
  constructor(isTrash, userId, ownerId, id, text, image, likes, templateSelector, popupElem,
    handleCardDelete, handleCardLike) {
    // приватные поля, они нужны только внутри класса
    this._text = text;
    this._image = image;
    this._likes = likes; // массив лайков карточки
    this._templateSelector = templateSelector;
    this._popupElem = popupElem;
    this._handleCardClick = this._handleCardClick.bind(this);

    this._handleCardDelete = handleCardDelete;
    this._handleCardLike = handleCardLike;
    this._isTrash = isTrash;
    this._id = id; // id карточки
    this._userId = userId; // id пользователя из профиля
    this._ownerId = ownerId; //id пользователя, который добавил карточку

    // Запишем разметку в приватное поле _element. У других элементов появится доступ к ней.
    this._element = this._getTemplate();
    // кнопка like
    this._likeButton = this._element.querySelector('.elements__like-button');
    // кнопка удалить
    this._trashButton = this._element.querySelector('.elements__trash-button');
    // изображение карточки
    this._cardImage = this._element.querySelector('.elements__photo');
    // элемент, содержащий количество лайков
    this._likeNumberElem = this._element.querySelector('.elements__likes-number');

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
    this._handleCardLike(this._id);
  }

  /** Функция - обновляет кол-вл лайков
   * @param {object} numLikes - количество лайков
   */
  updateLike(numLikes) {
    this._likeNumberElem.textContent = numLikes;
    this._likeButton.classList.toggle('elements__like-button_active');
  }

  /** Функция проверяет элемент лайк на цвет: нажат?
   *
   */
   isLike() {
    if (this._likeButton.classList.contains('elements__like-button_active'))
      return true;
    return false;
  }

  /** Функция - обработчик клика на кнопке trash
   * @param {object} evt - событие
   */
  _deleteCard(evt) {
    // передаем данные элемента на обработку
    this._handleCardDelete({cardElem: this._element, cardId: this._id});
  }


  /** Функция - обработчик клика на изображении карточки
   * @param {object} evt - событие
   */
  _handleCardClick(evt) {
    // передаем в popup данные поднимаемой карточки
     this._popupElem.open(this._text, this._image);
  }

  /** Функция, которая навешивает слушатели
   *
   */
  _setEventListeners() {
    // кнопка Like
    this._likeButton.addEventListener('click', (evt) => {
      this._likeCard(evt);
    })

    // кнопка trash
    this._trashButton.addEventListener('click', (evt) => {
      this._deleteCard(evt);
    })

    // клик на изображении карточки (обработчик в конструкторе получили!)
    this._cardImage.addEventListener('click', this._handleCardClick);
  }

  /**  Функция, которая подготавливает карточку на основе шаблона
   *
   */
  prepareCard() {
    // Добавим данные
    this._cardImage.src = this._image;
    this._cardImage.alt = this._text;
    this._element.querySelector('.elements__title').textContent = this._text;
    this._likeNumberElem.textContent = this._likes.length;

    // иконка trash
    if (!this._isTrash)
      this._trashButton.style.display = "none";

    // цвет сердечка: если id есть в likes, то добавляем elements__like-button_active
    if (this._checkId(this._likes, this._userId))
      this._likeButton.classList.add('elements__like-button_active');

    // Выставляем слушатели
    this._setEventListeners();

    // Готово: возвращаем готовую карточку!
    return this._element;
  }

  /** Приватная функция для проверки наличия в массиве объекта с заданным свойством _id
   *
   * @param {string} arr - массив
   * @param {object} targerId - искомый id
   */
  _checkId(arr, targerId) {
    // идем по массиву
    for (let index = 0; index < arr.length; ++index) {
      if (arr[index]._id === targerId)
        // как только нашли совпадение - выходим с возвратом true
        return true;
    };

  return false;
  }

  /** Функция для возврата id карточки
   *
   */
  getCardId() {
    return this._id;
  }

  /** Функция для возврата элемента карточки
   *
   */
  getCardElem() {
    return this._element;
  }

}

