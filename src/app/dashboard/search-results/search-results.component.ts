import { StoreService } from './../../core/services/store.service';
import { Component, OnInit } from '@angular/core';
import { ResultHeaders, SearchResult } from '../../core/interfaces/search.interface';
import { SearchService } from '../../core/services/search.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { errors } from '../../core/error.messages';

@Component({
  selector: 'app-table',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit {
  resultHeaders = ResultHeaders;
  time = new Date();
  simDetailArray: SearchResult[];
  // @Input()
  searchResults: SearchResult[];

  constructor(private searchService: SearchService, private storeService: StoreService,
    private spinnerService: Ng4LoadingSpinnerService) {
    const storeDataString = localStorage.getItem('search_results');
    this.searchResults = [];
    this.simDetailArray = [];
    if (storeDataString) {
      this.searchResults = JSON.parse(storeDataString);
    }
  }

  ngOnInit() {
    this.storeService.showLoading.subscribe((showLoading: boolean) => {
      if (showLoading) {
        this.spinnerService.show();
      } else {
        this.spinnerService.hide();
      }
    });

    this.searchService.searchResults.subscribe((results: SearchResult[]) => {
     this.storeService.showLoading.next(false);
      if (results && results.length > 0) {
        results.forEach((element, i) => {
          const index = this.searchResults.findIndex((simDetail) => simDetail.iccid === element.iccid);
          if (index === -1) {
            this.searchResults.unshift(element);
          } else {
            this.searchResults[index] = element;
          }
        });
        localStorage.setItem('search_results', JSON.stringify(this.searchResults));
      } else if (results !== null) {
        this.storeService.showErrorAlert.next(errors.searchResult);
        this.searchService.searchResults.next(null);
      }
    });
  }

  // TODO: update logic
  goToSms() {
    this.storeService.selectedTab.next(true);
  }

  showSimDetails(simDetail: SearchResult, event: any) {
    const index = this.simDetailArray.findIndex((i) => i.iccid === simDetail.iccid);
    if (index === -1) {
      this.simDetailArray.push(simDetail);
    }
    this.storeService.simStore.next(this.simDetailArray);
    if (event.target.innerHTML === 'SMS') {
      this.storeService.selectedTab.next(true);
    } else {
      this.storeService.selectedTab.next(false);
    }
  }
}
