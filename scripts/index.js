/** Раздел объявления констант */

/** Kонтейнер с карточками */
const elemContainer = document.querySelector('.elements');

/** popup формы редактирования профиля */
const popupEditProfile = document.querySelector('.popup_target_profile');
/** popup формы добавления карточки */
const popupAddItem = document.querySelector('.popup_target_add-item');
/** popup картинки */
const popupPictureView = document.querySelector('.popup_target_picture-view');
const pictureTo = popupPictureView.querySelector('.popup__picture');
const titleTo = popupPictureView.querySelector('.popup__figure-caption');

/** форма редактирования профиля */
const editProfileForm = document.querySelector('.popup__edit-profile-form');
/** форма добавления карточки */
const addItemForm = document.querySelector('.popup__add-item-form');

/** кнопка "редактировать профиль" */
const profileEditButton = document.querySelector('.profile__edit-button');
/** кнопка "добавить карточку" */
const profileAddButton = document.querySelector('.profile__add-button');

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
const closeButtons = document.querySelectorAll('.popup__close-button');


/** Раздел объявления функций: */

/** Функция поднять popup
 * @param {object} popupElem - элемент popup
 */
 function showPopup(popupElem) {
  popupElem.classList.add('popup_opened');
}

/** Функция закрыть popup
 * @param {object} evt - событие или элемент
 */
 function closePopup(evt) {
   if(evt.target) // если событие
    evt.target.closest('.popup').classList.remove('popup_opened');
  else // eсли popup
    evt.classList.remove('popup_opened')
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
 * @param {string} src - ссылка на картинку
 * @param {string} alt - подпись для атрибута alt
 * @param {string} title - подпись для figure
 */
function showPicture(src, alt, title)
{
  showPopup(popupPictureView);

  pictureTo.setAttribute('src', src);
  pictureTo.setAttribute('alt', alt);
  titleTo.textContent = title;
}

/** Функция для создания карточки из шаблона:
 * @param {string} new_name - подпись к картинке
 * @param {string} link - ссылка на картинку
 * @returns {object} - элемент новой карточки
 */
function createCard(new_name, link) {
  /** клонируем из шаблона новую карточку */
  const cardElement = cardTemplate.querySelector('.elements__card').cloneNode(true);

  /** изменяем атрибуты карточки значениями-аргументами */
  const photoElem = cardElement.querySelector('.elements__photo');
  photoElem.setAttribute('src', link);
  photoElem.setAttribute('alt', new_name);

  const titleElem = cardElement.querySelector('.elements__title');
  titleElem.textContent = new_name;

  /** добавляем обработчик события кнопке-лайку */
  const likeButtonElem = cardElement.querySelector('.elements__like-button');
  likeButtonElem.addEventListener('click', likeCard);
  /** добавляем обработчик события кнопке trash */
  const trashButton = cardElement.querySelector('.elements__trash-button');
  trashButton.addEventListener('click', deleteCard);
  /** добавляем обработчик события - клик на карточке */
  photoElem.addEventListener('click', showPicture.bind(this, link, new_name, new_name), false);

  return cardElement;
}

/** Функция для рендеринга карточки:
 * @param {string} new_name - подпись к картинке
 * @param {string} link - ссылка на картинку
 * @param {object} elemContainer - контейнер
 */
 function renderCard(new_name, link, elemContainer) {
  /** добавялем карточку в DOM */
  elemContainer.prepend(createCard(new_name,link));
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
profileAddButton.addEventListener('click', function (){showPopup(popupAddItem);});

/** назначаем событие - закрыть popup */
closeButtons.forEach((button) => { button.addEventListener('click', closePopup);} )

/** обработчик submit в формах */
editProfileForm.addEventListener('submit', saveProfile);
addItemForm.addEventListener('submit', saveNewItem);

