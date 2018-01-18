import { Component, OnInit } from '@angular/core';
import { View3dService } from './view3d.service';
import { HttpService } from '../http.service';
import { ThreeJsCreator } from '../../3DSolver/model3d/threeJsCreator';
import { MovingLoad } from '../../3DSolver/movingLoad/movingLoad';
import { mockedMovingLoad } from '../../3DSolver/mocks/mockedMovingLoad';
import { calculationsInputBuilder } from '../../3DSolver/calculations/calculationInputBuilder';



@Component({
  selector: 'view3d',
  templateUrl: './view3d.component.html',
  styleUrls: ['./view3d.component.css']
})
export class View3DComponent implements OnInit {
  private threeJsCreator: ThreeJsCreator;
  private movingLoad: MovingLoad = mockedMovingLoad;
public currentTime: number;
  constructor(private view3dService: View3dService, private httpService: HttpService) {
  }

  ngOnInit() {
    this.threeJsCreator = new ThreeJsCreator();
    this.threeJsCreator.create();
    this.view3dService.InjectModelCreator(this.threeJsCreator);
  }

  test() {
    const input = calculationsInputBuilder()
    .setStructureGeometry(this.view3dService.getStructureGeometry())
    .setStructureData(this.view3dService.getStructureData())
    .setMovingLoad(this.movingLoad)
    .setTimeSettings()
    .build();

    this.httpService.getResult(input).subscribe(data => {
      this.view3dService.drawResults(data);
      console.log(data);
    });
    console.log(input);


  }

}
