import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { SearchResult } from '../../../core/interfaces/search.interface';
import {StoreService} from '../../../core/services/store.service';
import {errors} from '../../../core/error.messages';

@Component({
  selector: 'app-sim-information',
  templateUrl: './sim-information.component.html',
  styleUrls: ['./sim-information.component.scss']
})
export class SimInformationComponent implements OnInit {
  @ViewChild('uiDataSliderProgress') elDataSliderProgress;
  @ViewChild('uiSmsSliderProgress') elSmsSliderProgress;
  @Input()
  simInfo: SearchResult;

  dataRange: any = 1;
  smsRange: any = 1;
  sliderConfig: any;
  smsTotal: number;
  smsConsumed: number;
  dataConsumed: number;
  constructor(private storeService: StoreService) { }

  ngOnInit() {
    this.sliderConfig = {
      behaviour: 'drag',
    };
    this.smsTotal = Math.round(this.simInfo.usage.sms.sentLimit) + Math.round(this.simInfo.usage.sms.receivedLimit);
    this.smsConsumed = Math.round(this.simInfo.usage.sms.sent) + Math.round(this.simInfo.usage.sms.received);
    this.dataConsumed = Math.round(this.simInfo.usage.data.downUsed) + Math.round(this.simInfo.usage.data.upUsed);
    this.dataRange = Math.round((this.dataConsumed * 100) / Math.round(this.simInfo.usage.data.limit));
    this.smsRange = Math.round((this.smsConsumed * 100) / Math.round(this.smsTotal));

    setTimeout(() => {
      if (this.elDataSliderProgress) {
        this.setProgress((this.elDataSliderProgress.el.nativeElement as HTMLElement), this.dataRange.toString());
        this.setProgress((this.elSmsSliderProgress.el.nativeElement as HTMLElement), this.smsRange.toString());
      }
    }, 10);
  }
  setProgress(element: HTMLElement, width: string) {
    const w = Number(width) >= 100 ? '100' : width.toString();
    const elem = element.getElementsByClassName('noUi-connects');
    (elem.item(0) as HTMLElement).style.width = w.concat('%');
  }

}
