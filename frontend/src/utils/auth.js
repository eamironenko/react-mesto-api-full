export const BASE_URL = 'https://api.mironenko.students.nomoredomains.sbs';
/*export const BASE_URL = 'http://localhost:3000';*/

function setToken(res) {
    if (res.token) {
        localStorage.setItem('token', res.token);
        return res;
    }
}

function handleResponse(res) {
    if (res.ok) {
        return res.json();
    } else {
        return Promise.reject('Ошибка: $(res.status)');
    }
}

export const register = (email, password) => {
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: "application/json"
        },
        body: JSON.stringify({ password, email })
    })
        .then(handleResponse)
};

export const authorize = (email, password) => {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: {
            Accept: "application/json",
            'Content-Type': 'application/json',
            /*Authorization: `Bearer ${localStorage.getItem('jwt')}`*/
        },
        body: JSON.stringify({ password, email })
    })
        .then(handleResponse)
        .then(setToken)

}

export const checkToken = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
            Accept: "application/json",
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    })
        .then(handleResponse)
}