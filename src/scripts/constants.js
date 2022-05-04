
/** Объект с настройками валидации форм */
export const enableValidationSettings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-buton_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};

/** Раздел объявления констант */
export const cohort = 'cohort-40';
export const token = '42ba884f-b283-49c9-8264-0bf37bf4771e';

/** форма редактирования профиля */
export const profileEditForm = document.querySelector('.popup__edit-profile-form');

/** форма добавления карточки */
export const itemAddForm = document.querySelector('.popup__add-item-form');

/** кнопка "редактировать профиль" */
export const profileEditButton = document.querySelector('.profile__edit-button');
/** кнопка "добавить карточку" */
export const itemAddButton = document.querySelector('.profile__add-button');

/** поля input формы редактирования профиля */
export const nameInput = document.querySelector('.popup__input_field_name');
export const jobInput = document.querySelector('.popup__input_field_job');

/** поля в профиле */
export const title = document.querySelector('.profile__title');
export const subtitle = document.querySelector('.profile__subtitle');

