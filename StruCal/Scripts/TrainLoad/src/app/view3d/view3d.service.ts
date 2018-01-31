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



@Injectable()
export class View3dService {

  private threeJsCreator: ThreeJsCreator;
  private structureGeometry: StructureGeometry;
  private structureCreator: StructureCreator;
  private resultCreator: ResultCreator;
  private timeProvider: TimeProvider;
  private movingLoadCreator: MovingLoadCreator;

  constructor() {
    this.timeProvider = new TimeProvider();
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
    this.threeJsCreator.tickAnimation = () => { };
  }

  public drawResults(results: ResultData, movingLoad: MovingLoad) {
    this.resultCreator.setResult(results, this.structureCreator.structureData);
    this.movingLoadCreator.start(movingLoad);
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
    if (this.timeProvider.getCurrentTime() > 49) {
      this.timeProvider.reset();
    }
    const time = this.timeProvider.getCurrentTime();
    this.resultCreator.tickAnimation(time);
    this.movingLoadCreator.tickAnimation(time)
  }

}
