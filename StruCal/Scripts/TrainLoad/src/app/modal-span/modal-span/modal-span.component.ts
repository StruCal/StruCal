import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalBaseComponent } from '../../modal-base/modal-base.component';
import { StructureService } from '../../services/structure.service';
import { spanType } from './input/spanType';

@Component({
  selector: 'modal-span',
  templateUrl: './modal-span.component.html',
  styleUrls: ['./modal-span.component.css']
})
export class ModalSpanComponent implements OnInit {
  @ViewChild(ModalBaseComponent)
  private modalBase: ModalBaseComponent;

  public spanLength: number;
  public isSingleSpan: spanType;

  constructor(private structureService: StructureService) {
  }

  show(): void {
    this.modalBase.setSmallModal();
    this.modalBase.show();
  }
  hide(): void {
    this.modalBase.hide();
  }

  onChange() {
  }

  ngOnInit() {
  }

  private saveAndClose() {
    this.hide();
  }

}
