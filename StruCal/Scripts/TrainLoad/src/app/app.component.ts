import { Component } from '@angular/core';
import { OnInit, AfterViewInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { View3dService } from './view3d/view3d.service';
import { StructureService } from './services/structure.service';
import { LocalStorageService } from './services/local-storage.service';
import { SectionType } from '../common/types/sectionTypes';
import { InputService } from './services/input.service';
import { sectionInputFactory } from './modal-section1/Input/sectionInputFactory';
import { trainLoadInputFactory } from './modal-train-load/input/trainLoadInputFactory';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {

  title = 'app';

  constructor(private structureService: StructureService,
    private inputService: InputService) { }
  ngAfterViewInit(): void {
    this.setSection();
    this.setTrainLoad();
  }

  private setSection(): void {
    const sectionType = this.inputService.getSectionType();
    const sectionInput = this.inputService.getSectionInput(sectionType);
    const section = sectionInputFactory().getSectionBuilder(sectionType).section1FromInput(sectionInput);
    this.structureService.setSection(section);
    this.structureService.setSectionType(sectionType);
  }

  private setTrainLoad(): void {
    const trainLoadType = this.inputService.getTrainLoadType();
    const trainLoadInput = this.inputService.getTrainLoadInput(trainLoadType);
    const trainLoad = trainLoadInputFactory().getTrainLoadBuilder(trainLoadType).FromInput(trainLoadInput);
    this.structureService.setTrainLoad(trainLoad);
    this.structureService.setTrainLoadType(trainLoadType);
  }

  ngOnInit(): void {

  }
}
