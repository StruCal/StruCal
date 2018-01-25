import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { ModalBaseComponent } from '../modal-base/modal-base.component';
import { ModalBase } from '../modal-base/modalBase';
import { Drawing2dComponent } from '../drawing2d/drawing2d.component';
import { mockedSection } from '../../common/startData/mockedSection';
import { MessageService } from '../message.service';
import { SectionModalInput } from './Input/sectionModalInput';
import { SectionType } from '../../common/sectionBuilders/sectionTypes';
import { sectionInputFactory } from './Input/sectionInputFactory';
import { Section } from '../../common/structure/section';



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

  private sectionInputBuilder: any;
  private section: Section;
  private sectionType: SectionType;

  inputs: Array<SectionModalInput>;

  constructor(private messageService: MessageService) {

  }

  show(sectionType: SectionType): void {
    this.sectionType = sectionType;
    this.modalBase.show();

    this.sectionInputBuilder = sectionInputFactory().getSectionBuilder(sectionType);
    this.setInputs();
    this.updateSection();
    this.draw();

  }
  hide(): void {
    this.modalBase.hide();
  }

  onChange() {
    this.updateSection();
    this.draw();
  }

  ngOnInit() {
  }

  private setInputs() {
    this.inputs = JSON.parse(localStorage.getItem(this.getLocalStorageKey())) || sectionInputFactory().getInput(this.sectionType);
  }

  private saveAndClose() {
    this.messageService.setSection(this.section);
    localStorage.setItem(this.getLocalStorageKey(), JSON.stringify(this.inputs));
    this.hide();
  }

  private getLocalStorageKey(): string {
    return SectionType[this.sectionType];
  }

  private updateSection(): void {
    this.section = this.sectionInputBuilder(this.inputs);
  }

  private draw() {
    setTimeout(() =>
      this.drawing2d.draw(this.section)
      , 100);
  }

}
