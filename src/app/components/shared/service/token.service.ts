import { Injectable } from '@angular/core';

const TOKEN = 'TOKEN';
const USERNAME = 'USERNAME';

@Injectable({
  providedIn: 'root'
})

export class TokenService {

  constructor() { }

  public setToken(token : string) : void{
    window.sessionStorage.removeItem(TOKEN);
    window.sessionStorage.setItem(TOKEN, token);
  }

  public getToken() : string{
    return window.sessionStorage.getItem(TOKEN);
  }

  public setUsername(username : string) : void{
    window.sessionStorage.removeItem(USERNAME);
    window.sessionStorage.setItem(USERNAME, username);
  }

  public getUsername() : string{
    return window.sessionStorage.getItem(USERNAME);
  }

  public removeToken() : void{
    window.sessionStorage.removeItem(TOKEN);
    window.sessionStorage.removeItem(USERNAME);
  }
}


