/** Карточки при загрузке страницы: */
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

/** Объект с настройками валидации форм */
const enableValidationSettings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-buton_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};

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
