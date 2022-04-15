/** Раздел импорта */
import {Card} from './card.js';
import {FormValidator} from './FormValidator.js';
import {Section} from './Section.js';

/** Раздел объявления функций: */

/** Функция поднять popup
 * @param {object} popupElem - элемент popup
 */
 export function showPopup(popupElem) {
  popupElem.classList.add('popup_opened');
  // добавялем обработчики закрытия по Esc и клику мыши на overlay
  document.addEventListener('keydown', closePopupByKeydownEsc);
}

/** Функция закрыть popup
 * @param {object} popupElem - элемент
 */
 function closePopup(popupElem) {
   // Закрываем popup
  popupElem.classList.remove('popup_opened');
  // убираем обработчик Esc
  document.removeEventListener('keydown', closePopupByKeydownEsc);
}

/** Функция - обработчик нажатия Esc-клавиши
 * @param {object} evt - событие
 */
 function closePopupByKeydownEsc(evt) {
  // если нажали Esc - закрываем popup
  if(evt.key === 'Escape') {
    // какой попап открыт?
    closePopup(document.querySelector('.popup_opened'));
  }
}

/** Функция, которая закрывает окошко по клику на затемненную область.
 * @param {object} event - событие
 */
 const closePopupByClickOnOverlay = function(event) {
  // какой попап открыт?
  const popupOpen = document.querySelector('.popup_opened');

  const buttonClose = popupOpen.querySelector('.popup__close-button');

  if (event.target !== event.currentTarget && event.target !== buttonClose) {
    return;
  }
  closePopup(popupOpen);
}

/** Функция для создания новой карточки
 *
 * @param {string} newName
 * @param {string} newLink
 * @param {string} cardTemplate
 * @param {object} imagePopup
 */
function createCard(newName, newLink, cardTemplate, imagePopup) {
  // создаем экземпляр карточки
  const cardItem = new Card(newName, newLink, cardTemplate, imagePopup);
  return cardItem.prepareCard();
}

/** Функция для вставки карточки в DOM
 *
 * @param {object} cardElem
 */
 function insertCard(cardElem) {
  //рендерим карточку
  elemContainer.prepend(cardElem);
}

/** Функция для рендеринга карточек при загрузке страницы
 *
 */
//  function loadInitialCards() {
//    initialCards.forEach((card) => {
//      // создаем экземпляр карточки и вставляем в DOM
//      insertCard(createCard(card.name, card.link, '#card-template', imagePopup));
//   });
// }



/** Функция рендеринга новой карточки
 * @param {object} evt - событие
 */
function saveNewItem(evt) {
  /** Эта строчка отменяет стандартную отправку формы, т.к. мы можем определить свою логику отправки */
  evt.preventDefault();

  //создаем карточку
  const card = new Card(mestoNameInput.value, mestoLinkInput.value, '#card-template', imagePopup);
  // подготовка карточки и добавление его в контейнер
  cardsList.addItem(card.prepareCard());

  closePopup(popupAddItem);
}

/** Функция открытия формы редактирования профиля
 * @param {object} profileEditFormValidator - экземпляр валидатора
 */
function showEditProfileForm(profileEditFormValidator) {
  /** При открытии формы поля «Имя» и «О себе» должны быть заполнены теми значениями,
  которые отображаются на странице */

  nameInput.value = title.textContent;
  jobInput.value =subtitle.textContent;

  /** поднимаем попап */
  showPopup(popupEditProfile);

  // убираем ошибки полей ввода формы и актуализируем состояние кнопки submit
  profileEditFormValidator.clearFormInputError();

}

/** Функция открытия формы редактирования профиля
 * @param {object} itemAddFormValidator - экземпляр валидатора
 */
function showAddItemForm(itemAddFormValidator) {

  // очистим поля от предыдущей "работы"
  itemAddForm.reset();

  /** поднимаем попап */
  showPopup(popupAddItem);

  // убираем ошибки полей ввода формы и актуализируем состояние кнопки submit
  itemAddFormValidator.clearFormInputError();

}

/** Функция обновления инфо в профиле
 * @param {object} evt - событие
 */
function saveProfile(evt) {
  /** Эта строчка отменяет стандартную отправку формы, т.к. мы можем определить свою логику отправки. */
  evt.preventDefault();

  /** Вставьте новые значения с помощью textContent */
  title.textContent=nameInput.value;
  subtitle.textContent=jobInput.value;

  closePopup(popupEditProfile);
}

// Работаем:
// При загрузке на странице должно быть 6 карточек
// создаем экземпляр класса Section, который отвечает за отрисовку элементов на странице
const cardsList = new Section({data: initialCards, renderer: ({name: newName, link: newLink}) => {
    //создаем карточку
    // constructor(text, image, templateSelector, popupElem)
    const imagePopup = document.querySelector('.popup_target_picture-view');
    const card = new Card(newName, newLink, '#card-template', imagePopup);
    // подготовка карточки и добавление его в контейнер
    cardsList.addItem(card.prepareCard());
  }
}, '.elements');

// отрисовываем карточки при начальной загрузке страницы
cardsList.renderItems();


//Создаем экземпляр класса FormValidator для profileEditForm
const profileEditFormValidator = new FormValidator(enableValidationSettings, profileEditForm);
profileEditFormValidator.enableValidation();

//Создаем экземпляр класса FormValidator для itemAddForm
const itemAddFormValidator = new FormValidator(enableValidationSettings, itemAddForm);
itemAddFormValidator.enableValidation();

/** назначаем событие - редактируем профиль */
profileEditButton.addEventListener('click', () => { showEditProfileForm(profileEditFormValidator); });
/** назначаем событие - добавляем карточку */
itemAddButton.addEventListener('click', () => { showAddItemForm(itemAddFormValidator); });

/** обработчик submit в формах */
profileEditForm.addEventListener('submit', saveProfile);
itemAddForm.addEventListener('submit', saveNewItem);

/** добавялем обработчик закрытия popup по клику мыши на overlay */
imagePopup.addEventListener('mousedown', closePopupByClickOnOverlay);
popupAddItem.addEventListener('mousedown', closePopupByClickOnOverlay);
popupEditProfile.addEventListener('mousedown', closePopupByClickOnOverlay);
