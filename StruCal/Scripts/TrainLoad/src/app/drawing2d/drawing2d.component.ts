import { Component, OnInit } from '@angular/core';
import { DrawingBase } from '../../2DDrawing/drawingBase';
import { SectionDrawing } from '../../2DDrawing/sectionDrawing';
import { mockedStructureGeometry } from '../../common/mocks/mockedStructureGeometry';
import { Perimeter } from '../../common/structure/perimeter';
import { Section } from '../../common/structure/section';
import { section1Builder } from '../../common/sectionBuilders/section1Builder';


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

    const perimeter = new Perimeter();
    perimeter.coordinates = [{ x: -40, y: -20 }, { x: -10, y: -20 }, { x: -10, y: -10 }, { x: -40, y: -10 }];
    const section = new Section();
    section.perimeters = [perimeter];

    const section2 = section1Builder().setHeight(2).setWebThickness(0.03)
    .setTopFlangeWidth(0.5).setTopFlangeThickness(0.01).setBottomFlangeWidth(0.7)
    .setBottomFlangeThickness(0.02).build();
    this.sectionDrawing.draw(section2);
  }

}
