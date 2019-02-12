import { SimDetailService } from './../../core/services/sim-detail.service';
import { StoreService } from './../../core/services/store.service';
import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { TabsetComponent } from 'ngx-bootstrap';
import { SearchResult } from '../../core/interfaces/search.interface';
import { SearchService } from '../../core/services/search.service';
import { TariffProfile } from '../../core/interfaces/tariff.profile.interface';
import { Events } from '../../core/interfaces/events.interface';
import { errors } from '../../core/error.messages';

@Component({
  selector: 'app-sim-detail',
  templateUrl: './sim-detail.component.html',
  styleUrls: ['./sim-detail.component.scss']
})

export class SimDetailComponent implements OnInit, OnDestroy {
  @ViewChild('mainElement') mainElement: ElementRef;
  private simDetailTabs: TabsetComponent;
  @ViewChild('simDetailTabs') set tabset(simDetailTabs: TabsetComponent) {
    this.simDetailTabs = simDetailTabs;
  }

  selectedIndex = -1;
  selectedIccId: string;
  openedSimDetailArray: SearchResult[] = [];
  exportData: SearchResult;
  timer;
  defaultPosition;

  tariffProfileId: number;
  iccid: string;
  smsTab: boolean;

  constructor(
    private searchService: SearchService,
    private storeService: StoreService,
    private simDetailService: SimDetailService) {
    this.smsTab = false;
  }

  ngOnInit() {
    const center = window.innerWidth / 2 - 294;
    this.defaultPosition = { x: center, y: -70 };
    this.storeService.selectedTab.subscribe((data) => {
      this.smsTab = data;
    });

    this.searchService.searchResults.subscribe((results: SearchResult[]) => {
      if (results && this.openedSimDetailArray !== null) {
        results.forEach((sim) => {
          const index = this.openedSimDetailArray.findIndex((simDetail) => simDetail.iccid === sim.iccid);
          if (index !== -1) {
            this.copyUpdatedValues(index, sim);
          }
        });
      }
    });

    this.timer = setInterval(() => {
      if (this.selectedIndex > -1) {
        this.openedSimDetailArray[this.selectedIndex].count--;
        if (this.openedSimDetailArray[this.selectedIndex].count === 0) {
          this.onRefresh(this.selectedIndex);
        }
      }
    }, 1000);

    this.storeService.simStore.subscribe((data: SearchResult[]) => {
      this.openedSimDetailArray = data;
      if (this.openedSimDetailArray !== null && this.openedSimDetailArray.length === 1) {
        this.selectedIndex = 0;
        this.selectedIccId = this.openedSimDetailArray[0].iccid;
        this.openedSimDetailArray[0].isActive = true;
      } else if (this.openedSimDetailArray !== null && this.openedSimDetailArray.length > 1) {
        this.unSelectAllDives();
        this.selectedIndex = this.openedSimDetailArray.length - 1;
        this.selectedIccId = this.openedSimDetailArray[this.selectedIndex].iccid;
        this.openedSimDetailArray[this.selectedIndex].isActive = true;
      }
      if (this.selectedIndex > -1) {
        this.onSelectTProfile(this.selectedIndex);
        this.onSelectEvent(this.selectedIndex);
      }
    });
  }

  copyUpdatedValues(index: number, simDetail: SearchResult) {
    this.openedSimDetailArray[index].clientName = simDetail.clientName;
    this.openedSimDetailArray[index].network = simDetail.network;
    this.openedSimDetailArray[index].service = simDetail.service;
    this.openedSimDetailArray[index].usage = simDetail.usage;
    this.openedSimDetailArray[index].tariffProfileId = simDetail.tariffProfileId;
    this.openedSimDetailArray[index].productionDate = simDetail.productionDate;
    this.openedSimDetailArray[index].createdDate = simDetail.createdDate;
  }

  sendSearch() {
    this.searchService.search(this.selectedIccId);
  }

  onSelected(index: number) {
    console.log('index', index);
    if (this.selectedIndex !== index) {
      this.selectedIndex = index;
      this.unSelectAllDives();
      this.openedSimDetailArray[index].isActive = true;
      this.selectedIccId = this.openedSimDetailArray[index].iccid;
      this.openedSimDetailArray[index].count = 20;
    }
  }

  unSelectAllDives() {
    this.openedSimDetailArray.forEach(sim => {
      sim.isActive = false;
      sim.count = 20;
    });
  }

  CloseDiv(index: any) {
    this.openedSimDetailArray[index].count = 20;
    this.openedSimDetailArray.splice(index, 1);
    this.selectedIndex = this.openedSimDetailArray.length - 1;
    if (this.openedSimDetailArray.length > 0) {
      this.selectedIccId = this.openedSimDetailArray[this.selectedIndex].iccid;
      this.openedSimDetailArray[this.selectedIndex].isActive = true;
    }
  }

  onSelectTProfile(index: number) {
    this.tariffProfileId = this.openedSimDetailArray[index].tariffProfileId;
    this.simDetailService.getTariffProfile(this.tariffProfileId, this.openedSimDetailArray[index].subOrgId)
      .subscribe((data: TariffProfile[]) => {
        if (data) {
          this.openedSimDetailArray[index].tariffProfile = data;
        }
      }, () => {
        // todo : for display error purposes in future
        // this.storeService.showErrorAlert.next(errors.tariffProfile);
      });
  }

  onSelectEvent(index: number) {
    this.iccid = this.openedSimDetailArray[index].iccid;
    this.simDetailService.getEvents(this.iccid, this.openedSimDetailArray[index].subOrgId).subscribe((sdata: Events[]) => {
      this.openedSimDetailArray[index].events = sdata;
    }, () => {
      // todo : for display error purposes in future
      //  this.storeService.showErrorAlert.next(errors.sendSms);
    });
  }

  onRefresh(index: number) {
    this.openedSimDetailArray[this.selectedIndex].count = 20;
    this.sendSearch();
    this.onSelectTProfile(this.selectedIndex);
    this.onSelectEvent(this.selectedIndex);
    this.storeService.loadSMSEvents.next(this.selectedIndex);
  }

  onUpdateSimStatus(index: number) {
    this.storeService.showLoading.next(true);
    console.log('update sim status');
    const status = this.openedSimDetailArray[index].network.currentProvisioningStatus === 'Suspended' ? '1' : '2';
    this.simDetailService.updateSimStatus(this.openedSimDetailArray[index].simId, this.openedSimDetailArray[index].subOrgId, status)
      .subscribe(() => {
        this.openedSimDetailArray[index].network.currentProvisioningStatus = (status === '1' ? 'Activated' : 'Suspended');
        this.storeService.showLoading.next(false);
      }, () => {
        // todo : for display error purposes in future
        // this.storeService.showErrorAlert.next(errors.simStatus);
        this.storeService.showLoading.next(false);
      });
  }

  onDataExported() {
    this.exportData = null;
  }

  onSMSLogLoaded(logData: any) {
    const index = logData['index'];
    this.openedSimDetailArray[index].smsStatusLog = logData['log'];
  }

  onExportData(index: number) {
    this.exportData = this.openedSimDetailArray[index];
    this.storeService.startExport.next(true);
  }

  ngOnDestroy() {
    clearInterval(this.timer);
  }


}
