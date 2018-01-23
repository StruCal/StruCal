import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { ModalBaseComponent } from '../modal-base/modal-base.component';
import { ModalBase } from '../modal-base/modalBase';
import { Drawing2dComponent } from '../drawing2d/drawing2d.component';
import { mockedSection } from '../../common/mocks/mockedSection';

@Component({
  selector: 'modal-section1',
  templateUrl: './modal-section1.component.html',
  styleUrls: ['./modal-section1.component.css']
})
export class ModalSection1Component implements OnInit, ModalBase {

  @ViewChild(ModalBaseComponent)
  private modalBase: ModalBaseComponent;

  @ViewChild(Drawing2dComponent)
  private drawing2d: Drawing2dComponent;

  constructor() { }

  show(): void {
    this.modalBase.show();
    setTimeout(() =>
      this.drawing2d.draw(mockedSection)
      , 5);
  }
  hide(): void {
    this.modalBase.hide();
  }

  ngOnInit() {
  }

}
