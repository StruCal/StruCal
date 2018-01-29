import { Component, OnInit } from '@angular/core';
import { TrainLoadType } from '../../../common/trainLoadBuilders/trainLoadType';
import { TrainLoadDrawing } from '../../../2DDrawing/trainLoadDrawing';

const canvasId = 'canvasTrainLoad';

@Component({
  selector: 'drawing-train-load',
  templateUrl: './drawing-train-load.component.html',
  styleUrls: ['./drawing-train-load.component.css']
})
export class DrawingTrainLoadComponent implements OnInit {

  private drawing: TrainLoadDrawing;

  constructor() { 
  }

  ngOnInit() {
    this.drawing = new TrainLoadDrawing(canvasId);

    this.drawing.draw();
  }

}
