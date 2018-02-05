import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { Subject } from 'rxjs/Subject';
import { ModelInput } from '../input/modelInput';
import { SectionType } from '../../common/types/sectionTypes';
import { sectionInputFactory } from '../modal-section1/Input/sectionInputFactory';
import { TrainLoadType } from '../../common/types/trainLoadType';
import { trainLoadInputFactory } from '../modal-train-load/input/trainLoadInputFactory';

@Injectable()
export class InputService {

  constructor(private localStorageService: LocalStorageService) { }

  private sectionInputSource = new Subject<Array<ModelInput>>();
  public sectionInput$ = this.sectionInputSource.asObservable();

  private trainLoadInputSource = new Subject<Array<ModelInput>>();
  public trainLoadInput$ = this.trainLoadInputSource.asObservable();

  public setSectionInputUsingType(type: SectionType): void {
    const sectionInputBuilder = sectionInputFactory().getSectionBuilder(type);
    const sectionInput = this.localStorageService.getSectionInput(type) || sectionInputFactory().getInput(type);
    this.sectionInputSource.next(sectionInput);
  }

  public saveSectionInput(inputs: Array<ModelInput>, type: SectionType): void {
    this.localStorageService.saveSectionInput(inputs, type);
  }

  public saveTrainLoadInput(inputs: Array<ModelInput>, type: TrainLoadType): void {
    this.localStorageService.saveTrainLoadInput(inputs, type);
  }

  public setTrainLoadInputUsingType(type: TrainLoadType): void {
    const trainLoadInput = this.localStorageService.getTrainLoadInput(type) || trainLoadInputFactory().getInput(type);
    const trainLoadInputBuilder = trainLoadInputFactory().getTrainLoadBuilder(type);
    this.trainLoadInputSource.next(trainLoadInput);
  }
}
