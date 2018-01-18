import { Component, OnInit } from '@angular/core';
import { DrawingBase } from '../../2DDrawing/drawingBase';


const canvasID = 'canvas2d';

@Component({
  selector: 'drawing2d',
  templateUrl: './drawing2d.component.html',
  styleUrls: ['./drawing2d.component.css']
})
export class Drawing2dComponent implements OnInit {

private drawingBase: DrawingBase;

  constructor() { }

  ngOnInit() {
    this.drawingBase = new DrawingBase(canvasID);
  }

}
