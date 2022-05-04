import {title} from './constants';
import {subtitle} from './constants';

import {cohort} from '../scripts/constants.js';
import {token} from '../scripts/constants.js';
import { getFetchResult } from '../scripts/auxfunc.js';

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
    return {user_name: this._userName, about_self: this._userAboutSelf};
  }

  /** Публичный метод, который берет на сервера данные пользователя
   *
   *
   */
  setUserInfo(newData) {

    //если пришли "готовые" данные
    if (newData) {
      // установим имя и род занятий
      this._userName = newData.user_name;
      this._userAboutSelf = newData.about_self;
      //this._avatar = result.avatar;

      // обновим данные в разметке
      title.textContent = this._userName;
      subtitle.textContent = this._userAboutSelf;
    }
    else {
      // запрос к серверу
      getFetchResult(`https://nomoreparties.co/v1/${cohort}/users/me`,
        { method: "GET",
          headers: {
            authorization: token
            }
          },
        // сall-back, который будет вызван, как только данные будут готовы!
        (result) => {
          // получим имя и род занятий
          this._userName = result.name;
          this._userAboutSelf = result.about;
          this._avatar = result.avatar;

          // обновим данные в разметке
          title.textContent = this._userName;
          subtitle.textContent = this._userAboutSelf;
          this._avatarElem.src = this._avatar;
        },
        // сall-back, который будет вызван в случае ошибки!
        (err) => {
          // обновим данные в разметке
          title.textContent=this._userName;
          subtitle.textContent=this._userAboutSelf;
        }
      );
    }
  }


}
