import { Component, OnInit } from '@angular/core';
import { StructureService } from '../services/structure.service';
import { SectionType } from '../../common/types/sectionTypes';
import { TrainLoadType } from '../../common/types/trainLoadType';


@Component({
  selector: 'details-component',
  templateUrl: './details-component.component.html',
  styleUrls: ['./details-component.component.css']
})
export class DetailsComponentComponent implements OnInit {

  public span: string;
  public sectionType: string;
  public trainLoadType: string;

  constructor(private structureService: StructureService) {
  }

  ngOnInit() {
    this.structureService.span$.subscribe(e => this.span = `${e.lengths.length}x${e.lengths[0]}`);
    this.structureService.sectionType$.subscribe(e => this.sectionType = SectionType[e]);
    this.structureService.trainLoadType$.subscribe(e => this.trainLoadType = TrainLoadType[e]);
  }

}
