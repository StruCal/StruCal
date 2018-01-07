import { Injectable } from '@angular/core';
import { StructureCreator } from '../model3d/structureCreator';
import * as THREE from 'three';
import { mockedStructure } from '../mocks/mockedStructure';
import { Model3dCreator } from '../model3d/model3dCreator';
import { ResultInterpolation } from '../resultData/resultInterpolation';
import { mockedResultData } from '../mocks/mockedResultData';



@Injectable()
export class View3dService {

  private model3dCreator: Model3dCreator;
  private structureCreator: StructureCreator;
  private displacementCalculator: ResultInterpolation;
  currentTime = 0;

  constructor() {
    this.displacementCalculator = new ResultInterpolation(mockedResultData);
    this.displacementCalculator.setTime(0);
  }

  public InjectModelCreator(model3dCreator: Model3dCreator): void {
    this.model3dCreator = model3dCreator;
    this.model3dCreator.TickAnimation = () => this.tick();
    this.structureCreator = new StructureCreator(this.model3dCreator.GetScene());
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
