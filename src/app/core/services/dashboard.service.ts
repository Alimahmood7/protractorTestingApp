import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { endPoints } from '../config';
import * as moment from 'moment-timezone';
import { Events } from '../interfaces/events.interface';
import { map } from 'rxjs/operators';
@Injectable()
export class DashboardService {

  constructor(private httpClient: HttpClient) { }

  getEvents() {
    return this.httpClient.get(endPoints.events);
  }

  getDashboardSummery() {
    return this.httpClient.get(endPoints.dashboard);
  }

  sendSms(endpointId: string, message: string, subOrgId: number) {
    const body = new HttpParams()
      .set('endpointId', endpointId)
      .set('message', message)
      .set('subOrgId', subOrgId.toString());

    return this.httpClient.post(endPoints.sms, body.toString());
  }

  getSmsStatus(endpointId: string, subOrgId: number) {
    const params = new HttpParams().set('subOrgId', subOrgId.toString());
    if (endpointId) {
      return this.httpClient.get(endPoints.sms + '/' + endpointId, { params: params });
    }
  }


}
