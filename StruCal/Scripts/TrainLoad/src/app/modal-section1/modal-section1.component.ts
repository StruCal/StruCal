import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { ModalBaseComponent } from '../modal-base/modal-base.component';
import { ModalBase } from '../modal-base/modalBase';
import { Drawing2dComponent } from '../drawing2d/drawing2d.component';
import { mockedSection } from '../../common/mocks/mockedSection';
import { MessageService } from '../message.service';

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

  constructor(private messageService: MessageService) {

  }

  show(): void {
    this.modalBase.show();
    this.messageService.section$.subscribe(section => {
      setTimeout(() =>
        this.drawing2d.draw(mockedSection)
        , 100);
    });
  }
  hide(): void {
    this.modalBase.hide();
  }

  ngOnInit() {
  }

}
