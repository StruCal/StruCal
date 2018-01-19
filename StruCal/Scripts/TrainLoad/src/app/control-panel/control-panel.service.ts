import { Injectable } from '@angular/core';
import { View3dService } from '../view3d/view3d.service';
import { HttpService } from '../http.service';
import { calculationsInputBuilder } from '../../common/calculations/calculationInputBuilder';
import { mockedStructureGeometry } from '../../common/mocks/mockedStructureGeometry';
import { mockedMovingLoad } from '../../common/mocks/mockedMovingLoad';
import { StructureGeometry } from '../../common/structure/structureGeometry';
import { section1Builder } from '../../common/sectionBuilders/section1Builder';


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

  setStructure() {
    const str = this.getStructureGeometry();
    this.view3dService.drawStructure(str);
  }

  private getMovingLoad() {
    return mockedMovingLoad;
  }

  private getStructureGeometry(): StructureGeometry {
    const section2 = section1Builder().setHeight(2).setWebThickness(0.03)
      .setTopFlangeWidth(0.5).setTopFlangeThickness(0.01).setBottomFlangeWidth(0.7)
      .setBottomFlangeThickness(0.02).build();
    mockedStructureGeometry.bars.forEach(e => e.section = section2);
    return mockedStructureGeometry;
  }
}
