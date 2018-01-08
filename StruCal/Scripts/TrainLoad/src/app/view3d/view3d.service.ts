import { Injectable } from '@angular/core';
import * as THREE from 'three';

import { mockedStructure } from '../mocks/mockedStructure';
import { ThreeJsCreator } from '../model3d/threeJsCreator';
import { mockedResultData } from '../mocks/mockedResultData';
import { StructureCreator } from '../model3d/structureCreator/structureCreator';
import { ResultInterpolation } from '../model3d/resultsCreator/resultInterpolation';
import { DisplacementTransformer } from '../model3d/resultsCreator/displacementTransformer';



@Injectable()
export class View3dService {

  private threeJsCreator: ThreeJsCreator;
  private structureCreator: StructureCreator;
  private resultInterpolation: ResultInterpolation;
  private displacementTransformer: DisplacementTransformer;
  currentTime = 0;

  constructor() {
    this.resultInterpolation = new ResultInterpolation(mockedResultData);
    this.resultInterpolation.setTime(0);

  }

  public InjectModelCreator(threeJsCreator: ThreeJsCreator): void {
    this.threeJsCreator = threeJsCreator;
    this.threeJsCreator.TickAnimation = () => this.tick();

    this.displacementTransformer = new DisplacementTransformer(this.threeJsCreator.GetScene(), this.resultInterpolation);

    this.structureCreator = new StructureCreator(this.threeJsCreator.GetScene());
    this.structureCreator.Draw(mockedStructure);
  }



  private tick(): void {
    this.currentTime++;
    this.resultInterpolation.setTime(this.currentTime);
    this.displacementTransformer.ApplyDisplacement();
    if (this.currentTime > 300) {
      this.currentTime = 0;
    }
  }
}
