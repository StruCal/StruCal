import { Injectable } from '@angular/core';
import { StructureCreator } from '../model3d/structureCreator';
import * as THREE from 'three';
import { mockedStructure } from '../mocks/mockedStructure';
import { ThreeJsCreator } from '../model3d/threeJsCreator';
import { ResultInterpolation } from '../resultData/resultInterpolation';
import { mockedResultData } from '../mocks/mockedResultData';



@Injectable()
export class View3dService {

  private threeJsCreator: ThreeJsCreator;
  private structureCreator: StructureCreator;
  private displacementCalculator: ResultInterpolation;
  currentTime = 0;

  constructor() {
    this.displacementCalculator = new ResultInterpolation(mockedResultData);
    this.displacementCalculator.setTime(0);
  }

  public InjectModelCreator(threeJsCreator: ThreeJsCreator): void {
    this.threeJsCreator = threeJsCreator;
    this.threeJsCreator.TickAnimation = () => this.tick();
    this.structureCreator = new StructureCreator(this.threeJsCreator.GetScene());
    this.structureCreator.Draw(mockedStructure);
  }



  private tick(): void {
    this.currentTime++;
    this.displacementCalculator.setTime(this.currentTime);
    if (this.currentTime > 300) {
      this.currentTime = 0;
    }
  }
}
