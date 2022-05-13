/** Класс Section, который отвечает за отрисовку элементов на странице
 *
 */
 export class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer; // Свойство = функция, которая отвечает за создание и отрисовку данных на странице
    this._container = document.querySelector(containerSelector);
 }

/** Публичный метод, который получает массив начальных элементов при загрузке страницы
  *
  */
 setCardItems(arr) {
  this._renderedItems = Array.from(arr);
 }


 /** Публичный метод, который отвечает за отрисовку всех начальных элементов при загрузке страницы
  *
  */
 renderItems() {
    this._renderedItems.forEach(item => this.addItem(item));
 }

 /** Публичный метод, создает DOM-элемент и добавляет его в контейнер
  *
  * @param {object} element - новая карточка
  */
 addItem(item) {
  const card = this._renderer(item);
  this._container.prepend(card);
 }

}


