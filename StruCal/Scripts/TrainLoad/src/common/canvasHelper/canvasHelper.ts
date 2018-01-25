import { ElementRef } from '@angular/core';



export class CanvasHelper {
    private _canvas: HTMLElement;
    private _widthHeightRatio: number;

    private _width: number;
    private _height: number;

    constructor(canvas: HTMLElement, widthHeightRatio: number) {
        this._canvas = canvas;
        this._widthHeightRatio = widthHeightRatio;

        this.refresh();
    }

    public refresh(): void {
        this._canvas.setAttribute('style', 'height:' + (this._canvas.offsetWidth / this._widthHeightRatio).toFixed(0) + 'px');
        this._width = this._canvas.clientWidth;
        this._height = this._canvas.clientHeight;
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
