import { Component, OnInit } from '@angular/core';
import { AccelerationGaugeService } from '../services/acceleration-gauge.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'acceleration-gauge',
  templateUrl: './acceleration-gauge.component.html',
  styleUrls: ['./acceleration-gauge.component.css']
})
export class AccelerationGaugeComponent implements OnInit {

  public value: number;
  public invisible = true;

  constructor(private accelerationGaugeService: AccelerationGaugeService) {

  }

  ngOnInit() {
    this.accelerationGaugeService.value$.subscribe(v => this.value = v);
    this.accelerationGaugeService.invisible$.subscribe(v => this.invisible = v);
  }

}
