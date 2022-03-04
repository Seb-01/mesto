/** Раздел объявления констант */

/** Kонтейнер с карточками */
const elemContainer = document.querySelector('.elements');

/** popup формы редактирования профиля */
const popupEditProfile = document.querySelector('.popup_target_profile');
/** popup формы добавления карточки */
const popupAddItem = document.querySelector('.popup_target_add-item');
/** popup картинки */
const popupPictureView = document.querySelector('.popup_target_picture-view');

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
 * @param {object} evt - событие
 */
function showPicture(evt)
{
  /** поднимаем попап */
  popupPictureView.classList.add('popup_opened');

  /** получаем src и alt атрибуты картинки */
  const pictureTo = popupPictureView.querySelector('.popup__picture');
  pictureTo.setAttribute('src', evt.target.getAttribute('src'));
  pictureTo.setAttribute('alt', evt.target.getAttribute('alt'));

  /** получаем подпись к карточке */
  const titleFrom = evt.target.closest('.elements__card').querySelector('.elements__title');
  const titleTo = popupPictureView.querySelector('.popup__figure-caption');
  titleTo.textContent = titleFrom.textContent;
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
  let photoElem = cardElement.querySelector('.elements__photo');
  photoElem.setAttribute('src', link);
  photoElem.setAttribute('alt', new_name);

  let titleElem = cardElement.querySelector('.elements__title');
  titleElem.textContent = new_name;

  /** добавляем обработчик события кнопке-лайку */
  const likeButtonElem = cardElement.querySelector('.elements__like-button');
  likeButtonElem.addEventListener('click', likeCard);
  /** добавляем обработчик события кнопке trash */
  const trashButton = cardElement.querySelector('.elements__trash-button');
  trashButton.addEventListener('click', deleteCard);
  /** добавляем обработчик события - клик на карточке */
  const photo = cardElement.querySelector('.elements__photo');
  photo.addEventListener('click', showPicture);

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

/** Функция для рендеринга карточек при загрузке страницы:
 * @param {Array} initialCards - массив с исходными карточками
 */
 function loadInitialCards(initialCards) {
  /** добавляем карточки в DOM*/
  for (let i=0; i < initialCards.length; i++) {
    renderCard(initialCards[i].name, initialCards[i].link, elemContainer);
  }
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

/** Функция поднять popup
 * @param {object} popupElem - элемент popup
 */
function showPopup(popupElem) {
  popupElem.classList.add('popup_opened');
}

/** Функция закрыть popup
 * @param {object} popupElem - элемент popup
 */
 function closePopup(popupElem) {
  popupElem.classList.remove('popup_opened');
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

/** Функция открыть форму добавления новой карточки */
function showAddItemForm() {
  /** поднимаем попап */
  showPopup(popupAddItem);
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
profileAddButton.addEventListener('click', showAddItemForm);

/** назначаем событие - закрыть popup */
closeButtons[0].addEventListener('click', function() {closePopup(popupEditProfile);});
closeButtons[1].addEventListener('click', function() {closePopup(popupAddItem);});
closeButtons[2].addEventListener('click', function() {closePopup(popupPictureView);});

/** обработчик submit в формах */
editProfileForm.addEventListener('submit', saveProfile);
addItemForm.addEventListener('submit', saveNewItem);

