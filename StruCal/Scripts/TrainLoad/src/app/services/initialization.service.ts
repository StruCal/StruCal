import { Injectable } from '@angular/core';
import { Section } from '../../common/structure/section';
import { LocalStorageService } from './local-storage.service';
import { InputService } from './input.service';
import { sectionInputFactory } from '../modal-section1/Input/sectionInputFactory';
import { trainLoadInputFactory } from '../modal-train-load/input/trainLoadInputFactory';
import { MovingLoad } from '../../common/movingLoad/movingLoad';
import { SectionType } from '../../common/types/sectionTypes';
import { TrainLoadType } from '../../common/types/trainLoadType';
import { Span } from '../../common/structure/span';

@Injectable()
export class InitializationService {

  constructor(private inputService: InputService) { }

    public get sectionType(): SectionType{
     return this.inputService.getSectionType();
    }

    public get trainLoadType(): TrainLoadType{
      return this.inputService.getTrainLoadType();
    }

  public get section(): Section {
    const sectionType = this.inputService.getSectionType();
    const sectionInput = this.inputService.getSectionInput(sectionType);
    const section = sectionInputFactory().getSectionBuilder(sectionType).sectionFromInput(sectionInput);
    return section;
  }

  public get trainLoad(): MovingLoad {
    const trainLoadType = this.inputService.getTrainLoadType();
    const trainLoadInput = this.inputService.getTrainLoadInput(trainLoadType);
    const trainLoad = trainLoadInputFactory().getTrainLoadBuilder(trainLoadType).FromInput(trainLoadInput);
    return trainLoad;
  }

  public get span(): Span {
    const span = this.inputService.getSpan();
    return span;
  }
}
