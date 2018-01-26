import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Section } from '../../common/structure/section';
import { startSection1 } from '../../common/startData/mockedSection1';
import { SectionType } from '../../common/sectionBuilders/sectionTypes';
import { LocalStorageService } from './local-storage.service';
import { ModelInput } from '../input/modelInput';
import { sectionInputFactory } from '../modal-section1/Input/sectionInputFactory';


@Injectable()
export class StructureService {

  private sectionSource = new Subject<Section>();
  private sectionInputSource = new Subject<Array<ModelInput>>();

  public section$ = this.sectionSource.asObservable();
  public sectionInput$ = this.sectionInputSource.asObservable();

  constructor(private localStorageService: LocalStorageService) {
  }

  public setSection(section: Section) {
    this.sectionSource.next(section);
  }

  public setSectionUsingType(type: SectionType): void {
    const sectionInputBuilder = sectionInputFactory().getSectionBuilder(type);
    const sectionInput = this.localStorageService.getSectionInput(type) || sectionInputFactory().getInput(type);
    const section = sectionInputBuilder.section1FromInput(sectionInput);
    this.setSection(section);
    this.sectionInputSource.next(sectionInput);
  }


  public saveSectionInput(inputs: Array<ModelInput>, type: SectionType): void {
    this.localStorageService.saveSectionInput(inputs, type);
  }

  public start(): void {
    this.setSection(startSection1);
  }
}
