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
const editProfileForm = document.querySelector('.popup__edit-profile-form');
/** форма добавления карточки */
const addItemForm = document.querySelector('.popup__add-item-form');

/** кнопка "редактировать профиль" */
const profileEditButton = document.querySelector('.profile__edit-button');
/** кнопка "добавить карточку" */
const addItemButton = document.querySelector('.profile__add-button');

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
const closePopupEditProfileButton = popupEditProfile.querySelector('.popup__close-button');
const closePopupAddItemButton = popupAddItem.querySelector('.popup__close-button');
const closeImagePopupButton = imagePopup.querySelector('.popup__close-button');

/** Раздел объявления функций: */

/** Функция для показа ошибки в ходе валидации поля
 *
 * @param {*} formElement  - форма
 * @param {*} inputElement - input поле
 * @param {*} errorMessage - сообщение об ошибке
 */
 const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add('popup__input_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('popup__input-error_active');
};

/** Функция, скрывающая ошибку в ходе валидации поля
 *
 * @param {object} formElement
 * @param {object} inputElement
 */
const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove('popup__input_type_error');
  errorElement.classList.remove('popup__input-error_active');
  errorElement.textContent = '';
};

/** Функция поднять popup
 * @param {object} popupElem - элемент popup
 */
 function showPopup(popupElem) {
  popupElem.classList.add('popup_opened');
}

/** Функция закрыть popup
 * @param {object} popupElem - элемент
 */
 function closePopup(popupElem) {
  //убрать сообщения об ошибках, если были:

  //проходим по всем формам и input-полям в них
  //перебирать HTMLCollection с помощью forEach не получится!
  Array.from(popupElem.getElementsByTagName('form')).forEach(formElem => {
     formElem.querySelectorAll('.popup__input').forEach(inputElem => {
      hideInputError(formElem,inputElem);
     })
  });

  // Закрываем popup
  popupElem.classList.remove('popup_opened');
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
  //поднмаем popup
  showPopup(imagePopup);

  pictureElem.src = cardData.src;
  pictureElem.alt = cardData.name;
  captionElem.textContent = cardData.name;
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
  // актуализируем состояние кнопки submit
  toggleButtonState([nameInput, jobInput], popupEditProfile.querySelector('.popup__save-button'));
}

/** Функция открытия формы редактирования профиля */
function showAddItemForm() {

  // очистим поля от предыдущей "работы"
  mestoNameInput.value = "";
  mestoLinkInput.value = "";

  /** поднимаем попап */
  showPopup(popupAddItem);
  // актуализируем состояние кнопки submit
  toggleButtonState([mestoNameInput, mestoLinkInput], popupAddItem.querySelector('.popup__save-button'));
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

/** Функция для проверки input поля на валидность
 * @param {object} formElement - форма или филдсет
 * @param {object} inputElemen - input поле
 */
const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  }
  else {
    hideInputError(formElement, inputElement);
  }
};

/** Функция проверяет валиднось полей и возращает true или false
 *
 * @param {object} inputList - список input полей
 * @returns Boolean
 */
const hasInvalidInput = (inputList) => {
  // проходим по этому массиву методом some
  return inputList.some((inputElement) => {
    // Если поле не валидно, колбэк вернёт true
    // Обход массива прекратится и вся фунцкция
    // hasInvalidInput вернёт true

    return !inputElement.validity.valid;
  })
};

/** Функция, которая меняет статус кнопки submit в зависимости от валидаци полей формы
 *
 * @param {*} inputList - список всех контролируемых input-полей
 * @param {*} buttonElement - кнопка submit
 */
const toggleButtonState = (inputList, buttonElement) => {
  // Если есть хотя бы один невалидный инпут
  if (hasInvalidInput(inputList)) {
    // сделай кнопку неактивной
    buttonElement.classList.add('popup__save-buton_inactive');
  } else {
    // иначе сделай кнопку активной
    buttonElement.classList.remove('popup__save-buton_inactive');
  }
};


/** Функция-установщик слушателей на input поля
 *
 * @param {object} formElement - форма или филдсет
 */
const setEventListeners = (formElement) => {

  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  const buttonElement = formElement.querySelector('.popup__save-button');

  // до начала ввода данных в input делаем кнопку неактивной!
  toggleButtonState(inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement);
      // нужно сверять состояние кнопки при каждом изменении полей формы!
      toggleButtonState(inputList, buttonElement);
    });
  });
};

/** Функция для реализации механизма валидации формы
 * @param {object} formElement - форма
 */
const enableValidation = (formElement) => {
  const fieldsetList = Array.from(formElement.querySelectorAll('.popup__info'));

  fieldsetList.forEach((fieldSet) => {
    setEventListeners(fieldSet);
  });
};



/** Работаем: */
/** При загрузке на странице должно быть 6 карточек */
loadInitialCards(initialCards);

/** назначаем событие - редактируем профиль */
profileEditButton.addEventListener('click', showEditProfileForm);
/** назначаем событие - добавляем карточку */
addItemButton.addEventListener('click', showAddItemForm);

/** назначаем событие - закрыть popup */
//closeButtons[0].addEventListener('click', () => closePopup(popupEditProfile));
closePopupEditProfileButton.addEventListener('click', () => closePopup(popupEditProfile));
closePopupAddItemButton.addEventListener('click', () => closePopup(popupAddItem));
closeImagePopupButton.addEventListener('click', () => closePopup(imagePopup));

/** обработчик submit в формах */
editProfileForm.addEventListener('submit', saveProfile);
addItemForm.addEventListener('submit', saveNewItem);

/** Запускаем валидацию форм */
enableValidation(editProfileForm);
enableValidation(addItemForm);

