// контейнер с карточками
const elemContainer = document.querySelector('.elements');

// карточки при загрузке страницы:
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];


// При загрузке на странице должно быть 6 карточек. Добавляем!
loadInitialCards(initialCards);


//Функция для формирования карточек при загрузке страницы:
function loadInitialCards(initialCards) {
  // получаем содержание шаблона
  const cardTemplate = document.querySelector('#card-template').content;


  for (let i=0; i < initialCards.length; i++) {
  // ищем в шаблоне нужный элемент и клонируем его
  const cardElement = cardTemplate.querySelector('.elements__card').cloneNode(true);

  // ИЗМЕНЯЕМ атрибуты элемента значениями из массива:
  photoElem = cardElement.querySelector('.elements__photo');
  photoElem.setAttribute('src', initialCards[i].link);
  photoElem.setAttribute('alt', initialCards[i].name);

  titleElem = cardElement.querySelector('.elements__title');
  titleElem.textContent = initialCards[i].name;


  // добавялем карточку в конец секции elements
  elemContainer.append(cardElement);
  }
}


// получаем popup
const popupElem = document.querySelector('.popup');
// форма popup
const formElement = document.querySelector('.popup__form');

// кнопка редактировать в профиле
const profileEditButton = document.querySelector('.profile__edit-button');
// кнопка закрыть popup
const popupCloseButton = document.querySelector('.popup__close-button');

// поля input в DOM
let nameInput = document.querySelector('.popup__input_field_name');
let jobInput = document.querySelector('.popup__input_field_job');

// поля в профиле в DOM
let title = document.querySelector('.profile__title');
let subtitle = document.querySelector('.profile__subtitle');


// функция поднимаем popup
function showPopup() {
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
  // Закрываем окно:
  closePopup();
}

// назначаем событие - открыть popup
profileEditButton.addEventListener('click', showPopup);
// назначаем событие - Закрыть popup
popupCloseButton.addEventListener('click', closePopup);
// Прикрепляем обработчик к форме: он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', saveProfile);
