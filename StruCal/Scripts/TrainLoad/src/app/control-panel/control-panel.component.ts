import { Component, OnInit } from '@angular/core';
import { View3dService } from '../view3d/view3d.service';
import { ControlPanelService } from './control-panel.service';

@Component({
  selector: 'control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.css']
})
export class ControlPanelComponent implements OnInit {

  constructor(private controlPanelService: ControlPanelService) { }

  ngOnInit() {
  }

  calculate() {
    this.controlPanelService.calculate();

  }

}
