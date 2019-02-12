import { BehaviorSubject } from 'rxjs';
import { endPoints } from './../config';
import { Injectable } from '@angular/core';

@Injectable()
export class StoreService {
  showLoading = new BehaviorSubject<boolean>(false);
  loggedIn = new BehaviorSubject<boolean>(false);

  constructor() {
    this.loggedIn.next(false);
  }


}
