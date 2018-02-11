import { Directive, ElementRef } from '@angular/core';


@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[drawing2dDir]',
  exportAs: 'drawingDirective'
})
export class Drawing2dDirective {

  constructor(elementRef: ElementRef) { }

  public log(){
    alert("OK");
  }
}
