export const BASE_URL = 'https://auth.nomoreparties.co/';

export const register = (email, password) => {
    return fetch('${BASE_URL}/sign-up', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email,
            password
        })
    }).then(res => res.json())
        .catch((err) => console.log(err));
}

export const login = (email, password) => {
    return fetch('${BASE_URL}/sign-in', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email,
            password
        })
    }).then(res => res.json())
        .catch((err) => console.log(err));
}

export const checkToken = (token) => {
    return fetch('${BASE_URL}/me', {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ${token}'
        }
    }).then(res => res.json())
        .catch((err) => console.log(err));
}