import { Router } from '@angular/router';
<<<<<<< HEAD
import { Component, OnInit, TemplateRef } from '@angular/core';
import { DashboardService } from '../core/services/dashboard.service';
import { StoreService } from '../core/services/store.service';
import { errors } from '../core/error.messages';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
=======
import { Events } from './../core/interfaces/events.interface';
import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../core/services/dashboard.service';
import { Summery, SummeryDetail } from '../core/interfaces/Summery.interface';
import { Details } from '../shared/detail.model';
import { StoreService } from '../core/services/store.service';
import { errors } from '../core/error.messages';
>>>>>>> 0f8111293c522a76e4ccad0b0a175c57078ce48b

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  esimData: any = [];
  enableSwitch: boolean;
  enableSwitchBtn: boolean;
  profileSwitch: boolean;
  iccid: any;
  esimObject: any = {};
  modalRef: BsModalRef | null;
  modalRef2: BsModalRef | null;
  nowDate: any;
  constructor(
    private service: DashboardService,
    private modalService: BsModalService,
    private _router: Router, private storeService: StoreService) {
    this.nowDate = new Date();
  }

  ngOnInit() {
    this.enableSwitch = true;
    this.enableSwitchBtn = true;
    this.profileSwitch = false;
    // if (!this.storeService.loggedIn.getValue()) {
    //   this._router.navigate(['/login']);
    // }
  }
  getEsimInformation(value: any) {
    this.service.getESimInformation(value).subscribe(resp => {
      this.esimData = resp;
      this.enableSwitchBtn = false;
      this.esimData.map((res: any) => {
        if (res['state'] === 'Enabled') {
          this.esimObject = res;
        }
      });
    });
  }
  changeStatus(id) {
    this.iccid = id;
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: '' });
  }
  openModal2(template: TemplateRef<any>) {
    this.modalRef2 = this.modalService.show(template, { class: 'seconday-modal' });
    this.modalRef.hide();
  }
  closeFirstModal() {
    if (!this.modalRef) {
      return;
    }

    this.modalRef.hide();
    this.modalRef = null;
  }
  selectEid(value: any) {
    this.getEsimInformation(value);
  }

  switchProfile() {
    this.service.ESimSwitch(this.iccid).subscribe(res => {
      if (res['success']) {
        const index = this.esimData.findIndex((simDetail) => simDetail.id === this.iccid);
        this.esimData.map(sim => {
          sim['state'] = 'Disabled';
        });
        this.esimData[index].state = 'Enabled';
        this.esimObject = this.esimData[index];
        this.modalRef2.hide();
        this.profileSwitch = true;
      }
    });
  }


}
