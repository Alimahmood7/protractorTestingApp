import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { endPoints } from '../config';
import { map } from 'rxjs/operators';
@Injectable()
export class DashboardService {

  constructor(private httpClient: HttpClient) { }


  getESimInformation(value) {
    const params = new HttpParams().set('eid', value);
    return this.httpClient.get(endPoints.dashboard, { params });
  }
  ESimSwitch(id) {
    const body = new HttpParams()
      .set('purchaseId', id);
    return this.httpClient.post(endPoints.dashboard, body.toString());
  }


}
