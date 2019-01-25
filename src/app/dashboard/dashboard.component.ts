import { Router } from '@angular/router';
import { Events } from './../core/interfaces/events.interface';
import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../core/services/dashboard.service';
import { Summery, SummeryDetail } from '../core/interfaces/Summery.interface';
import { Details } from '../shared/detail.model';
import { StoreService } from '../core/services/store.service';
import { errors } from '../core/error.messages';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  summery: Summery;
  detailArray: Details[] = [];
  events: Events[];

  constructor(private service: DashboardService, private _router: Router, private storeService: StoreService) {
    for (const key in SummeryDetail) {
      if (SummeryDetail.hasOwnProperty(key)) {
        const obj = new Details();
        obj.title = SummeryDetail[key];
        this.detailArray.push(obj);
      }
    }
  }

  get router() {
    return this._router;
  }
  ngOnInit() {
    this.loadDashboardSummery();
    this.loadEvents();
    console.log('detailArray', this.detailArray);
  }

  private loadEvents() {
    this.service.getEvents().subscribe((res: Events[]) => {
      this.events = res;
    }, () => {
      // todo : for display error purposes in future
      // this.storeService.showErrorAlert.next(errors.systemEvents);
    });
  }

  private loadDashboardSummery() {
    this.service.getDashboardSummery().subscribe((response: Summery) => {
      this.summery = response;
      this.detailArray = [];
      for (const key in this.summery) {
        if (this.summery.hasOwnProperty(key)) {
          const obj = new Details();
          obj.title = SummeryDetail[key];
          obj.value = this.summery[key];
          if (key === 'orgCount') {
            this.detailArray.splice(1, 0, obj);
          } else {
            this.detailArray.push(obj);
          }
        }
      }
    }, () => {
      // todo : for display error purposes in future
      // this.storeService.showErrorAlert.next(errors.dashboardSummery);
    });
  }

}
