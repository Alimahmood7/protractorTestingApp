import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DashboardService } from '../../../core/services/dashboard.service';
import { SmsStatus } from '../../../core/interfaces/sms.status.interface';
import { StoreService } from '../../../core/services/store.service';
import { errors } from '../../../core/error.messages';

@Component({
  selector: 'app-send-message',
  templateUrl: './send-message.component.html',
  styleUrls: ['./send-message.component.scss']
})
export class SendMessageComponent implements OnInit {

  @Input() endpointId: string;
  @Input() subOrgId: number;
  @Input() index: number;
  @Output() valueChange = new EventEmitter<any>();
  messageField: FormControl;
  smsStatusLog: SmsStatus[] = [];

  constructor(private dashboardService: DashboardService, private storeService: StoreService) {
  }

  ngOnInit() {
    this.messageField = new FormControl();
    this.loadSmsLog();

    this.storeService.loadSMSEvents.subscribe((data: number) => {
      if (data === this.index) {
        this.loadSmsLog();
      }
    });
  }

  onSendMessage(messageVale: string) {
    if (messageVale && messageVale.length > 0) {
      this.storeService.showLoading.next(true);
      this.messageField.setValue('');
      this.dashboardService.sendSms(this.endpointId, messageVale, this.subOrgId).subscribe(() => {
        this.storeService.showLoading.next(false);
        setTimeout(() => {
          this.loadSmsLog();
        }, 10000);
      }, () => {
        this.storeService.showLoading.next(false);
        // todo : for display error purposes in future
        //  this.storeService.showErrorAlert.next(errors.sendSms);
      });

    }
  }

  loadSmsLog() {
    this.dashboardService.getSmsStatus(this.endpointId, this.subOrgId).subscribe((response: SmsStatus[]) => {
      this.smsStatusLog = response;
      this.valueChange.emit({
        index: this.index,
        log: this.smsStatusLog
      });
    }, () => {
      // todo : for display error purposes in future
      //  this.storeService.showErrorAlert.next(errors.smsLog);
    });
  }
}
