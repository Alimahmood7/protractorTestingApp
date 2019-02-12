import { endPoints } from './../config';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SearchResult } from '../interfaces/search.interface';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class SearchService {

  searchResults: BehaviorSubject<SearchResult[]> = new BehaviorSubject<SearchResult[]>(null);
  constructor(private httpClient: HttpClient) { }

  search(iccid: string) {
    const params =  new HttpParams().set('iccid', iccid );
    this.httpClient.get(endPoints.search, { params : params })
    .subscribe((response: SearchResult[]) => {
      response.forEach(element => {
        element.refreshTime = Date.now();
        element.count = 20;
      });
      this.searchResults.next(response);
    });
  }

  getUserProfile() {
   return this.httpClient.get(endPoints.users);
  }

}
