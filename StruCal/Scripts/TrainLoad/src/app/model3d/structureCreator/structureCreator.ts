import * as THREE from 'three';
import { Structure } from '../../structure/structure';
import { material } from '../material';
import { BaseCreator } from './baseCreator';
import { BarsCreator } from './barsCreator';
import { StructureData } from './structureData';




export class StructureCreator extends BaseCreator {
    private _barsCreator: any;
    private _structureData: StructureData;

    constructor(scene: any) {
        super(scene);
        this._barsCreator = new BarsCreator(this.scene);
    }

    public Draw(structure: Structure) {
        if (structure === undefined || this.scene === undefined) {
            return;
        }
        this._structureData = new StructureData();

        this._barsCreator.DrawBars(structure.Bars, this.structureData);

    }

    public get structureData() {
        return this._structureData;
    }

}
