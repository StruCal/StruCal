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
import { StatusBarService } from '../services/status-bar.service';
import { structureGeometryBuilder } from '../../common/structureGeometryBuilder/structureGeometryBuilder';
import { Span } from '../../common/structure/span';
import { AccelerationGaugeService } from './acceleration-gauge.service';


@Injectable()
export class ControlPanelService {

  private section: Section;
  private movingLoad: MovingLoad;
  private span: Span;

  constructor(private httpService: HttpService,
    private view3dService: View3dService,
    private structureService: StructureService,
    private statusBarService: StatusBarService,
    private accelerationGaugeServie: AccelerationGaugeService) {

    this.structureService.section$.subscribe(e => {
      this.section = e;
      this.setStructure();
      this.statusBarService.setDirty();
      this.accelerationGaugeServie.setInvisible();
    });

    this.structureService.trainLoad$.subscribe(e => {
      this.movingLoad = e;
      this.setStructure();
      this.statusBarService.setDirty();
      this.accelerationGaugeServie.setInvisible();
    });

    this.structureService.span$.subscribe(e => {
      this.span = e;
      this.setStructure();
      this.statusBarService.setDirty();
      this.accelerationGaugeServie.setInvisible();
    });
  }

  calculate() {
    this.statusBarService.setProgress();
    const input = calculationsInputBuilder()
      .setStructureGeometry(this.view3dService.getStructureGeometry())
      .setStructureData(this.view3dService.getStructureData())
      .setMovingLoad(this.movingLoad)
      .setTimeSettings()
      .build();

    this.httpService.getResult(input).then(
      data => {
        this.view3dService.drawResults(data, this.movingLoad);
        this.statusBarService.setValid();
        this.accelerationGaugeServie.setVisible();
      },
      error => {
        this.statusBarService.setError();
      }

    );
  }

  setStructure() {
    if (!this.section || !this.span) {
      return;
    }

    const str = structureGeometryBuilder().setSection(this.section).setSpan(this.span).build();
    this.view3dService.drawStructure(str);
  }
}
