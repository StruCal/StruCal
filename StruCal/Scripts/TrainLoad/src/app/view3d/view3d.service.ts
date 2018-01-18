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



@Injectable()
export class View3dService {

  private threeJsCreator: ThreeJsCreator;
  private structureGeometry: StructureGeometry;
  private structureCreator: StructureCreator;
  private resultCreator: ResultCreator;

  currentTime = 10;

  constructor() {
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
    this.currentTime++;
    if (this.currentTime > 49) {
      this.currentTime = 0;
    }
    this.resultCreator.tickAnimation(this.currentTime);
  }


  //TEST
  next() {
    this.currentTime++;
  }
}
