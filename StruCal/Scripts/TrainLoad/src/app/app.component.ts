import { Component } from '@angular/core';
import { OnInit, AfterViewInit, AfterViewChecked } from '@angular/core/src/metadata/lifecycle_hooks';
import { View3dService } from './view3d/view3d.service';
import { StructureService } from './services/structure.service';
import { LocalStorageService } from './services/local-storage.service';
import { SectionType } from '../common/types/sectionTypes';
import { sectionInputFactory } from './modal-section1/Input/sectionInputFactory';
import { trainLoadInputFactory } from './modal-train-load/input/trainLoadInputFactory';
import { InitializationService } from './services/initialization.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewChecked {


  constructor(private structureService: StructureService,
    private initializationService: InitializationService) { }

  ngAfterViewChecked(): void {
    setTimeout(() => {
      this.structureService.setSection(this.initializationService.section);
      this.structureService.setSectionType(this.initializationService.sectionType);
      this.structureService.setTrainLoad(this.initializationService.trainLoad);
      this.structureService.setTrainLoadType(this.initializationService.trainLoadType);
    }, 200);

  }
}
