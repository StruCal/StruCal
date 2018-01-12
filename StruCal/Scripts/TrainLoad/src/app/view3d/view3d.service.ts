import { Injectable } from '@angular/core';
import * as THREE from 'three';

import { mockedStructure } from '../mocks/mockedStructure';
import { ThreeJsCreator } from '../model3d/threeJsCreator';
import { mockedResultData } from '../mocks/mockedResultData';
import { StructureCreator } from '../model3d/structureCreator/structureCreator';
import { ResultInterpolation } from '../model3d/resultsCreator/resultInterpolation';
import { DisplacementProvider } from '../model3d/resultsCreator/displacementProvider';
import { StressProvider } from '../model3d/resultsCreator/stressProvider';
import { StructureData } from '../model3d/structureCreator/structureData';



@Injectable()
export class View3dService {

  private threeJsCreator: ThreeJsCreator;
  private structureCreator: StructureCreator;
  private structureData: StructureData;
  private resultInterpolation: ResultInterpolation;
  private displacementProvider: DisplacementProvider;
  private stressProvider: StressProvider;
  currentTime = 0;

  constructor() {
    this.resultInterpolation = new ResultInterpolation(mockedResultData, 4);


  }

  public InjectModelCreator(threeJsCreator: ThreeJsCreator): void {
    this.threeJsCreator = threeJsCreator;
    this.threeJsCreator.TickAnimation = () => this.tick();

    this.structureData = new StructureData();
    this.displacementProvider = new DisplacementProvider(this.threeJsCreator.scene, this.resultInterpolation, this.structureData);
    this.stressProvider = new StressProvider(this.threeJsCreator.scene, this.resultInterpolation, this.structureData);
    this.structureCreator = new StructureCreator(this.threeJsCreator.scene, this.structureData);
    this.structureCreator.Draw(mockedStructure);
  }



  private tick(): void {
    this.currentTime++;
    this.resultInterpolation.setTime(this.currentTime);
    this.displacementProvider.ApplyDisplacement();
    this.stressProvider.ApplyStress();
    if (this.currentTime > 150) {
      this.currentTime = 0;
    }
  }
}
