import { Component, OnInit, ChangeDetectorRef, AfterViewInit, AfterContentInit } from '@angular/core';
import { StructureService } from '../services/structure.service';
import { SectionType } from '../../common/types/sectionTypes';
import { TrainLoadType } from '../../common/types/trainLoadType';


@Component({
  // tslint:disable-next-line:component-selector
  selector: 'details-component',
  templateUrl: './details-component.component.html',
  styleUrls: ['./details-component.component.css']
})
export class DetailsComponentComponent implements OnInit, AfterContentInit {


  public span = '';
  public sectionType = '';
  public trainLoadType = '';

  constructor(private structureService: StructureService, private cdr: ChangeDetectorRef) {

  }

  ngAfterContentInit(): void {

  }

  ngOnInit() {
    this.structureService.span$.subscribe(e => this.span = `${e.lengths.length}x${e.lengths[0]}`);
    this.structureService.sectionType$.subscribe(e => this.sectionType = SectionType[e].toString());
    this.structureService.trainLoadType$.subscribe(e => {
      this.trainLoadType = TrainLoadType[e];
    });
    this.cdr.detectChanges();
  }

}
