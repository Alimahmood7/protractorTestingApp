import {endPoints} from './../config';
import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class UserManagementService {

  constructor(private httpClient: HttpClient) {
  }

  addAgents(data: any) {
    console.log(data);
    const body = new HttpParams()
    .set('password', data.password)
    .set('phone', data.phone)
    .set('firstName', data.firstName)
    .set('email', data.email);
    return this.httpClient.post(endPoints.users, body.toString());
  }
  editAgent(data: any, userId: string) {
    console.log(data);
    let body: any;
    if (data.password !== '') {
      body = new HttpParams().set('userId', userId)
        .set('phone', data.phone)
        .set('firstName', data.firstName)
        .set('email', data.email)
        .set('password', data.password);
    } else {
      body = new HttpParams().set('userId', userId)
        .set('phone', data.phone)
        .set('firstName', data.firstName)
        .set('email', data.email);
    }
    return this.httpClient.put(endPoints.users, body.toString());
  }

  getAgents() {
    return this.httpClient.get(endPoints.userList)
    .catch( (e) => {
      console.log(e);
      return e;
    });
}

  blockUser(userStatus: boolean, userId: string) {
    const body = new HttpParams().set('userId', userId)
      .set('isBlocked', userStatus ? 'true' : 'false' );
    return this.httpClient.put(endPoints.users, body.toString());
  }

}
