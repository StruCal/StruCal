import { Component, OnInit, Input } from '@angular/core';
import { ViewChild } from '@angular/core';
import { ModalBaseComponent } from '../modal-base/modal-base.component';
import { ModalBase } from '../modal-base/modalBase';
import { Drawing2dComponent } from '../drawing2d/drawing2d.component';
import { startSection1 } from '../../common/startData/mockedSection1';
import { sectionInputFactory } from './Input/sectionInputFactory';
import { Section } from '../../common/structure/section';
import { StructureService } from '../services/structure.service';
import { ModelInput } from '../input/modelInput';
import { sectionTitleFactory } from './Input/sectionTitles';
import { SectionType } from '../../common/types/sectionTypes';
import { InputService } from '../services/initialization.service';



@Component({
  selector: 'modal-section1',
  templateUrl: './modal-section1.component.html',
  styleUrls: ['./modal-section1.component.css']
})

export class ModalSection1Component implements OnInit {

  @ViewChild(ModalBaseComponent)
  private modalBase: ModalBaseComponent;

  @ViewChild(Drawing2dComponent)
  private drawing2d: Drawing2dComponent;

  private section: Section;
  private sectionType: SectionType;

  public inputs: Array<ModelInput>;
  public title: string;
  public invalid: boolean;

  constructor(private structureService: StructureService,
              private initializationService: InputService) {
  }

  show(sectionType: SectionType): void {
    this.title = sectionTitleFactory[sectionType];
    this.sectionType = sectionType;
    this.modalBase.show();
    this.inputs = this.initializationService.getSectionInput(sectionType);
    this.draw();
  }
  hide(): void {
    this.modalBase.hide();
  }

  onChange(invalid: boolean) {
    this.invalid = invalid;
    if (invalid) {
      this.drawing2d.reset();
      return;
    }
    this.draw();
  }

  ngOnInit() {
  }

  private saveAndClose() {
    this.initializationService.saveSectionInput(this.inputs, this.sectionType);
    this.structureService.setSection(this.section);
    this.hide();
  }

  private draw() {
    this.section = sectionInputFactory().getSectionBuilder(this.sectionType).section1FromInput(this.inputs);
    setTimeout(() =>
      this.drawing2d.draw(this.section)
      , 100);
  }

}
