import { Injectable } from '@angular/core';
import { Section } from '../common/structure/section';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class MessageService {

  private sectionSource = new Subject<Section>();

  public section = this.sectionSource.asObservable();

  constructor() {
    
   }


  public setSection(section: Section) {
    this.sectionSource.next(section);
  }

}
