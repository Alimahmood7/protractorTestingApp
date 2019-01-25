import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {endPoints} from './../config';
import {Injectable} from '@angular/core';

@Injectable()
export class StoreService {
  simStore = new BehaviorSubject<Array<Object>>([]);
  selectedTab = new BehaviorSubject<boolean>(false);
  showLoading = new BehaviorSubject<boolean>(false);
  startExport = new BehaviorSubject<boolean>(false);
  showErrorAlert = new BehaviorSubject<string>('');
  loadSMSEvents = new BehaviorSubject<number>(-1);

  constructor() {
    this.simStore.next(null);
    this.selectedTab.next(false);
    this.showLoading.next(false);
    this.startExport.next(false);
    this.showErrorAlert.next('');
    this.loadSMSEvents.next(-1);
  }


}
