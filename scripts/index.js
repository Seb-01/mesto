// Здесь объявления констант

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

// получаем popup формы редактирования профиля
const popupEditProfile = document.querySelector('.popup.popup_target_profile');
// получаем popup формы добавления карточки
const popupAddItem = document.querySelector('.popup.popup_target_add-item');
// получаем popup картинки
const popupPictureView = document.querySelector('.popup.popup_target_picture-view');

//получаем форму редактирования профиля
const editProfileForm = document.querySelector('.popup__edit-profile-form');
//получаем форму добавления карточки
const addItemForm = document.querySelector('.popup__add-item-form');

// кнопка редактировать профиль
const profileEditButton = document.querySelector('.profile__edit-button');
// кнопка добавить карточку
const profileAddButton = document.querySelector('.profile__add-button');

// поля input формы редактирования профиля в DOM
const nameInput = document.querySelector('.popup__input_field_name');
const jobInput = document.querySelector('.popup__input_field_job');

// поля в профиле формы редактирования профиля в DOM
const title = document.querySelector('.profile__title');
const subtitle = document.querySelector('.profile__subtitle');

// поля input формы для добавления карточки в DOM
const mestoNameInput = document.querySelector('.popup__input_field_mesto-name');
const mestoLinkInput = document.querySelector('.popup__input_field_link');


// Здесь объявления функций:

//Функция для формирования карточек при загрузке страницы:
function loadInitialCards(initialCards) {
  // получаем содержание шаблона
  const cardTemplate = document.querySelector('#card-template').content;
  let likeButtonElem, trashButton, photoElem;

  // добавляем карточки
  for (let i=0; i < initialCards.length; i++) {
    loadCard(initialCards[i].name, initialCards[i].link);
  }
}

//Функция для добавления карточки:
//Сократить код! -------------------------------------------------
function loadCard(new_name, link) {
  // получаем содержание шаблона
  const cardTemplate = document.querySelector('#card-template').content;

  // ищем в шаблоне нужный элемент и клонируем его
  const cardElement = cardTemplate.querySelector('.elements__card').cloneNode(true);

  // ИЗМЕНЯЕМ атрибуты элемента значениями аргументами:
  photoElem = cardElement.querySelector('.elements__photo');
  photoElem.setAttribute('src', link);
  photoElem.setAttribute('alt', new_name);

  titleElem = cardElement.querySelector('.elements__title');
  titleElem.textContent = new_name;

  // добавялем карточку в начало секции elements
  elemContainer.prepend(cardElement);

  //добавляем обработчик события лайку
  const likeButtonElem = cardElement.querySelector('.elements__like-button');
  likeButtonElem.addEventListener('click', likeCard);
  //добавляем обработчик события trash
  const trashButton = cardElement.querySelector('.elements__trash-button');
  trashButton.addEventListener('click', deleteCard);
}

// лайкнуть!
function likeCard(evt)
{
  evt.target.classList.toggle('elements__like-button_active');
}

// удалить карту!
function deleteCard(evt)
{
  // удаляем карту и ближайшего предка с заданным классом
  evt.target.closest('.elements__card').remove();
}

// показать карточку
function showPicture(evt)
{
  // здесь нужно определить: вертикальный или горизонтальный popup

  // поднимаем попап
  popupPictureView.classList.add('popup_opened');

  // получить адрес картинки карточки (через атрибуты src="" alt="")
  const pictureTo = popupPictureView.querySelector('.popup__picture');
  pictureTo.setAttribute('src', evt.target.getAttribute('src'));
  pictureTo.setAttribute('alt', evt.target.getAttribute('alt'));

  // получить elements__title карточки (h2)
  const titleFrom = evt.target.closest('.elements__card').querySelector('.elements__title');
  const titleTo = popupPictureView.querySelector('.popup__figure-caption');
  titleTo.textContent = titleFrom.textContent;
}

// открыть форму редактирования профиля
function showEditProfileForm() {
  // Чтобы попап открывался, добавляйте ему модификатор popup_opened с одним-единственным правилом.
  // Правило должно изменять значение свойства display на block или flex.

  // При открытии формы поля «Имя» и «О себе» должны быть заполнены теми значениями,
  // которые отображаются на странице
  nameInput.value = title.textContent;
  jobInput.value =subtitle.textContent;

  // поднимаем попап
  showPopup(popupEditProfile);
}

// открыть форму добавления новой карточки
function showAddItemForm(evt) {

  // поднимаем попап
  showPopup(popupAddItem);
}

// поднять popup
function showPopup(popupElem) {
  // Чтобы попап открывался, добавляйте ему модификатор popup_opened с одним-единственным правилом.
  // Правило должно изменять значение свойства display на block или flex.
  popupElem.classList.add('popup_opened');
}

// закрыть popup
function closePopup(evt) {
  // Чтобы закрыть попап, убираем модификатор для "вспытия" окна
  // но вначале нужно понять, о каком кнопке идет речь:
  // всплытие событий это обеспечит нам: исли кликнули на соответствующую кнопку!

  if(evt.target.classList.value === 'popup__close-button' || evt.target.classList.value === 'popup__save-button')
    this.classList.remove('popup_opened');
}

// функция обновление инфо в профиле
function saveProfile(evt) {
  // Эта строчка отменяет стандартную отправку формы, т.к. мы можем определить свою логику отправки.
  evt.preventDefault();

   // Вставьте новые значения с помощью textContent
  title.textContent=nameInput.value;
  subtitle.textContent=jobInput.value;
}

// функция добавления карточки!
function saveNewItem(evt) {
  // Эта строчка отменяет стандартную отправку формы, т.к. мы можем определить свою логику отправки.
  evt.preventDefault();

  loadCard(mestoNameInput.value, mestoLinkInput.value);
}

// Работаем:
/*************************************************************************************/

// При загрузке на странице должно быть 6 карточек. Добавляем!
loadInitialCards(initialCards);

// назначаем событие - редактируем профиль
profileEditButton.addEventListener('click', showEditProfileForm);
// назначаем событие - добавляем карточку
profileAddButton.addEventListener('click', showAddItemForm);

// назначаем событие - закрыть popup
popupEditProfile.addEventListener('click', closePopup);
popupAddItem.addEventListener('click', closePopup);
popupPictureView.addEventListener('click', closePopup);

// обработчик submit в формах
editProfileForm.addEventListener('submit', saveProfile);
addItemForm.addEventListener('submit', saveNewItem);

