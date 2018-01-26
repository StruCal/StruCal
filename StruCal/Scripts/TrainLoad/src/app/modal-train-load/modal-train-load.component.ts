import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalBaseComponent } from '../modal-base/modal-base.component';

@Component({
  selector: 'modal-train-load',
  templateUrl: './modal-train-load.component.html',
  styleUrls: ['./modal-train-load.component.css']
})
export class ModalTrainLoadComponent implements OnInit {
  @ViewChild(ModalBaseComponent)
  private modalBase: ModalBaseComponent;

  constructor() { }

  show() {
    this.modalBase.show();
  }

  hide() {
    this.modalBase.hide();
  }
  ngOnInit() {
  }

}
