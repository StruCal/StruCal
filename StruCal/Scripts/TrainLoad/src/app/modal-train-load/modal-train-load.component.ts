import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ModalBaseComponent } from '../modal-base/modal-base.component';
import { StructureService } from '../services/structure.service';
import { trainLoadTitleFactory, trainLoadImagePathFactory } from './input/trainLoadHTMLHelper';
import { trainLoadInputFactory } from './input/trainLoadInputFactory';
import { TrainLoadType } from '../../common/types/trainLoadType';
import { InputService } from '../services/initialization.service';

@Component({
  selector: 'modal-train-load',
  templateUrl: './modal-train-load.component.html',
  styleUrls: ['./modal-train-load.component.css']
})
export class ModalTrainLoadComponent implements OnInit {
  private trainLoadType: TrainLoadType;

  @ViewChild(ModalBaseComponent)
  private modalBase: ModalBaseComponent;

  @Input() inputs;
  title: string;
  imagePath: string;
  invalid: boolean;

  constructor(private structureService: StructureService,
              private inputService: InputService) {

  }

  show(trainLoadType: TrainLoadType) {
    this.trainLoadType = trainLoadType;
    this.title = trainLoadTitleFactory[trainLoadType];
    this.imagePath = trainLoadImagePathFactory[trainLoadType];
    this.modalBase.show();
    this.inputs = this.inputService.getTrainLoadInput(trainLoadType);
  }

  hide() {
    this.modalBase.hide();
  }

  saveAndClose() {
    this.inputService.saveTrainLoadInput(this.inputs, this.trainLoadType);

    const trainLoad = trainLoadInputFactory()
    .getTrainLoadBuilder(this.trainLoadType)
    .FromInput(this.inputs);

    this.structureService.setTrainLoad(trainLoad);
    this.structureService.setTrainLoadType(this.trainLoadType);
    this.hide();
  }

  onChange(invalid: boolean) {
    this.invalid = invalid;
  }

  ngOnInit() {
  }

}
