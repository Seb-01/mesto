// получаем popup
const popupElem = document.querySelector('.popup');
// форма popup
const formElement = document.querySelector('.popup__container');

// кнопка редактировать в профиле
const profileEditButton = document.querySelector('.profile-info__edit-button');
// кнопка закрыть popup
const popupCloseButton = document.querySelector('.popup__close-button');
// кнопка сохранить popup
const popupSaveButton = document.querySelector('.popup__save-button');


// поля input в DOM
let nameInput = document.querySelector('.popup__name');
let jobInput = document.querySelector('.popup__about-oneself');

// поля в профиле в DOM
let title = document.querySelector('.profile-info__title');
let subtitle = document.querySelector('.profile-info__subtitle');


// функция поднимаем popup
function showPopup() {
  console.log('Мы кликнули по кнопке ".profile-info__edit-button"');

  // Чтобы попап открывался, добавляйте ему модификатор popup_opened с одним-единственным правилом.
  // Правило должно изменять значение свойства display на block или flex.

  // При открытии формы поля «Имя» и «О себе» должны быть заполнены теми значениями,
  // которые отображаются на странице
  nameInput.value = title.textContent;
  jobInput.value =subtitle.textContent;

  // добавялем модификатор для "вспытия" окна
  popupElem.classList.add('popup_opened');
}

// функция закрываем popup
function closePopup() {
  // Чтобы закрыть попап, убираем модификатор для "вспытия" окна
  popupElem.classList.remove('popup_opened');
}

// функция обновление инфо в профиле
function saveProfile(evt) {
  // Эта строчка отменяет стандартную отправку формы, т.к. мы можем определить свою логику отправки.
  evt.preventDefault();

   // Вставьте новые значения с помощью textContent
  title.textContent=nameInput.value;
  subtitle.textContent=jobInput.value;

  // Чтобы закрыть попап, удаляйте у него модификатор popup_opened
  // манипулируем с классами элемента - убираем модификатор для "вспытия" окна
  popupElem.classList.remove('popup_opened');
}

// назначаем событие - открыть popup
profileEditButton.addEventListener('click', showPopup);
// назначаем событие - Закрыть popup
popupCloseButton.addEventListener('click', closePopup);
// Прикрепляем обработчик к форме: он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', saveProfile);