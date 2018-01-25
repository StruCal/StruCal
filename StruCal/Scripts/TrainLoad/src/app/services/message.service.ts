import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Section } from '../../common/structure/section';
import { startSection1 } from '../../common/startData/mockedSection1';


@Injectable()
export class MessageService {

  private sectionSource = new Subject<Section>();

  public section$ = this.sectionSource.asObservable();

  constructor() {
  }

  public setSection(section: Section) {
    this.sectionSource.next(section);
  }


  public start(): void {
    this.setSection(startSection1);
  }
}
