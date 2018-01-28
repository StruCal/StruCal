import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ModalBaseComponent } from '../modal-base/modal-base.component';
import { StructureService } from '../services/structure.service';
import { TrainLoadType } from '../../common/trainLoadBuilders/trainLoadType';
import { trainLoadTitleFactory, trainLoadImagePathFactory } from './input/trainLoadHTMLHelper';

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

  constructor(private structureService: StructureService) {
    structureService.trainLoadInput$.subscribe(e => this.inputs = e);
  }

  show(trainLoadType: TrainLoadType) {
    this.trainLoadType = trainLoadType;
    this.title = trainLoadTitleFactory[trainLoadType];
    this.imagePath = trainLoadImagePathFactory[trainLoadType];
    this.modalBase.show();
    this.structureService.setTrainLoadUsingType(trainLoadType);
  }

  hide() {
    this.modalBase.hide();
  }
  ngOnInit() {
  }

}
