import {title} from './constants';
import {subtitle} from './constants';

/** Класс UserInfo, который отвечает за управление отображением информации о пользователе на странице
 *
 */
 export class UserInfo {
  constructor(userInfo) {
    this._userName = userInfo.user_name;
    this._userAboutSelf = userInfo.about_self;
    // обновим данные в разметке
    title.textContent=this._userName;
    subtitle.textContent=this._userAboutSelf;
  }

/** Публичный метод, который возвращает объект с данными пользователя
 *
 * @returns {object} userInfo
 */
getUserInfo() {
  return {user_name: this._userName, about_self: this._userAboutSelf};
}

/** Публичный метод, который принимает новые данные пользователя и добавляет их на страницу
 *
 * @param {object} userInfo
 */
setUserInfo(userInfo) {
  // сохраним данные пользователя
  this._userName = userInfo.user_name;
  this._userAboutSelf = userInfo.about_self;
  // обновим данные в разметке
  title.textContent=this._userName;
  subtitle.textContent=this._userAboutSelf;
}

}
