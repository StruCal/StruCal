import * as THREE from 'three';
import { Structure } from '../../structure/structure';
import { material } from '../material';
import { BaseCreator } from './baseCreator';
import { BarsCreator } from './barsCreator';
import { StructureData } from './structureData';




export class StructureCreator extends BaseCreator {

    private structure: Structure;
    private barsCreator: BarsCreator;

    constructor(scene: any, structureData: StructureData) {
        super(scene);
        this.barsCreator = new BarsCreator(scene, structureData);
    }

    public Draw(structure: Structure) {
        if (structure === undefined || this.scene === undefined) {
            return;
        }
        this.structure = structure;

        this.barsCreator.DrawBars(structure.Bars);

    }

    

}
