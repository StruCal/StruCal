import { Injectable } from '@angular/core';
import * as THREE from 'three';
import { ThreeJsCreator } from '../../3DSolver/model3d/threeJsCreator';
import { StructureGeometry } from '../../3DSolver/structure/structureGeometry';
import { StructureCreator } from '../../3DSolver/model3d/structureCreator/structureCreator';
import { ResultCreator } from '../../3DSolver/model3d/resultsCreator/resultCreator';
import { TimeProvider } from '../../3DSolver/time/timeProvider';
import { ResultData } from '../../3DSolver/resultData/resultData';
import { StructureData } from '../../3DSolver/model3d/structureCreator/structureData';
import { mockedStructureGeometry } from '../../3DSolver/mocks/mockedStructureGeometry';


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
