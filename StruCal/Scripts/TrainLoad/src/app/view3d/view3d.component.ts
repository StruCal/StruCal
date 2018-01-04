import { Component, OnInit } from '@angular/core';
import { View3dService } from './view3d.service';
import { Model3dCreator } from '../model3d/model3dCreator';


@Component({
  selector: 'view3d',
  templateUrl: './view3d.component.html',
  styleUrls: ['./view3d.component.css']
})
export class View3DComponent implements OnInit {
  private model3dCreator: Model3dCreator;
  private view3dService: View3dService;

  constructor(view3dService: View3dService) {
    this.view3dService = view3dService;
  }

  ngOnInit() {
    this.model3dCreator = new Model3dCreator();
    this.model3dCreator.Create();
    this.view3dService.InjectModelCreator(this.model3dCreator);
  }

}
