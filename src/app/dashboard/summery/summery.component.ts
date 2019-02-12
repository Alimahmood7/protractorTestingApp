import { Component, OnInit, Input } from '@angular/core';
import { Details } from '../../shared/detail.model';

@Component({
  selector: 'app-summery',
  templateUrl: './summery.component.html',
  styleUrls: ['./summery.component.scss']
})
export class SummeryComponent implements OnInit {
  @Input() detail: Details;
  constructor() { }

  ngOnInit() {
    console.log(this.detail);
  }

}
