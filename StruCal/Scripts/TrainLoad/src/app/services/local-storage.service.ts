import { Injectable } from '@angular/core';
import { ModelInput } from '../input/modelInput';
import { SectionType } from '../../common/sectionBuilders/sectionTypes';

@Injectable()
export class LocalStorageService {

  constructor() { }


  saveInput(input: Array<ModelInput>, key: string): void {
    localStorage.setItem(key, JSON.stringify(input));
  }

  getInput(key: string): string {
    return localStorage.getItem(key);
  }

  saveSectionInput(input: Array<ModelInput>, type: SectionType) {
    const key = this.getSectionInputKey(type);
    this.saveInput(input, key);
  }

  getSectionInput(type: SectionType): Array<ModelInput> {
    const key = this.getSectionInputKey(type);
    const inputs = JSON.parse(this.getInput(key));
    return inputs;
  }

  private getSectionInputKey(type: SectionType): string {
    return `SectionType::${SectionType[type]}`;
  }

}