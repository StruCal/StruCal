import { Component, OnInit } from '@angular/core';
import { DrawingBase } from '../../2DDrawing/drawingBase';
import { SectionDrawing } from '../../2DDrawing/sectionDrawing';


const canvasID = 'canvas2d';

@Component({
  selector: 'drawing2d',
  templateUrl: './drawing2d.component.html',
  styleUrls: ['./drawing2d.component.css']
})
export class Drawing2dComponent implements OnInit {

private sectionDrawing: SectionDrawing;

  constructor() { }

  ngOnInit() {
    this.sectionDrawing = new SectionDrawing(canvasID);
    this.sectionDrawing.draw();
  }

}
