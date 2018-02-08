import { Directive, ElementRef } from '@angular/core';
import { startProgress} from './progress';
import { OnInit, AfterViewInit } from '@angular/core/src/metadata/lifecycle_hooks';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[Progress]'
})
export class ProgressDirective implements AfterViewInit {
  ngAfterViewInit(): void {
    const id = this.el.nativeElement.id;
    startProgress(id);
  }


  constructor(private el: ElementRef) {

  }

}
