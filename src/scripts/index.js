// Раздел импорта
// для webpack в точке входа нужно указать главный css файл
// и подключить все остальные js
import '../pages/index.css';
import {initialCards} from './constants.js';
import {enableValidationSettings} from './constants.js';
import {userInfoSettings} from './constants.js';
import {profileEditForm} from './constants.js';
import {itemAddForm} from './constants.js';
import {profileEditButton} from './constants.js';
import {itemAddButton} from './constants.js';
import {nameInput} from './constants.js';
import {jobInput} from './constants.js';


import {Card} from './card.js';
import {FormValidator} from './FormValidator.js';
import {Section} from './Section.js';
import { PopupWithImage } from './PopupWithImage.js';
import { PopupWithForm } from './PopupWithForm.js';
import { UserInfo } from './UserInfo.js';

// Раздел объявления функций:

/** Функция для создания карточки
 *
 */
 function createCard(newName, newLink, cardTemplate, imagePopup) {
  //создаем карточку:
  const card = new Card(newName, newLink, cardTemplate, imagePopup,
    //эта функция-обработчик должна открывать попап с картинкой при клике на карточку
    () => {
      // передаем в popup данные поднимаемой карточки
      card._popupElem.setCardData(card._text, card._image);
      card._popupElem.open();
    }
  );

  // подготовка карточки и добавление его в контейнер
  cardsList.addItem(card.prepareCard());
}

/** Функция открытия формы редактирования профиля
 * @param {object} profileEditFormValidator - экземпляр валидатора
 */
function showEditProfileForm(profileEditFormValidator) {
  // данные пользователя подставляем в форму при открытии
  const userInfo = user.getUserInfo();
  nameInput.value = userInfo.user_name;
  jobInput.value = userInfo.about_self;

  // поднимаем popup
  profileFormPopup.open();

  // убираем ошибки полей ввода формы и актуализируем состояние кнопки submit
  profileEditFormValidator.clearFormInputError();
}

/** Функция открытия формы добавления новой карточки
 * @param {object} itemAddFormValidator - экземпляр валидатора
 */
function showAddItemForm(itemAddFormValidator) {
  // поднимаем popup
  addItemFormPopup.open();

  // убираем ошибки полей ввода формы и актуализируем состояние кнопки submit
  itemAddFormValidator.clearFormInputError();
}


// Работаем:
const user = new UserInfo(userInfoSettings);

// Создаем popup для отображения карточки:
const imagePopup = new PopupWithImage('.popup_target_picture-view');
imagePopup.setEventListeners();

// создаем экземпляр класса PopupWithForm для редактирования профиля
const profileFormPopup = new PopupWithForm('.popup_target_profile',
  //вторым параметром передаем колбэк сабмита формы, т.к. нужно учесть логику формы
  (formData) => {
    // сохраняем новые значения user
    user.setUserInfo({user_name: formData.name, about_self: formData.job});
  });
// устанавливаем слушатели
profileFormPopup.setEventListeners();

// создаем экземпляр класса PopupWithForm для добавления карточки
const addItemFormPopup = new PopupWithForm('.popup_target_add-item',
  //вторым параметром передаем колбэк сабмита формы, т.к. нужно учесть логику формы
  (formData) => {
    createCard(formData.name, formData.link, '#card-template', imagePopup);
  });
// устанавливаем слушатели
addItemFormPopup.setEventListeners();


// Создаем экземпляр класса FormValidator для profileEditForm
const profileEditFormValidator = new FormValidator(enableValidationSettings, profileEditForm);
profileEditFormValidator.enableValidation();

// Создаем экземпляр класса FormValidator для itemAddForm
const itemAddFormValidator = new FormValidator(enableValidationSettings, itemAddForm);
itemAddFormValidator.enableValidation();

// назначаем событие - нажали на копку "Редактировать профиль"
profileEditButton.addEventListener('click', () => { showEditProfileForm(profileEditFormValidator); });

// назначаем событие - нажали на кнопку "Добавить карточку"
itemAddButton.addEventListener('click', () => { showAddItemForm(itemAddFormValidator); });

// создаем экземпляр класса Section, который отвечает за отрисовку элементов на странице
const cardsList = new Section({data: initialCards, renderer:
  ({name: newName, link: newLink}) => {
    createCard(newName, newLink, '#card-template', imagePopup);
  }
}, '.elements');

// отрисовываем карточки при начальной загрузке страницы
cardsList.renderItems();
