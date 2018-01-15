import { Component, OnInit } from '@angular/core';
import { View3dService } from './view3d.service';
import { ThreeJsCreator } from '../model3d/threeJsCreator';
import { HttpService } from '../http.service';


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
    this.threeJsCreator.Create();
    this.view3dService.InjectModelCreator(this.threeJsCreator);
  }

  test() {
    const input = this.view3dService.getCalculationsInput();

    this.httpService.getResult(input).subscribe(data => {
      this.view3dService.drawResults(data);
    });
    console.log(input);


  }

}
