import { Component, OnInit } from '@angular/core';
import { StoreService } from '../../core/services/store.service';
import { errors } from '../../core/error.messages';

@Component({
  selector: 'app-alert-model',
  templateUrl: './alert-model.component.html',
  styleUrls: ['./alert-model.component.scss']
})
export class AlertModelComponent implements OnInit {

  showErrorAlert = false;
  errorMessage: string;
  constructor(private storeService: StoreService) { }

  ngOnInit() {
    this.storeService.showErrorAlert.subscribe((error) => {
      if (error.length > 0) {
        this.errorMessage = error;
        this.showErrorAlert = true;
        this.hideErrorAfterDelay();
      }
    });
  }

  hideErrorAfterDelay() {
    setTimeout(() => {
      this.showErrorAlert = false;
    }, 4000);
  }

  onCloseErrorModel() {
    this.showErrorAlert = false;
  }

}
