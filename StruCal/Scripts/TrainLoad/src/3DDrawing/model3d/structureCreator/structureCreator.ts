import * as THREE from 'three';
import { material } from '../material';
import { BaseCreator } from './baseCreator';
import { BarsCreator } from './barsCreator';
import { StructureData } from './structureData';
import { StructureGeometry } from '../../../common/structure/structureGeometry';




export class StructureCreator extends BaseCreator {
    private _barsCreator: any;
    private _structureData: StructureData;

    constructor(scene: any) {
        super(scene);
        this._barsCreator = new BarsCreator(this.scene);
    }

    public draw(structureGeometry: StructureGeometry) {
        if (structureGeometry === undefined || this.scene === undefined) {
            return;
        }
        this._structureData = new StructureData();
        this.clearGeometry();
        this._barsCreator.drawBars(structureGeometry.bars, this.structureData);

    }

    public get structureData() {
        return this._structureData;
    }



}
