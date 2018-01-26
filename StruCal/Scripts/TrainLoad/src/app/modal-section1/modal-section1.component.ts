import { Component, OnInit, Input } from '@angular/core';
import { ViewChild } from '@angular/core';
import { ModalBaseComponent } from '../modal-base/modal-base.component';
import { ModalBase } from '../modal-base/modalBase';
import { Drawing2dComponent } from '../drawing2d/drawing2d.component';
import { startSection1 } from '../../common/startData/mockedSection1';
import { SectionType } from '../../common/sectionBuilders/sectionTypes';
import { sectionInputFactory } from './Input/sectionInputFactory';
import { Section } from '../../common/structure/section';
import { StructureService } from '../services/structure.service';
import { ModelInput } from '../input/modelInput';
import { sectionTitleFactory } from './Input/sectionTitles';



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

  constructor(private structureService: StructureService) {
    this.structureService.sectionInput$.subscribe(e => this.inputs = e);
    this.structureService.section$.subscribe(e => this.section = e);
  }

  show(sectionType: SectionType): void {
    this.title = sectionTitleFactory[sectionType];
    this.sectionType = sectionType;
    this.modalBase.show();
    this.structureService.setSectionUsingType(sectionType);
    this.draw();
  }
  hide(): void {
    this.modalBase.hide();
  }

  onChange() {
    const newSection = sectionInputFactory().getSectionBuilder(this.sectionType).section1FromInput(this.inputs);
    this.structureService.setSection(newSection);
    this.draw();
  }

  ngOnInit() {
  }

  private saveAndClose() {
    this.structureService.saveSectionInput(this.inputs, this.sectionType);
    this.hide();
  }


  private draw() {
    setTimeout(() =>
      this.drawing2d.draw(this.section)
      , 100);
  }

}
