/** Класс Api, который предоставляет методы для запросов к сервису mesto
 *
 */
export class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }


  /** Публичный метод для загрузки карточек
   *
   */
  getInitialCards() {
    const request = this._baseUrl + '/cards';
    return fetch(request,
      {
        method: "GET",
        headers: this._headers
      })
      .then(res => {
        if (res.ok) {
          return res.json();
        }

        // если ошибка, отклоняем промис
        return Promise.reject(`Ошибка загруки карточек пользователей: ${res.status}`);
      });
  }

  /** Публичный метод для загрузки пользовательского профиля
   *
   */
  getUserProfile() {
    const request = this._baseUrl + '/users/me';
    return fetch(request,
      {
        method: "GET",
        headers: this._headers
      })
      .then(res => {
        if (res.ok) {
          return res.json();
        }

        // если ошибка, отклоняем промис
        return Promise.reject(`Ошибка загруки профиля пользователя: ${res.status}`);
      });
   }

  /** Публичный метод для удаления карточки
   * @param {object} formPopup - экземпляр popup с подтверждением удаления карточки
   */
  deleteCard(formPopup) {
    const request = this._baseUrl + `/cards/${formPopup.cardId}`;
    // удаляем элемент с сервера
    return fetch(request,
      {
        method: "DELETE",
        headers: this._headers
      })
      .then(res => {
        if (res.ok) {
          return res.json();
        }

        // если ошибка, отклоняем промис
        return Promise.reject(`Ошибка при удалении карточки с сервера: ${res.status}`);
      });
   }

  /** Публичный метод для добавления карточки
   * @param {object} cardData - данные карточки
   */
  addCard(cardData) {
    const request = this._baseUrl + '/cards';
    const newHeaders = this._headers;
    newHeaders['Content-Type'] = 'application/json';
    // отправляем запрос на добавление карточки
    return fetch(request,
      {
        method: "POST",
        headers: newHeaders,
        body: JSON.stringify({
          name: cardData.name,
          link: cardData.link
        })
      })
      .then(res => {
        if (res.ok) {
          return res.json();
        }

        // если ошибка, отклоняем промис
        return Promise.reject(`Ошибка при добавлении карточки на сервер: ${res.status}`);
      });
   }

  /** Публичный метод для сохранения данных профиля пользователя
   * @param {object} profileData - данные карточки
   */
  saveNewProfile(profileData) {
    const request = this._baseUrl + '/users/me';
    const newHeaders = this._headers;
    newHeaders['Content-Type'] = 'application/json';
    // отправляем запрос
    return fetch(request,
      {
        method: "PATCH",
        headers: newHeaders,
        body: JSON.stringify({
          name: profileData.name,
          about: profileData.job
        })
      })
      .then(res => {
        if (res.ok) {
          return res.json();
        }

        // если ошибка, отклоняем промис
        return Promise.reject(`Ошибка при добавлении карточки на сервер: ${res.status}`);
      });
   }

  /** Публичный метод для Обновления автара в профиле пользователя
   * @param {object} newAvatar - ссылка на новый аватар
   */
  updateAvatar(newAvatar) {
    const request = this._baseUrl + '/users/me/avatar';
    const newHeaders = this._headers;
    newHeaders['Content-Type'] = 'application/json';
    // отправляем запрос
    return fetch(request,
      {
        method: "PATCH",
        headers: newHeaders,
        body: JSON.stringify({
          avatar: newAvatar.link
        })
      })
      .then(res => {
        if (res.ok) {
          return res.json();
        }

        // если ошибка, отклоняем промис
        return Promise.reject(`Ошибка при добавлении карточки на сервер: ${res.status}`);
      });
   }

  /** Публичный метод для удаления лайка карточки
   * @param {object} cardId - id карточки
   */
  deleteLike(cardId) {
    const request = this._baseUrl + `/cards/${cardId}/likes`;
    // отправляем запрос
    return fetch(request,
      {
        method: "DELETE",
        headers: this._headers
      })
      .then(res => {
        if (res.ok) {
          return res.json();
        }

        // если ошибка, отклоняем промис
        return Promise.reject(`Ошибка при удалении карточки: ${res.status}`);
      });
   }

     /** Публичный метод для лайка карточки
   * @param {object} cardId - id карточки
   */
  likeCard(cardId) {
    const request = this._baseUrl + `/cards/${cardId}/likes`;
    // отправляем запрос
    return fetch(request,
      {
        method: "PUT",
        headers: this._headers
      })
      .then(res => {
        if (res.ok) {
          return res.json();
        }

        // если ошибка, отклоняем промис
        return Promise.reject(`Ошибка при лайке карточки: ${res.status}`);
      });
   }
}

