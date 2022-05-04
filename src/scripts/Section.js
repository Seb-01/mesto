import {cohort} from '../scripts/constants.js';
import {token} from '../scripts/constants.js';
import { getFetchResult } from '../scripts/auxfunc.js';

/** Класс Section, который отвечает за отрисовку элементов на странице
 *
 */
 export class Section {
  constructor({ renderer }, containerSelector) {
    //this._renderedItems = data; //свойство = массив данных, которые нужно добавить на страницу при инициализации класса
    this._renderer = renderer; // Свойство = функция, которая отвечает за создание и отрисовку данных на странице
    this._container = document.querySelector(containerSelector);
 }


 /** Публичный метод, который отвечает за отрисовку всех начальных элементов при загрузке страницы
  *
  */
 renderItems() {
  // запрос к серверу
  getFetchResult(`https://mesto.nomoreparties.co/v1/${cohort}/cards`,
    { method: "GET",
      headers: {
        authorization: token
        }
    },
    // сall-back, который будет вызван, как только данные будут готовы!
    (result) => {
      this._renderedItems = Array.from(result);
      this._renderedItems.forEach(item => this._renderer(item));
    },
    // сall-back, который будет вызван в случае ошибки!
    (err) => {
    }
  );
 }

 /** Публичный метод, который принимает DOM-элемент и добавляет его в контейнер
  *
  */
 addItem(element) {
  this._container.prepend(element);
 }
}
