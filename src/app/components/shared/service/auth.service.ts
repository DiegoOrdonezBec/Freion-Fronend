import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginRequest } from '../models/login-request';
import { Message } from '../models/message';
import { SignupRequest } from '../models/signup-request';
import { TokenDTO } from '../models/tokenDTO';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private authApiUrl = 'http://localhost:8080/api/auth';

  constructor(private httpClient : HttpClient) { }

  public signup(signupRequest : SignupRequest) : Observable<Message>{
    return this.httpClient.post<Message>(this.authApiUrl + "/signup", signupRequest);
  }

  public login(loginRequest : LoginRequest) : Observable<TokenDTO>{
    return this.httpClient.post<TokenDTO>(this.authApiUrl + "/login", loginRequest);
  }

  public validateToken(tokenDTO : TokenDTO) : Observable<Boolean>{
    return this.httpClient.post<Boolean>(this.authApiUrl + "/validate", tokenDTO);
  }

  public logout() : Observable<void>{
    return this.httpClient.post<void>(this.authApiUrl + "/logout", null);
  }
}
