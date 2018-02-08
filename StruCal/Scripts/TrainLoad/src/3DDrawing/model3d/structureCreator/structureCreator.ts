import * as THREE from 'three';
import { material } from '../material';
import { BaseCreator } from './baseCreator';
import { BarsCreator } from './barsCreator';
import { StructureData } from './structureData';
import { StructureGeometry } from '../../../common/structure/structureGeometry';
import { SupportCreator } from './supportCreator';




export class StructureCreator extends BaseCreator {
    private _barsCreator: BarsCreator;
    private _structureData: StructureData;
    private _supportCreator: SupportCreator;

    constructor(scene: THREE.Scene) {
        super(scene);
        this._barsCreator = new BarsCreator(this.scene);
        this._supportCreator = new SupportCreator(this.scene);
    }

    public draw(structureGeometry: StructureGeometry) {
        if (structureGeometry === undefined || this.scene === undefined) {
            return;
        }
        this._structureData = new StructureData();
        this.clearGeometry();
        this._barsCreator.drawBars(structureGeometry.bars, this.structureData);
        this._supportCreator.drawSupports(structureGeometry.supports);
    }

    public get structureData() {
        return this._structureData;
    }



}
