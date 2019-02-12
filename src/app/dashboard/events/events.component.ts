import { Component, OnInit, Input } from '@angular/core';
import {Events} from '../../core/interfaces/events.interface';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {

  @Input()
  eventList: Events[];
  constructor() { }

  ngOnInit() {
  }

}
