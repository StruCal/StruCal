import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

const progressMsg = 'Processing... It may take a few seconds.';
const dirtyMsg = 'Results are NOT up to date.';
const errorMsg = 'An error has occured. Please try again.';
const validMsg = 'Results are up to date';

@Injectable()
export class StatusBarService {

  private dirtySource = new BehaviorSubject<boolean>(true);
  private errorSource = new Subject<boolean>();
  private validSource = new Subject<boolean>();
  private progressSource = new Subject<boolean>();
  private msgSource = new BehaviorSubject<string>(dirtyMsg);

  public dirty$ = this.dirtySource.asObservable();
  public error$ = this.errorSource.asObservable();
  public valid$ = this.validSource.asObservable();
  public progress$ = this.progressSource.asObservable();
  public msg$ = this.msgSource.asObservable();

  constructor() {
    this.setDirty();
  }


  public setDirty() {
    this.dirtySource.next(true);
    this.errorSource.next(false);
    this.validSource.next(false);
    this.progressSource.next(false);

    this.msgSource.next(dirtyMsg);
  }

  public setError() {
    this.dirtySource.next(false);
    this.errorSource.next(true);
    this.validSource.next(false);
    this.progressSource.next(false);

    this.msgSource.next(errorMsg);
  }

  public setProgress() {
    this.dirtySource.next(false);
    this.errorSource.next(false);
    this.validSource.next(false);
    this.progressSource.next(true);

    this.msgSource.next(progressMsg);
  }

  public setValid() {
    this.dirtySource.next(false);
    this.errorSource.next(false);
    this.validSource.next(true);
    this.progressSource.next(false);

    this.msgSource.next(validMsg);
  }

  public setMsg(value: string) {
    this.msgSource.next(value);
  }

}
