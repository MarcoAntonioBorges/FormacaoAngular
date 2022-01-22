import { Injectable } from '@angular/core';

const KEY_LOCALSTORAGE = 'token';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  returnToken() {
    return localStorage.getItem(KEY_LOCALSTORAGE) ?? '';
  }

  saveToken(token: string) {
    localStorage.setItem(KEY_LOCALSTORAGE, token);
  }

  deleteToken() {
    localStorage.removeItem(KEY_LOCALSTORAGE);
  }

  hasToken() {
    return !! this.returnToken();
  }
}
