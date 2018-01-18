import { Component, OnInit } from '@angular/core';
import { View3dService } from './view3d.service';
import { HttpService } from '../http.service';
import { ThreeJsCreator } from '../../3DDrawing/model3d/threeJsCreator';




@Component({
  selector: 'view3d',
  templateUrl: './view3d.component.html',
  styleUrls: ['./view3d.component.css']
})
export class View3DComponent implements OnInit {
  private threeJsCreator: ThreeJsCreator;
  constructor(private view3dService: View3dService, private httpService: HttpService) {
  }

  ngOnInit() {
    this.threeJsCreator = new ThreeJsCreator();
    this.threeJsCreator.create();
    this.view3dService.InjectModelCreator(this.threeJsCreator);
  }

}
