import { Component, OnInit, Input } from '@angular/core';
import {Events} from '../../../core/interfaces/events.interface';

@Component({
  selector: 'app-events-log',
  templateUrl: './events-log.component.html',
  styleUrls: ['./events-log.component.scss']
})
export class EventsLogComponent implements OnInit {
  @Input() events: Events[];
  constructor() { }

  ngOnInit() {
  }

}
