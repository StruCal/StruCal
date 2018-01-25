import { Injectable } from '@angular/core';
import { Section } from '../common/structure/section';
import { Subject } from 'rxjs/Subject';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import { startSection } from '../common/startData/mockedSection';

@Injectable()
export class MessageService {

  private sectionSource = new BehaviorSubject<Section>(startSection);

  public section$ = this.sectionSource.asObservable();

  constructor() {
   }

  public setSection(section: Section) {
    this.sectionSource.next(section);
  }

}
