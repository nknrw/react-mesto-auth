class Auth {
    constructor({ baseUrl, headers }) {
		this._baseUrl = baseUrl;
		this._headers = headers;
	}

    register(userData) {
        return fetch(`${this._baseUrl}/users/`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify(userData),
        }).then((res) => this._getResponseData(res));
    }

    login(userData) {
        return fetch(`${this._baseUrl}/users/login`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify(userData),
        }).then((res) => this._getResponseData(res));
    }

}

export const auth = new Auth({
    baseUrl: 'https://mesto.nomoreparties.co/v1/'
    });