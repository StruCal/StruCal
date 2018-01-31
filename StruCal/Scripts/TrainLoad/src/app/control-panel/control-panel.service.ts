import { Injectable } from '@angular/core';
import { View3dService } from '../view3d/view3d.service';
import { HttpService } from '../services/http.service';
import { calculationsInputBuilder } from '../../common/calculations/calculationInputBuilder';
import { mockedStructureGeometry } from '../../common/startData/mockedStructureGeometry';
import { mockedMovingLoad } from '../../common/startData/mockedMovingLoad';
import { StructureGeometry } from '../../common/structure/structureGeometry';
import { section1Builder } from '../../common/sectionBuilders/section1Builder';
import { StructureService } from '../services/structure.service';
import { Section } from '../../common/structure/section';
import { startSection1 } from '../../common/startData/mockedSection1';
import { MovingLoad } from '../../common/movingLoad/movingLoad';


@Injectable()
export class ControlPanelService {

  private section: Section;
  private movingLoad: MovingLoad;

  constructor(private httpService: HttpService,
    private view3dService: View3dService,
    private structureService: StructureService) {
    this.structureService.section$.subscribe(e => {
      this.section = e;
      this.setStructure();
    });
    this.structureService.trainLoad$.subscribe(e => this.movingLoad = e);
  }

  calculate() {
    const input = calculationsInputBuilder()
      .setStructureGeometry(this.view3dService.getStructureGeometry())
      .setStructureData(this.view3dService.getStructureData())
      .setMovingLoad(this.movingLoad)
      .setTimeSettings()
      .build();

      this.httpService.getResult(input).subscribe(data => {
        this.view3dService.drawResults(data, this.movingLoad);
      });
  }

  setStructure() {
    const str = this.getStructureGeometry();
    this.view3dService.drawStructure(str);
  }


  private getStructureGeometry(): StructureGeometry {
    mockedStructureGeometry.bars.forEach(e => e.section = this.section);
    return mockedStructureGeometry;
  }
}
