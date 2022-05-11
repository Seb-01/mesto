// Раздел импорта
// для webpack в точке входа нужно указать главный css файл
// и подключить все остальные js
import './index.css';

import {enableValidationSettings} from '../scripts/constants.js';

import {profileEditForm} from '../scripts/constants.js';
import {avatarEditForm} from '../scripts/constants.js';
import {itemAddForm} from '../scripts/constants.js';
import {profileEditButton} from '../scripts/constants.js';
import {avatarEditButton} from '../scripts/constants.js';
import {itemAddButton} from '../scripts/constants.js';
import {nameInput} from '../scripts/constants.js';
import {jobInput} from '../scripts/constants.js';


import { Card } from '../scripts/Card.js';
import { FormValidator } from '../scripts/FormValidator.js';
import { Section } from '../scripts/Section.js';
import { PopupWithImage } from '../scripts/PopupWithImage.js';
import { PopupWithForm } from '../scripts/PopupWithForm.js';
import { UserInfo } from '../scripts/UserInfo.js';

import {cohort} from '../scripts/constants.js';
import {token} from '../scripts/constants.js';
import { Api } from '../scripts/Api.js';


// Раздел объявления функций:

/** Функция для создания карточки
 *
 */
 function createCard(userId, ownerId, newId, newName, newLink, newlikes, cardTemplate, imagePopup) {

  // здесь решаем: будет ли корзина на карточке или нет
  let isTrash = false;
  if (ownerId === userId)
    isTrash = true;

  //создаем карточку:
  const card = new Card(isTrash, userId, ownerId, newId, newName, newLink, newlikes, cardTemplate, imagePopup,
    //эта функция-обработчик должна открывать попап с картинкой при клике на карточку
    () => {
      // передаем в popup данные поднимаемой карточки
      card._popupElem.setCardData(card._text, card._image);
      card._popupElem.open();
    },
    // функция подтверждения удаления карточки
    ({cardElem, cardId}) => {
      // привязываем в свойства карточку, на которой нажали кнопку удалить
      confirmFormPopup.cardElem = cardElem;
      confirmFormPopup.cardId = cardId;
      confirmFormPopup.open();
    },
    //
    ({cardElem, cardId}) => {
      const likeButtonElem = cardElem.querySelector('.elements__like-button');
      const likeNumberElem = cardElem.querySelector('.elements__likes-number');

      // если карточку уже лайкали
      if(likeButtonElem.classList.contains('elements__like-button_active')) {
        api.deleteLike(cardId)
          // сall-back, который будет вызван, как только данные будут готовы!
          .then((result) => {
            // уменьшаем количество лайков
            likeNumberElem.textContent = result.likes.length;
            likeButtonElem.classList.toggle('elements__like-button_active');

          })
          .catch((err) => {
            console.log(`Ошибка при dislike карточки: ${err}!`);
          }
        );
      }
      else {
        // лайкаем карточку:
        api.likeCard(cardId)
        // сall-back, который будет вызван, как только данные будут готовы!
        .then((result) => {
          // увеличиваем количество лайков
          likeNumberElem.textContent = result.likes.length;
          likeButtonElem.classList.toggle('elements__like-button_active');

        })
        // сall-back, который будет вызван в случае ошибки!
        .catch((err) => {
          console.log(`Ошибка при like карточки: ${err}!`);
        }
    );

      }
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

/** Функция обновления аватара
 * @param {object} avatarEditFormValidator - экземпляр валидатора
 */
 function showEditAvatarForm(avatarEditFormValidator) {
  // поднимаем popup
  editAvatarFormPopup.open();

  // убираем ошибки полей ввода формы и актуализируем состояние кнопки submit
  avatarEditFormValidator.clearFormInputError();
}

// Работаем:

// создаем класс для взаимодействия с сервером Mesto
const api = new Api({
  baseUrl: `https://mesto.nomoreparties.co/v1/${cohort}`,
  headers: {
    authorization: token
  }
});

// создаем профиль пользователя
const user = new UserInfo('.profile__avatar');

// Создаем popup для отображения карточки:
const imagePopup = new PopupWithImage('.popup_target_picture-view');
imagePopup.setEventListeners();

// создаем экземпляр класса PopupWithForm для редактирования профиля
const profileFormPopup = new PopupWithForm('.popup_target_profile',
  //вторым параметром передаем колбэк сабмита формы, т.к. нужно учесть логику формы
  (formData) => {
    // сохраняем новые значения user
    // На время выполнения запроса меняем текст кнопки submit и не закрываем popup
    const button = document.querySelector('.popup_target_profile').querySelector('.popup__save-button');
    const prevButtonText = button.textContent;
    button.textContent =  'Сохранение...';

    api.saveNewProfile(formData)
    .then((result) => {
      user.setUserInfo(result);
      // закрываем popup после выполнения запроса
      profileFormPopup.close();
      button.textContent =  prevButtonText;

    })
    .catch((err) => {
      console.log(`Ошибка при сохранении данных профиля пользователя: ${err}!`)
    }
  );

  });
// устанавливаем слушатели
profileFormPopup.setEventListeners();

// создаем экземпляр класса PopupWithForm для добавления карточки
const addItemFormPopup = new PopupWithForm('.popup_target_add-item',
  //вторым параметром передаем колбэк сабмита формы, т.к. нужно учесть логику формы
  (formData) => {

    // На время выполнения запроса меняем текст кнопки submit и не закрываем popup
    const button = document.querySelector('.popup_target_add-item').querySelector('.popup__save-button');
    const prevButtonText = button.textContent;
    button.textContent =  'Сохранение...';

    // вначале отправим карточку на сервер:
    api.addCard(formData)
    .then((result) => {
      // создаем и добавляем карточку в DOM!
      createCard(user.getUserInfo().user_id, result.owner._id, result._id, result.name, result.link, [], '#card-template', imagePopup);
      // теперь только закрываем окно
      addItemFormPopup.close();
      button.textContent =  prevButtonText;

    })
    // если поймали ошибку
    .catch((err) => {
      console.log(`Ошибка при сохранении карточки: ${err}!`)
    }
    );
});

// устанавливаем слушатели
addItemFormPopup.setEventListeners();

// создаем экземпляр класса PopupWithForm для подтверждения удаления карточки
const confirmFormPopup = new PopupWithForm('.popup_target_confirm',
  //вторым параметром передаем колбэк сабмита формы, т.к. нужно учесть логику работы формы
  () => {
      // идем на сервер
      api.deleteCard(confirmFormPopup)
      .then((result) => {
        // удалим элемент из DOM
        confirmFormPopup.cardElem.remove();
        // после удаления element лучше занулить
        confirmFormPopup.cardElem = null;
        // закрываем окно:
        confirmFormPopup.close();
      })
      .catch((err) => {
        console.log(`Ошибка при обработке результатов запроса на удаление карточки : ${err}!`);
      });
    }
);

// устанавливаем слушатели
confirmFormPopup.setEventListeners();

// создаем экземпляр класса PopupWithForm для редактирования аватара пользователя
const editAvatarFormPopup = new PopupWithForm('.popup_target_update-avatar',
  //вторым параметром передаем колбэк сабмита формы, т.к. нужно учесть логику формы
  (newAvatar) => {

    // На время выполнения запроса меняем текст кнопки submit и не закрываем popup
    const button = document.querySelector('.popup_target_update-avatar').querySelector('.popup__save-button');
    const prevButtonText = button.textContent;
    button.textContent =  'Сохранение...';

    // вначале отправим данные на сервер:
    api.updateAvatar(newAvatar)
    .then((result) => {
      // создаем и добавляем карточку в DOM!
      user.setUserAvatar(result.avatar);
      // теперь только закрываем окно
      editAvatarFormPopup.close();
      button.textContent =  prevButtonText;

    })
    // если поймали ошибку
    .catch((err) => {
      console.log(`Ошибка при сохранении аватара: ${err}!`)
    }
    );
}
);

// устанавливаем слушатели
editAvatarFormPopup.setEventListeners();

// Создаем экземпляр класса FormValidator для editAvatarFormPopup
const avatarEditFormValidator = new FormValidator(enableValidationSettings, avatarEditForm);
avatarEditFormValidator.enableValidation();

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

// назначаем событие - нажали на кнопку "Обновить аватар"
avatarEditButton.addEventListener('click', () => { showEditAvatarForm(avatarEditFormValidator); });

const cardsList = new Section({renderer:
  ({_id: newId, name: newName, link: newLink, likes: newLikes, owner: {_id: ownerId}}) => {
    createCard(user.getUserInfo().user_id, ownerId, newId, newName, newLink, newLikes, '#card-template', imagePopup);
  }
}, '.elements');

// В процессе загрузки сайта загружаем данные с сервера: профиль пользователя и карточки
// запускаем несколько промисов параллельно: для загрузки профиля и начальных карточек
const promiseUser = api.getUserProfile();
const promiseCards = api.getInitialCards();

Promise.all([promiseUser, promiseCards])
  // обрабатываем полученные данные
  .then (data => {
    // профиль пользователя сохраняем
    user.setUserInfo(data[0]);
    // получаем карточки
    cardsList.setCardItems(data[1]);
    // отрисовываем карточки
    cardsList.renderItems();
  })
