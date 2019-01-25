import { Component, OnInit, Input } from '@angular/core';
import { TariffProfile } from '../../../core/interfaces/tariff.profile.interface';

@Component({
  selector: 'app-tarrif-profile',
  templateUrl: './tarrif-profile.component.html',
  styleUrls: ['./tarrif-profile.component.scss']
})
export class TarrifProfileComponent implements OnInit {

  @Input() tariffProfileArray: TariffProfile[];
  constructor() { }

  ngOnInit() {
  }

}
