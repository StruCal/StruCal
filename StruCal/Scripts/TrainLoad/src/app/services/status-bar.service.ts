import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


const dirtyMsg = 'Results are NOT up to date.';
const errorMsg = 'An error has occured. Please try again.';
const validMsg = 'Results are up to date';

const startProcessingMsg = 'Processing... Gathering data.';
const calculationsProcessingMsg = 'Processing... Calculations are being performed.';
const fetchingDataMsg = 'Processing... Fetching data from the server.';

@Injectable()
export class StatusBarService {

  private dirtySource = new BehaviorSubject<boolean>(true);
  private errorSource = new Subject<boolean>();
  private validSource = new Subject<boolean>();
  private calculationsSource = new Subject<boolean>();
  private msgSource = new BehaviorSubject<string>(dirtyMsg);
  private progressSource = new Subject<number>();

  public dirty$ = this.dirtySource.asObservable();
  public error$ = this.errorSource.asObservable();
  public valid$ = this.validSource.asObservable();
  public calculations$ = this.calculationsSource.asObservable();
  public msg$ = this.msgSource.asObservable();
  public progress$ = this.progressSource.asObservable();


  constructor() {
    this.setDirty();
  }


  public setDirty() {
    this.dirtySource.next(true);
    this.errorSource.next(false);
    this.validSource.next(false);
    this.calculationsSource.next(false);

    this.setMsg(dirtyMsg);
  }

  public setError() {
    this.dirtySource.next(false);
    this.errorSource.next(true);
    this.validSource.next(false);
    this.calculationsSource.next(false);

    this.setMsg(errorMsg);
  }


  public setValid() {
    this.dirtySource.next(false);
    this.errorSource.next(false);
    this.validSource.next(true);
    this.calculationsSource.next(false);

    this.setMsg(validMsg);
  }

  public setStartCalculations() {
    this.dirtySource.next(false);
    this.errorSource.next(false);
    this.validSource.next(false);
    this.calculationsSource.next(true);

    this.setMsg(startProcessingMsg);
  }

  public setProcessingCalculations() {
    this.setMsg(calculationsProcessingMsg);
  }

  public setFetchingData() {
    this.setMsg(fetchingDataMsg);
    this.setProgress(0);
  }

  public setProgress(value: number) {
    this.progressSource.next(value);
  }

  private setMsg(value: string) {
    this.msgSource.next(value);
  }

}
