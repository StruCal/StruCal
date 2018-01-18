import { Injectable } from '@angular/core';
import * as THREE from 'three';

import { mockedStructureGeometry } from '../mocks/mockedStructureGeometry';
import { ThreeJsCreator } from '../model3d/threeJsCreator';
import { mockedResultData } from '../mocks/mockedResultData';
import { StructureCreator } from '../model3d/structureCreator/structureCreator';
import { DisplacementProvider } from '../model3d/resultsCreator/displacementProvider';
import { StressProvider } from '../model3d/resultsCreator/stressProvider';
import { StructureData } from '../model3d/structureCreator/structureData';
import { StructureGeometry } from '../structure/structureGeometry';
import { ResultCreator } from '../model3d/resultsCreator/resultCreator';
import { ResultData } from '../resultData/resultData';
import { CalculationsInput } from '../calculations/calculationsInput';
import { calculationsInputBuilder } from '../calculations/calculationInputBuilder';
import { MovingLoad } from '../movingLoad/movingLoad';
import { mockedMovingLoad } from '../mocks/mockedMovingLoad';
import { TimeProvider } from '../time/timeProvider';




@Injectable()
export class View3dService {

  private threeJsCreator: ThreeJsCreator;
  private structureGeometry: StructureGeometry;
  private structureCreator: StructureCreator;
  private resultCreator: ResultCreator;
  private timeProvider: TimeProvider;

  constructor() {
    this.timeProvider = new TimeProvider();
  }

  public InjectModelCreator(threeJsCreator: ThreeJsCreator): void {
    this.threeJsCreator = threeJsCreator;

    this.structureCreator = new StructureCreator(this.threeJsCreator.scene);
    this.resultCreator = new ResultCreator(this.threeJsCreator.scene);

    this.drawStructure(mockedStructureGeometry);

  }


  public drawStructure(structureGeometry: StructureGeometry) {
    this.structureGeometry = structureGeometry;
    this.structureCreator.draw(structureGeometry);
  }

  public drawResults(results: ResultData) {
    this.resultCreator.setResult(results, this.structureCreator.structureData);
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
    if (this.timeProvider.getCurrentTime()  > 49) {
      this.timeProvider.reset();
    }
    this.resultCreator.tickAnimation(this.timeProvider.getCurrentTime());
  }

}
