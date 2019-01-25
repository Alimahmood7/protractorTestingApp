import { endPoints } from './../config';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import * as jwt from 'jwt-decode';
import { tokenNotExpired } from 'angular2-jwt';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthenticationService {

  constructor(private httpClient: HttpClient, private router: Router) {
  }

  getToken(authorizationCode) {
    const body = new HttpParams().set('code', authorizationCode);
    return this.httpClient.post(
      endPoints.token,
      body.toString(),
    ).map(response => {
      console.log('res', response);
      if (response && response['access_token'] && response['id_token']) {
        localStorage.setItem('accessToken', response['access_token']);
        localStorage.setItem('idToken', response['id_token']);
        return true;
      } else { return false; }
    });
  }
  isLoggedIn() {
    if (localStorage.getItem('accessToken')) { return true; }
    return false;
  }

  isAdminLoggedIn() {
    const token = localStorage.getItem('accessToken');
    if (token) {
      const jwtToken = jwt(token);
      const userType = jwtToken['user']['type'];
      if (userType === '1') {
        return true;
      }
    }
    return false;
  }
  isTokenExpire() {
    return !tokenNotExpired();
  }

  logout() {
    const body = new HttpParams()
      .set('id_token', localStorage.getItem('idToken'));
    return this.httpClient.post(
      endPoints.logout,
      body.toString(),
    ).do(() => {
      localStorage.clear();
      this.router.navigate(['/login']);
    }).catch((error) => {
      localStorage.clear();
      this.router.navigate(['/login']);
      return Observable.throw(error);
    });
  }

  refreshToken() {
    const idToken = localStorage.getItem('idToken');
    const body = new HttpParams().set('id_token', idToken);
    return this.httpClient.post(
      endPoints.accessToken,
      body.toString()
    ).map(response => {
      if (response && response['access_token']) {
        localStorage.setItem('accessToken', response['access_token']);
        return true;
      } else { return false; }
    }).catch((error) => {
      return Observable.throw(error);
    });
  }
}
