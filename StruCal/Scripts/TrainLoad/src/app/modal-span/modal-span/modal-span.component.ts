import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalBaseComponent } from '../../modal-base/modal-base.component';
import { StructureService } from '../../services/structure.service';
import { SpanType } from './input/spanType';
import { Span } from '../../../common/structure/span';

@Component({
  selector: 'modal-span',
  templateUrl: './modal-span.component.html',
  styleUrls: ['./modal-span.component.css']
})
export class ModalSpanComponent implements OnInit {
  @ViewChild(ModalBaseComponent)
  private modalBase: ModalBaseComponent;

  public spanLength: number;
  public spanType: string;

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
    const span = this.generateSpan();
    this.structureService.setSpan(span);
    this.hide();
  }

  private generateSpan(): Span {
    const spans = this.spanType === 'SpanType.single' ? [this.spanLength] : [this.spanLength, this.spanLength];

    return { lengths: spans };
  }

}
