import { ElementRef } from "@angular/core";

const widthHeightRatio : number = 3;

export class CanvasHelper{

private _width :number;
private _height:number;

    constructor(canvas : HTMLElement){
        canvas.setAttribute("style", "height:" + (canvas.offsetWidth / widthHeightRatio).toFixed(0) + "px");

        this._width = canvas.clientWidth;
        this._height = canvas.clientHeight;
    }

    get widthHeightRatio() : number{
        return widthHeightRatio;
    }

    get width():number{
        return this._width;
    }

    get height():number{
        return this._height;
    }
}