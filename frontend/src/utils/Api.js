class Api {
    constructor(options) {
        this.url = options.url  
      // this.headers = options.headers;
    }

    _handleResponse(res) {
        if (res.ok) {
            return res.json();
        } else {
            return Promise.reject('Ошибка');
        }
    }

    //получить данные пользователя(get)
    getUserInformation() {
        return fetch(this.url + '/users/me', {
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${localStorage.getItem('jwt')}`
            },
        })
            .then(this._handleResponse)
    }
    //карточки в виде массива(get)
    getInitialCards() {
        return fetch(this.url + '/cards', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('jwt')}`,
                "Content-Type": "application/json",
              },
        })
            .then(this._handleResponse)
    };

    //добавть карточку (post)
    addNewCard(newCard) {
        return fetch(this.url + '/cards/', {
            method: 'POST',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem('jwt')}`,
              },
            body: JSON.stringify({
                name: newCard.name,
                link: newCard.link,
            }),
        })
            .then(this._handleResponse)
    }

    //удалить карточку (delete)
    handleDeleteCard(idCard) {
        // eslint-disable-next-line no-useless-concat
        return fetch(this.url + '/cards/' + idCard, {
            method: 'DELETE',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem('jwt')}`,
              },
        })
            .then(this._handleResponse)
    }

    //заменить данные пользователя(patch)
    editProfileForm(formData) {
        return fetch(this.url + '/users/me', {
            method: 'PATCH',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem('jwt')}`,
              },
            body: JSON.stringify({
                name: formData.name,
                about: formData.about,
            }),
        })
            .then(this._handleResponse)
    }

    //заменить аватар(patch)
    editUserAvatar(formData) {
        return fetch(this.url + '/users/me/avatar', {
            method: 'PATCH',
            headers:  {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem('jwt')}`,
              },
            body: JSON.stringify({
                avatar: formData,
            })
        })
            .then(this._handleResponse)
    }
    //поставить лайк
    handleLikeCard(idCard, like) {
        return fetch(this.url + '/cards/' + idCard + '/likes', {
            method: like ? 'PUT' : 'DELETE',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem('jwt')}`,
              },
        })
            .then(this._handleResponse)
    }
}

export const api = new Api({
    url: 'https://api.mironenko.students.nomoredomains.sbs',
   /* url: 'http://localhost:3000',*/
  });