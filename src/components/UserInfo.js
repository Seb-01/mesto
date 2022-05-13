/** Класс UserInfo, который отвечает за управление отображением информации о пользователе на странице
 *
 */
 export class UserInfo {
   constructor(avatarSelector, title, subtitle) {
      this._userName = 'no name';
      this._userAboutSelf = 'no about';
      this._avatarElem = document.querySelector(avatarSelector);
      this._titleElem = title;
      this._subtitleElem = subtitle;
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
  setUserInfo({ name, about, avatar, _id }) {
    // получили данные с сервера: имя, род занятий и аватар
    this._userName = name;
    this._userAboutSelf = about;
    this._avatar = avatar;
    this._userId = _id;

    // обновим данные в разметке
    this._titleElem.textContent = this._userName;
    this._subtitleElem.textContent = this._userAboutSelf;
    this._avatarElem.src = this._avatar;
  }

}
