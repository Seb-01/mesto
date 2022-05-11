import {cohort} from '../scripts/constants.js';
import {token} from '../scripts/constants.js';
import { getFetchResult } from '../scripts/auxfunc.js';
import { checkId } from '../scripts/auxfunc.js';

/** Класс Card, который создаёт карточку с текстом и ссылкой на изображение
 *
 */
export class Card {
  // в конструкторе будут динамические данные,
  // для каждого экземпляра свои: карточка с текстом, с ссылкой на изображение и селектор её template-элемента;
  constructor(isTrash, userId, id, text, image, likes, templateSelector, popupElem, handleCardClick, handleCardDelete) {
    // приватные поля, они нужны только внутри класса
    this._text = text;
    this._image = image;
    this._likes = likes; // массив лайков карточки
    this._templateSelector = templateSelector;
    this._popupElem = popupElem;
    this._handleCardClick = handleCardClick;
    this._handleCardDelete = handleCardDelete;
    this._isTrash = isTrash;
    this._id = id; // id пользователя, который добавил карточку
    this._userId = userId; // id пользователя из профиля
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
    // если карточку уже лайкнули - то удаляем лайк:
    if(evt.target.classList.contains('elements__like-button_active')) {
      getFetchResult(`https://mesto.nomoreparties.co/v1/${cohort}/cards/${this._id}/likes`,
        { method: "DELETE",
          headers: {
            authorization: token
          }
        },
        // сall-back, который будет вызван, как только данные будут готовы!
        (result) => {
          // уменьшаем количество лайков
          this._element.querySelector('.elements__likes-number').textContent = result.likes.length;
          evt.target.classList.toggle('elements__like-button_active');

        },
        // сall-back, который будет вызван в случае ошибки!
        (err) => {
          console.log(`Ошибка при dislike карточки: ${err}!`);
        }
      );
    }
    else {

      // лайкаем карточку:
      getFetchResult(`https://mesto.nomoreparties.co/v1/${cohort}/cards/${this._id}/likes`,
        { method: "PUT",
          headers: {
            authorization: token
          }
        },
        // сall-back, который будет вызван, как только данные будут готовы!
        (result) => {
          // уменьшаем количество лайков
          this._element.querySelector('.elements__likes-number').textContent = result.likes.length;
          evt.target.classList.toggle('elements__like-button_active');

        },
        // сall-back, который будет вызван в случае ошибки!
        (err) => {
          console.log(`Ошибка при like карточки: ${err}!`);
        }
      );
    }

  }

  /** Функция - обработчик клика на кнопке trash
   * @param {object} evt - событие
   */
  _deleteCard(evt) {
      // передаем данные элемента на обработку
      this._handleCardDelete({card: this._element, cardId: this._id});
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

