import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class StatusBarService {

  private dirtySource = new Subject<boolean>();
  private errorSource = new Subject<boolean>();
  private validSource = new Subject<boolean>();
  private progressSource = new Subject<boolean>();

  public dirty$ = this.dirtySource.asObservable();
  public error$ = this.errorSource.asObservable();
  public valid$ = this.validSource.asObservable();
  public progress$ = this.progressSource.asObservable();

  constructor() { }


  public setDirty() {
    this.dirtySource.next(true);
    this.errorSource.next(false);
    this.validSource.next(false);
    this.progressSource.next(false);
  }

  public setError() {
    this.dirtySource.next(false);
    this.errorSource.next(true);
    this.validSource.next(false);
    this.progressSource.next(false);
  }

  public setProgress() {
    this.dirtySource.next(false);
    this.errorSource.next(false);
    this.validSource.next(false);
    this.progressSource.next(true);
  }

  public setValid() {
    this.dirtySource.next(false);
    this.errorSource.next(false);
    this.validSource.next(false);
    this.progressSource.next(true);
  }

}
