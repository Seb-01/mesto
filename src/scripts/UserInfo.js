import {title} from './constants';
import {subtitle} from './constants';

/** Класс UserInfo, который отвечает за управление отображением информации о пользователе на странице
 *
 */
 export class UserInfo {
   constructor(avatarSelector) {
      this._userName = 'no name';
      this._userAboutSelf = 'no about';
      this._avatarElem = document.querySelector(avatarSelector);
    }

  /** Публичный метод, который возвращает объект с данными пользователя
   *
   * @returns {object} userInfo
   */
  getUserInfo() {
    return {user_name: this._userName, user_id: this._userId, about_self: this._userAboutSelf};
  }

  /** Публичный метод, который сохраняет и отображает новые данные пользователя
   * @param {object} newProfileData - данные профиля пользователя
   *
   */
  setUserInfo(newProfileData) {
    // получили данные с сервера: имя, род занятий и аватар
    this._userName = newProfileData.name;
    this._userAboutSelf = newProfileData.about;
    this._avatar = newProfileData.avatar;
    this._userId = newProfileData._id;

    // обновим данные в разметке
    title.textContent = this._userName;
    subtitle.textContent = this._userAboutSelf;
    this._avatarElem.src = this._avatar;
  }

 /** Публичный метод, для смены аватара
 * @param {object} newAvatar - URL нового аватара
 *
 */
 setUserAvatar(newAvatar) {
    this._avatar = newAvatar;
    this._avatarElem.src = this._avatar;
 }

}
