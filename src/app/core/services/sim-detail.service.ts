import { endPoints } from './../config';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable()
export class SimDetailService {

  constructor(private httpClient: HttpClient) {
  }

  getTariffProfile(id: any, subOrgId: number) {
    const params = new HttpParams().set('subOrgId', subOrgId.toString());
    if (endPoints.tProfile) {
      return this.httpClient.get(endPoints.tProfile + '/' + id, { params: params });
    }
  }

  getEvents(iccid: any, subOrgId: number) {
    const params = new HttpParams().set('iccid', iccid).set('subOrgId', subOrgId.toString());
    return this.httpClient.get(endPoints.events, { params: params });
  }

  updateSimStatus(simId: number, subOrgId: number, simStatus: string) {
    const params = new HttpParams().set('status', simStatus).set('subOrgId', subOrgId.toString());
    return this.httpClient.get(endPoints.simStatus + '/' + simId, { params: params });
  }

}
