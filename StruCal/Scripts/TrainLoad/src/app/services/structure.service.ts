import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Section } from '../../common/structure/section';
import { startSection1 } from '../../common/startData/mockedSection1';
import { SectionType } from '../../common/sectionBuilders/sectionTypes';
import { LocalStorageService } from './local-storage.service';
import { ModelInput } from '../input/modelInput';
import { sectionInputFactory } from '../modal-section1/Input/sectionInputFactory';
import { MovingLoad } from '../../common/movingLoad/movingLoad';
import { TrainLoadType } from '../../common/trainLoadBuilders/trainLoadType';
import { trainLoadInputFactory } from '../modal-train-load/input/trainLoadInputFactory';
import { startHSLMA } from '../../common/startData/mockedHSLMA';


@Injectable()
export class StructureService {

  private sectionSource = new Subject<Section>();
  public section$ = this.sectionSource.asObservable();

  private sectionInputSource = new Subject<Array<ModelInput>>();
  public sectionInput$ = this.sectionInputSource.asObservable();

  private trainLoadInputSource = new Subject<Array<ModelInput>>();
  public trainLoadInput$ = this.trainLoadInputSource.asObservable();

  private trainLoadSource = new Subject<MovingLoad>();
  private trainLoad$ = this.trainLoadSource.asObservable();

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

  public setTrainLoad(trainLoad: MovingLoad) {
    this.trainLoadSource.next(trainLoad);
  }

  public saveTrainLoadInput(inputs: Array<ModelInput>, type: TrainLoadType): void {
    this.localStorageService.saveTrainLoadInput(inputs, type);
  }

  public setTrainLoadUsingType(type: TrainLoadType): void {
    const trainLoadInputBuilder = trainLoadInputFactory().getTrainLoadBuilder(type);
    const trainLoadInput = this.localStorageService.getTrainLoadInput(type) || trainLoadInputFactory().getInput(type);
    const trainLoad = trainLoadInputBuilder.HSLMAFromInput(trainLoadInput);
    this.setTrainLoad(trainLoad);
    this.trainLoadInputSource.next(trainLoadInput);
  }

  public start(): void {
    this.setSection(startSection1);
    this.setTrainLoad(startHSLMA);
  }
}
