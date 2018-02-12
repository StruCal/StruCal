import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalBaseComponent } from '../modal-base/modal-base.component';
import { StructureService } from '../services/structure.service';
import { SpanType } from './input/spanType';
import { Span } from '../../common/structure/span';
import { InputService } from '../services/input.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'modal-span',
  templateUrl: './modal-span.component.html',
  styleUrls: ['./modal-span.component.css']
})
export class ModalSpanComponent implements OnInit {
  @ViewChild(ModalBaseComponent)
  private modalBase: ModalBaseComponent;

  public spanLength: number;
  public spanType: string;

  constructor(private structureService: StructureService,
              private inputService: InputService) {
  }

  show(): void {
    this.modalBase.setSmallModal();
    this.modalBase.show();
    const span = this.inputService.getSpan();
    this.spanLength = span.lengths[0];
    const type = span.lengths.length === 1 ? SpanType.single : SpanType.double;
    this.spanType = SpanType[type];
  }
  hide(): void {
    this.modalBase.hide();
  }

  onChange() {
  }

  ngOnInit() {
  }

 saveAndClose() {
    const span = this.generateSpan();
    this.structureService.setSpan(span);
    this.inputService.saveSpan(span);
    this.hide();
  }

  private generateSpan(): Span {
    const spans = this.spanType === 'single' ? [this.spanLength] : [this.spanLength, this.spanLength];

    return { lengths: spans };
  }

}
