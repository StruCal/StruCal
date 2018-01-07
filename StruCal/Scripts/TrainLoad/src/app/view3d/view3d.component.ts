import { Component, OnInit } from '@angular/core';
import { View3dService } from './view3d.service';
import { ThreeJsCreator } from '../model3d/threeJsCreator';


@Component({
  selector: 'view3d',
  templateUrl: './view3d.component.html',
  styleUrls: ['./view3d.component.css']
})
export class View3DComponent implements OnInit {
  private threeJsCreator: ThreeJsCreator;
  private view3dService: View3dService;

  constructor(view3dService: View3dService) {
    this.view3dService = view3dService;
  }

  ngOnInit() {
    this.threeJsCreator = new ThreeJsCreator();
    this.threeJsCreator.Create();
    this.view3dService.InjectModelCreator(this.threeJsCreator);
  }

}
