import * as THREE from 'three';
import { Structure } from '../../structure/structure';
import { material } from '../material';
import { BaseCreator } from './baseCreator';
import { BarsCreator } from './barsCreator';




export class StructureCreator extends BaseCreator {

    private structure: Structure;
    private barsCreator: BarsCreator;

    constructor(scene: any) {
        super(scene);
        this.barsCreator = new BarsCreator(scene);
    }

    public Draw(structure: Structure) {
        if (structure === undefined || this.scene === undefined) {
            return;
        }
        this.structure = structure;

        this.barsCreator.DrawBars(structure.Bars);

    }


}
