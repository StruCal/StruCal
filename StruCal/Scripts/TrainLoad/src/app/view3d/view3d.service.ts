import { Injectable } from '@angular/core';
import * as THREE from 'three';
import { ThreeJsCreator } from '../../3DDrawing/model3d/threeJsCreator';
import { StructureCreator } from '../../3DDrawing/model3d/structureCreator/structureCreator';
import { ResultCreator } from '../../3DDrawing/model3d/resultsCreator/resultCreator';
import { StructureData } from '../../3DDrawing/model3d/structureCreator/structureData';
import { StructureGeometry } from '../../common/structure/structureGeometry';
import { TimeProvider } from '../../common/time/timeProvider';
import { mockedStructureGeometry } from '../../common/startData/mockedStructureGeometry';
import { ResultData } from '../../common/resultData/resultData';
import { MovingLoadCreator } from '../../3DDrawing/model3d/movingLoadCreator/movingLoadCreator';
import { MovingLoad } from '../../common/movingLoad/movingLoad';
import { ResultProvider } from '../../3DDrawing/model3d/resultsCreator/resultProvider';
import { AccelerationGaugeService } from '../services/acceleration-gauge.service';



@Injectable()
export class View3dService {

  private threeJsCreator: ThreeJsCreator;
  private structureGeometry: StructureGeometry;
  private structureCreator: StructureCreator;
  private resultCreator: ResultCreator;
  private resultProvider: ResultProvider;
  private timeProvider: TimeProvider;
  private movingLoadCreator: MovingLoadCreator;

  constructor(private accelerationGaugeService: AccelerationGaugeService) {
  }

  public InjectModelCreator(threeJsCreator: ThreeJsCreator): void {
    this.threeJsCreator = threeJsCreator;

    this.structureCreator = new StructureCreator(this.threeJsCreator.scene);
    this.resultCreator = new ResultCreator(this.threeJsCreator.scene);
    this.movingLoadCreator = new MovingLoadCreator(this.threeJsCreator.scene);
  }

  public drawStructure(structureGeometry: StructureGeometry) {
    this.structureGeometry = structureGeometry;
    this.structureCreator.draw(structureGeometry);
    this.movingLoadCreator.reset();
    this.threeJsCreator.tickAnimation = () => { };
  }

  public drawResults(results: ResultData, movingLoad: MovingLoad) {
    this.timeProvider = new TimeProvider(results.timeSettings);
    this.resultProvider = new ResultProvider(results);
    this.resultCreator.setResult(this.resultProvider, this.structureCreator.structureData);
    this.movingLoadCreator.start(movingLoad, this.structureGeometry.getLength());
    this.threeJsCreator.tickAnimation = () => this.tick();
  }

  public getStructureGeometry(): StructureGeometry {
    return this.structureGeometry;
  }

  public getStructureData(): StructureData {
    return this.structureCreator.structureData;
  }


  private tick(): void {
    this.timeProvider.tick();
    const time = this.timeProvider.getCurrentTime();
    this.resultProvider.setTime(time);
    this.resultCreator.tickAnimation(time);
    this.movingLoadCreator.tickAnimation(time);
    this.accelerationGaugeService.setValue(this.resultProvider.getMaxAcceleration());
  }

}
