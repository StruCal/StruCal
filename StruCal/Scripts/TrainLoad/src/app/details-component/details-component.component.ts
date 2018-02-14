import { Component, OnInit, ChangeDetectorRef, AfterViewInit, AfterContentInit } from '@angular/core';
import { StructureService } from '../services/structure.service';
import { SectionType } from '../../common/types/sectionTypes';
import { TrainLoadType } from '../../common/types/trainLoadType';
import { sectionDetailDescription, trainDetailDescription } from './detail-descriptions';


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
    this.structureService.sectionType$.subscribe(e => this.sectionType = sectionDetailDescription[e]);
    this.structureService.trainLoadType$.subscribe(e => this.trainLoadType = trainDetailDescription[e]);
    this.cdr.detectChanges();
  }

}
