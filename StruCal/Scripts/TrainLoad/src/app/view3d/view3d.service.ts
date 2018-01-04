import { Injectable } from '@angular/core';
import { StructureCreator } from '../model3d/structureCreator';
import * as THREE from 'three';
import { mockedStructure } from '../mocks/mockedStructure';
import { Model3dCreator } from '../model3d/model3dCreator';



@Injectable()
export class View3dService {

  private model3dCreator: Model3dCreator;
  private structureCreator: StructureCreator;

  constructor() {

  }

  public InjectModelCreator(model3dCreator: Model3dCreator): void {
    this.model3dCreator = model3dCreator;

    this.structureCreator = new StructureCreator(this.model3dCreator.GetScene());


    this.structureCreator.Draw(mockedStructure);
  }
}
