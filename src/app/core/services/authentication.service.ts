import { endPoints } from './../config';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class AuthenticationService {

  constructor(private httpClient: HttpClient, private router: Router) {
  }

  login(username, password) {
    const body = new HttpParams()
      .set('email', username)
      .set('password', password);
    return this.httpClient.post(endPoints.login, body.toString());
  }


  isLoggedIn() {
    if (localStorage.getItem('accessToken')) { return true; }
    return false;
  }
}
