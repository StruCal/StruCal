import { Injectable } from '@angular/core';
import { View3dService } from '../view3d/view3d.service';
import { HttpService } from '../http.service';
import { calculationsInputBuilder } from '../../common/calculations/calculationInputBuilder';
import { mockedStructureGeometry } from '../../common/mocks/mockedStructureGeometry';
import { mockedMovingLoad } from '../../common/mocks/mockedMovingLoad';
import { StructureGeometry } from '../../common/structure/structureGeometry';


@Injectable()
export class ControlPanelService {

  constructor(private httpService: HttpService,
    private view3dService: View3dService) { }

  calculate() {
    const input = calculationsInputBuilder()
    .setStructureGeometry(this.view3dService.getStructureGeometry())
    .setStructureData(this.view3dService.getStructureData())
    .setMovingLoad(this.getMovingLoad())
    .setTimeSettings()
    .build();

  this.httpService.getResult(input).subscribe(data => {
    this.view3dService.drawResults(data);
  });
  }

  private getMovingLoad() {
    return mockedMovingLoad;
  }

  private getStructureGeometry(): StructureGeometry {
    return mockedStructureGeometry;
  }
}
