import { Injectable } from '@angular/core';
import { ModelInput } from '../input/modelInput';
import { SectionType } from '../../common/types/sectionTypes';
import { TrainLoadType } from '../../common/types/trainLoadType';
import { Span } from '../../common/structure/span';

const sectionTypeKey = 'SectionType';
const trainLoadTypeKey = 'TrainLoadType';
const spanKey = 'Span';

@Injectable()
export class LocalStorageService {

  constructor() { }


  saveInput(input: Array<ModelInput>, key: string): void {
    localStorage.setItem(key, JSON.stringify(input));
  }

  getInput(key: string): string {
    return localStorage.getItem(key);
  }

  saveSpan(span: Span): void {
    localStorage.setItem(spanKey, JSON.stringify(span));
  }

  saveSectionData(input: Array<ModelInput>, type: SectionType) {
    localStorage.setItem(sectionTypeKey, JSON.stringify(type));
    const inputKey = this.getSectionInputKey(type);
    this.saveInput(input, inputKey);
  }

  getSectionInput(type: SectionType): Array<ModelInput> {
    const key = this.getSectionInputKey(type);
    const inputs = JSON.parse(this.getInput(key));
    return inputs;
  }

  saveTrainLoadData(input: Array<ModelInput>, type: TrainLoadType) {
    localStorage.setItem(trainLoadTypeKey, JSON.stringify(type));
    const inputKey = this.getTrainLoadInputKey(type);
    this.saveInput(input, inputKey);
  }

  getTrainLoadInput(type: TrainLoadType) {
    const key = this.getTrainLoadInputKey(type);
    const inputs = JSON.parse(this.getInput(key));
    return inputs;
  }

  getSectionType(): SectionType {
    const result = JSON.parse(localStorage.getItem(sectionTypeKey));
    return result;
  }

  getTrainLoadType(): TrainLoadType {
    const result = JSON.parse(localStorage.getItem(trainLoadTypeKey));
    return result;
  }

  getSpan(): Span {
    const result  = JSON.parse(localStorage.getItem(spanKey));
    return result;
  }

  private getSectionInputKey(type: SectionType): string {
    return `SectionInput::${SectionType[type]}`;
  }

  private getTrainLoadInputKey(type: TrainLoadType): string {
    return `TrainLoadInput::${TrainLoadType[type]}`;
  }


}
