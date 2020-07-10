import { Component, OnInit, Input } from '@angular/core';
import { DailyForecast } from 'src/app/weatherModule/models/forcast';

@Component({
  selector: 'app-forcast-card',
  templateUrl: './forcast-card.component.html',
  styleUrls: ['./forcast-card.component.css']
})
export class ForcastCardComponent implements OnInit {

  constructor() { }

  @Input() forcast: DailyForecast;

  ngOnInit(): void { }

}
