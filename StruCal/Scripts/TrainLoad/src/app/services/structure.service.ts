import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Section } from '../../common/structure/section';
import { startSection1 } from '../../common/startData/mockedSection1';
import { LocalStorageService } from './local-storage.service';
import { ModelInput } from '../input/modelInput';
import { sectionInputFactory } from '../modal-section1/Input/sectionInputFactory';
import { MovingLoad } from '../../common/movingLoad/movingLoad';
import { trainLoadInputFactory } from '../modal-train-load/input/trainLoadInputFactory';
import { startHSLMA } from '../../common/startData/mockedHSLMA';
import { Span } from '../../common/structure/span';
import { SectionType } from '../../common/types/sectionTypes';
import { TrainLoadType } from '../../common/types/trainLoadType';


@Injectable()
export class StructureService {

  private sectionSource = new Subject<Section>();
  public section$ = this.sectionSource.asObservable();

  private sectionInputSource = new Subject<Array<ModelInput>>();
  public sectionInput$ = this.sectionInputSource.asObservable();

  private trainLoadInputSource = new Subject<Array<ModelInput>>();
  public trainLoadInput$ = this.trainLoadInputSource.asObservable();

  private trainLoadSource = new Subject<MovingLoad>();
  public trainLoad$ = this.trainLoadSource.asObservable();

  private spanSource = new Subject<Span>();
  public span$ = this.spanSource.asObservable();

  constructor(private localStorageService: LocalStorageService) {
  }

  public setSection(section: Section) {
    this.sectionSource.next(section);
  }

  public setSectionInputUsingType(type: SectionType): void {
    const sectionInputBuilder = sectionInputFactory().getSectionBuilder(type);
    const sectionInput = this.localStorageService.getSectionInput(type) || sectionInputFactory().getInput(type);
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

  public setTrainLoadInputUsingType(type: TrainLoadType): void {
    const trainLoadInput = this.localStorageService.getTrainLoadInput(type) || trainLoadInputFactory().getInput(type);
    const trainLoadInputBuilder = trainLoadInputFactory().getTrainLoadBuilder(type);
    this.trainLoadInputSource.next(trainLoadInput);
  }

  public setSpan(span: Span) {
    this.spanSource.next(span);
  }

  public start(): void {
    this.setSection(startSection1);
    this.setTrainLoad(startHSLMA);
  }
}
