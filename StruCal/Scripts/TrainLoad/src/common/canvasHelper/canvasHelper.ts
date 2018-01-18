import { ElementRef } from '@angular/core';



export class CanvasHelper {
    private _widthHeightRatio: number;

    private _width: number;
    private _height: number;

    constructor(canvas: HTMLElement, widthHeightRatio: number) {
        canvas.setAttribute('style', 'height:' + (canvas.offsetWidth / widthHeightRatio).toFixed(0) + 'px');

        this._widthHeightRatio = widthHeightRatio;
        this._width = canvas.clientWidth;
        this._height = canvas.clientHeight;
    }

    get widthHeightRatio(): number {
        return this._widthHeightRatio;
    }

    get width(): number {
        return this._width;
    }

    get height(): number {
        return this._height;
    }
}
