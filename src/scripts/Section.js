/** Класс Section, который отвечает за отрисовку элементов на странице
 *
 */
 export class Section {
  constructor({ data, renderer }, containerSelector) {
    this._renderedItems = data; //свойство = массив данных, которые нужно добавить на страницу при инициализации класса
    this._renderer = renderer; // Свойство = функция, которая отвечает за создание и отрисовку данных на странице
    this._container = document.querySelector(containerSelector);
 }


 /** Публичный метод, который отвечает за отрисовку всех элементов
  *
  */
 renderItems() {
  this._renderedItems.forEach(item => this._renderer(item))

 }

 /** Публичный метод, который принимает DOM-элемент и добавляет его в контейнер
  *
  */
 addItem(element) {
  this._container.prepend(element);
 }
}
