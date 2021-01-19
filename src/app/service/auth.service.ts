import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    // tslint:disable-next-line:variable-name
    private _isAuthenticated = true;
    // tslint:disable-next-line:variable-name
    private _userId = 'abc';

    constructor() {
    }

    login() {
        this._isAuthenticated = !this._isAuthenticated;
    }

    logout() {
        this._isAuthenticated = !this._isAuthenticated;
    }

    get isAuthenticated() {
        return this._isAuthenticated;
    }

    get userId() {
        return this._userId;
    }
}
