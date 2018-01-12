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
import { Structure } from '../structure/structure';
import { ResultCreator } from '../model3d/resultsCreator/resultCreator';
import { ResultData } from '../resultData/resultData';



@Injectable()
export class View3dService {

  private threeJsCreator: ThreeJsCreator;
  private structureCreator: StructureCreator;
  private resultCreator: ResultCreator;

  currentTime = 0;

  constructor() {
  }

  public InjectModelCreator(threeJsCreator: ThreeJsCreator): void {
    this.threeJsCreator = threeJsCreator;

    this.structureCreator = new StructureCreator(this.threeJsCreator.scene);
    this.resultCreator = new ResultCreator(this.threeJsCreator.scene);

    this.threeJsCreator.TickAnimation = () => this.tick();
    this.DrawStructure(mockedStructure);
    this.DrawResults(mockedResultData);
  }


  public DrawStructure(structure: Structure) {
    this.structureCreator.Draw(structure);
  }

  public DrawResults(results: ResultData) {
    this.resultCreator.SetResult(results, this.structureCreator.structureData);
  }


  private tick(): void {
    this.currentTime++;
    if (this.currentTime > 150) {
      this.currentTime = 0;
    }
    this.resultCreator.TickAnimation(this.currentTime);
  }
}
