import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { ModalBaseComponent } from '../modal-base/modal-base.component';
import { ModalBase } from '../modal-base/modalBase';

@Component({
  selector: 'modal-section1',
  templateUrl: './modal-section1.component.html',
  styleUrls: ['./modal-section1.component.css']
})
export class ModalSection1Component implements OnInit, ModalBase {

  @ViewChild(ModalBaseComponent)
  private modalBase: ModalBaseComponent;
  constructor() { }

  show(): void {
    this.modalBase.show();
  }
  hide(): void {
    this.modalBase.hide();
  }

  ngOnInit() {
  }

}
