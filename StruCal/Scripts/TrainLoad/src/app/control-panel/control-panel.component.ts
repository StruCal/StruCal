import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { View3dService } from '../view3d/view3d.service';
import { mockedMovingLoad } from '../../3DSolver/mocks/mockedMovingLoad';
import { calculationsInputBuilder } from '../../3DSolver/calculations/calculationInputBuilder';
import { StructureGeometry } from '../../3DSolver/structure/structureGeometry';
import { mockedStructureGeometry } from '../../3DSolver/mocks/mockedStructureGeometry';
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
