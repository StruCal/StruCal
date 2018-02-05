import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { Subject } from 'rxjs/Subject';
import { ModelInput } from '../input/modelInput';
import { SectionType } from '../../common/types/sectionTypes';
import { sectionInputFactory } from '../modal-section1/Input/sectionInputFactory';
import { TrainLoadType } from '../../common/types/trainLoadType';
import { trainLoadInputFactory } from '../modal-train-load/input/trainLoadInputFactory';
import { trainLoadImagePathFactory } from '../modal-train-load/input/trainLoadHTMLHelper';

@Injectable()
export class InitializationService {

  constructor(private localStorageService: LocalStorageService) { }

  public getSectionInput(type: SectionType): Array<ModelInput> {
    const sectionInput = this.localStorageService.getSectionInput(type) || sectionInputFactory().getInput(type);
    return sectionInput;
  }

  public getSectionType(): SectionType {
    return this.localStorageService.getSectionType() || SectionType.Section1;
  }

  public saveSectionInput(inputs: Array<ModelInput>, type: SectionType): void {
    this.localStorageService.saveSectionData(inputs, type);
  }

  public saveTrainLoadInput(inputs: Array<ModelInput>, type: TrainLoadType): void {
    this.localStorageService.saveTrainLoadData(inputs, type);
  }

  public getTrainLoadInput(type: TrainLoadType): Array<ModelInput> {
    const trainLoadInput = this.localStorageService.getTrainLoadInput(type) || trainLoadInputFactory().getInput(type);
    return trainLoadInput;
  }

  public getTrainLoadType(): TrainLoadType {
    return this.localStorageService.getTrainLoadType() || TrainLoadType.HSLMA;
  }
}
