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

  /** Публичный метод, который загружает и сохраняет данные пользователя на сервере
   *
   *
   */
  setUserInfo(newData) {

    //если пришли "готовые" данные
    if (newData) {
      //необходимо сохранить данные на сервере
      getFetchResult(`https://mesto.nomoreparties.co/v1/${cohort}/users/me`,
        { method: "PATCH",
          headers: {
            authorization: token,
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              name: newData.user_name,
              about: newData.about_self
            })
          },
        // сall-back, который будет вызван, как только данные будут готовы!
        (result) => {
          // установим имя и род занятий
          this._userName = result.name;
          this._userAboutSelf = result.about;
          //this._avatar = result.avatar;

          // обновим данные в разметке
          title.textContent = this._userName;
          subtitle.textContent = this._userAboutSelf;
        },
        // сall-back, который будет вызван в случае ошибки!
        (err) => {
          // обновим данные в разметке
          //title.textContent=this._userName;
          //subtitle.textContent=this._userAboutSelf;
        }
      );
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
