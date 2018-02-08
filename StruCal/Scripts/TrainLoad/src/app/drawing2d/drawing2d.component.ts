import { Component, OnInit, AfterViewInit } from '@angular/core';
import { DrawingBase } from '../../2DDrawing/drawingBase';
import { SectionDrawing } from '../../2DDrawing/sectionDrawing';
import { mockedStructureGeometry } from '../../common/startData/mockedStructureGeometry';
import { Perimeter } from '../../common/structure/perimeter';
import { Section } from '../../common/structure/section';
import { section1Builder } from '../../common/sectionBuilders/section1Builder';


const canvasID = 'canvas2d';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'drawing2d',
  templateUrl: './drawing2d.component.html',
  styleUrls: ['./drawing2d.component.css']
})
export class Drawing2dComponent implements OnInit, AfterViewInit {

  private sectionDrawing: SectionDrawing;

  constructor() {

  }

  draw(section: Section): void {

    this.sectionDrawing.draw(section);
  }

  reset(): void {
    this.sectionDrawing.reset();
  }

  ngAfterViewInit(): void {

  }

  ngOnInit() {
    this.sectionDrawing = new SectionDrawing(canvasID);
  }

}
