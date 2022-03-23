/** Раздел объявления констант */

/** Kонтейнер с карточками */
const elemContainer = document.querySelector('.elements');

/** popup формы редактирования профиля */
const popupEditProfile = document.querySelector('.popup_target_profile');
/** popup формы добавления карточки */
const popupAddItem = document.querySelector('.popup_target_add-item');
/** popup картинки */
const imagePopup = document.querySelector('.popup_target_picture-view');
const pictureElem = imagePopup.querySelector('.popup__picture');
const captionElem = imagePopup.querySelector('.popup__figure-caption');

/** форма редактирования профиля */
const profileEditForm = document.querySelector('.popup__edit-profile-form');
/** форма добавления карточки */
const itemAddForm = document.querySelector('.popup__add-item-form');

/** кнопка "редактировать профиль" */
const profileEditButton = document.querySelector('.profile__edit-button');
/** кнопка "добавить карточку" */
const itemAddButton = document.querySelector('.profile__add-button');

/** поля input формы редактирования профиля */
const nameInput = document.querySelector('.popup__input_field_name');
const jobInput = document.querySelector('.popup__input_field_job');

/** поля в профиле */
const title = document.querySelector('.profile__title');
const subtitle = document.querySelector('.profile__subtitle');

/** поля input формы для добавления карточки */
const mestoNameInput = document.querySelector('.popup__input_field_mesto-name');
const mestoLinkInput = document.querySelector('.popup__input_field_link');

/** содержание шаблона карточки */
const cardTemplate = document.querySelector('#card-template').content;

/** кнопкки закрытия popup */
const popupEditProfileCloseButton = popupEditProfile.querySelector('.popup__close-button');
const popupAddItemCloseButton = popupAddItem.querySelector('.popup__close-button');
const imagePopupCloseButton = imagePopup.querySelector('.popup__close-button');

/** Раздел объявления функций: */

/** Функция поднять popup
 * @param {object} popupElem - элемент popup
 */
 function showPopup(popupElem) {
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

/** Функция - лайкнуть картинку
 * @param {object} evt - событие
 */
function likeCard(evt) {
  evt.target.classList.toggle('elements__like-button_active');
}

/** Функция - удалить карточку
 * @param {object} evt - событие
 */
function deleteCard(evt) {
  evt.target.closest('.elements__card').remove();
}

/** Функция - показать картинку
 * @param {object} cardData - данные картинки
 */
function showPicture(cardData)
{
  // заполняем данные в полях
  pictureElem.src = cardData.src;
  pictureElem.alt = cardData.name;
  captionElem.textContent = cardData.name;

  //поднмаем popup
  showPopup(imagePopup);
}

/** Функция для создания карточки из шаблона:
 * @param {string} newName - подпись к картинке
 * @param {string} link - ссылка на картинку
 * @returns {object} - элемент новой карточки
 */
function createCard(newName, link) {
  /** клонируем из шаблона новую карточку */
  const cardElement = cardTemplate.querySelector('.elements__card').cloneNode(true);

  /** изменяем атрибуты карточки значениями-аргументами */
  const photoElem = cardElement.querySelector('.elements__photo');
  photoElem.src=link;
  photoElem.alt=newName;

  const titleElem = cardElement.querySelector('.elements__title');
  titleElem.textContent = newName;

  /** добавляем обработчик события кнопке-лайку */
  const likeButtonElem = cardElement.querySelector('.elements__like-button');
  likeButtonElem.addEventListener('click', likeCard);
  /** добавляем обработчик события кнопке trash */
  const trashButton = cardElement.querySelector('.elements__trash-button');
  trashButton.addEventListener('click', deleteCard);
  /** добавляем обработчик события - клик на карточке */
  photoElem.addEventListener('click', () => showPicture({src:link, name:newName}));

  return cardElement;
}

/** Функция для рендеринга карточки:
 * @param {string} newName - подпись к картинке
 * @param {string} link - ссылка на картинку
 * @param {object} elemContainer - контейнер
 */
 function renderCard(newName, link, elemContainer) {
  /** добавялем карточку в DOM */
  elemContainer.prepend(createCard(newName,link));
}

/** Функция для рендеринга карточек при загрузке страницы */
 function loadInitialCards() {
  /** добавляем карточки в DOM*/
   initialCards.forEach((card) => {
    renderCard(card.name, card.link, elemContainer);
  })
}

/** Функция рендеринга новой карточки
 * @param {object} evt - событие
 */
function saveNewItem(evt) {
  /** Эта строчка отменяет стандартную отправку формы, т.к. мы можем определить свою логику отправки */
  evt.preventDefault();
  renderCard(mestoNameInput.value, mestoLinkInput.value, elemContainer);
  closePopup(popupAddItem);
}

/** Функция открытия формы редактирования профиля */
function showEditProfileForm() {
  /** При открытии формы поля «Имя» и «О себе» должны быть заполнены теми значениями,
  которые отображаются на странице */

  nameInput.value = title.textContent;
  jobInput.value =subtitle.textContent;

  /** поднимаем попап */
  showPopup(popupEditProfile);

  // убираем ошибки полей ввода формы
  clearFormInputError(profileEditForm);

  const inputList =  profileEditForm.querySelectorAll(enableValidationSettings.inputSelector);

  // актуализируем состояние кнопки submit
  toggleButtonState(inputList, popupEditProfile.querySelector('.popup__save-button'),
    enableValidationSettings.inactiveButtonClass);
}

/** Функция открытия формы редактирования профиля */
function showAddItemForm() {

  // очистим поля от предыдущей "работы"
  itemAddForm.reset();

  /** поднимаем попап */
  showPopup(popupAddItem);

  // убираем ошибки полей ввода формы
  clearFormInputError(itemAddForm);

  const inputList =  itemAddForm.querySelectorAll(enableValidationSettings.inputSelector);
  // актуализируем состояние кнопки submit
  toggleButtonState(inputList, popupAddItem.querySelector('.popup__save-button'),
    enableValidationSettings.inactiveButtonClass);
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

/** Работаем: */
/** При загрузке на странице должно быть 6 карточек */
loadInitialCards(initialCards);

/** назначаем событие - редактируем профиль */
profileEditButton.addEventListener('click', showEditProfileForm);
/** назначаем событие - добавляем карточку */
itemAddButton.addEventListener('click', showAddItemForm);

/** обработчик submit в формах */
profileEditForm.addEventListener('submit', saveProfile);
itemAddForm.addEventListener('submit', saveNewItem);

/** добавялем обработчик закрытия popup по клику мыши на overlay */
imagePopup.addEventListener('mousedown', closePopupByClickOnOverlay);
popupAddItem.addEventListener('mousedown', closePopupByClickOnOverlay);
popupEditProfile.addEventListener('mousedown', closePopupByClickOnOverlay);
