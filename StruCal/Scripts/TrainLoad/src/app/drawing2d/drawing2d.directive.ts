import { Directive, ElementRef } from '@angular/core';
const Guid = require('guid');
const drawingClassName = 'drawing2d';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[drawing2dElement]',
})
export class Drawing2dDirective {

  constructor(private elementRef: ElementRef) { }

  public getCanvasId(): string {
    const canvasObject = Array.from(this.elementRef.nativeElement.childNodes)
    .filter(childNode => typeof (childNode as HTMLInputElement).className !== 'undefined')
    .filter(childNode => (childNode as HTMLInputElement).className.includes(drawingClassName))[0] as HTMLInputElement;
    canvasObject.id = Guid.raw().toString();

    return canvasObject.id.toString();
  }
}
