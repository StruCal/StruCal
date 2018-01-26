import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ModalBaseComponent } from '../modal-base/modal-base.component';
import { StructureService } from '../services/structure.service';
import { TrainLoadType } from '../../common/trainLoadBuilders/trainLoadType';

@Component({
  selector: 'modal-train-load',
  templateUrl: './modal-train-load.component.html',
  styleUrls: ['./modal-train-load.component.css']
})
export class ModalTrainLoadComponent implements OnInit {
  trainLoadType: TrainLoadType;
  @ViewChild(ModalBaseComponent)
  private modalBase: ModalBaseComponent;

  @Input() inputs;

  constructor(private structureSecrive: StructureService) {
    structureSecrive.trainLoadInput$.subscribe(e => this.inputs = e);
  }

  show(trainLoadType: TrainLoadType) {
    this.trainLoadType = trainLoadType;

    this.modalBase.show();
    this.structureSecrive.setTrainLoadUsingType(trainLoadType);
  }

  hide() {
    this.modalBase.hide();
  }
  ngOnInit() {
  }

}
