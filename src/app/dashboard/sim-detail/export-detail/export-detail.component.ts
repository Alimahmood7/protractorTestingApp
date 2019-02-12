import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {SearchResult} from '../../../core/interfaces/search.interface';
import * as jsPdf from 'jspdf';
import {StoreService} from '../../../core/services/store.service';
import 'rxjs/add/operator/take';

@Component({
  selector: 'app-export-detail',
  templateUrl: './export-detail.component.html',
  styleUrls: ['./export-detail.component.scss']
})
export class ExportDetailComponent implements OnInit {
  @ViewChild('mainElement') mainElement: ElementRef;
  @Input() simDetail: SearchResult;
  @Output() valueChange = new EventEmitter<any>();

  smsTotal: number;
  smsConsumed: number;
  dataConsumed: number;

  constructor(private storeService: StoreService) { }

  ngOnInit() {
    this.smsTotal = Math.round(this.simDetail.usage.sms.sentLimit) + Math.round(this.simDetail.usage.sms.receivedLimit);
    this.smsConsumed = Math.round(this.simDetail.usage.sms.sent) + Math.round(this.simDetail.usage.sms.received);
    this.dataConsumed = Math.round(this.simDetail.usage.data.downUsed) + Math.round(this.simDetail.usage.data.upUsed);
      console.log('export init');
    this.storeService.startExport.take(1).subscribe((result) => {
      if (result) {
        setTimeout(() => {
          this.onExportData();
        }, 1000);
      }
    });
  }

  onExportData() {
    const html = this.mainElement.nativeElement.innerHTML;
    const doc = new jsPdf('p', 'mm');
    const specialElement = {
      '#editor': function (element, render) {
        return true;
      }
    };
    doc.fromHTML(html, 15, 15, {
      'width': 690,
      'elementHandlers': specialElement
    });

    doc.save('test.pdf');
    setTimeout(() => {
      this.valueChange.emit();
    }, 1500);
   // return xepOnline.Formatter.Format('content', {render: 'download' });
  }

}
