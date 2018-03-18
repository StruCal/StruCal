import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class AccelerationGaugeService {

  private valueSource = new Subject<number>();

  public value$ = this.valueSource.asObservable();

  constructor() { }

  public setValue(value: number): void {
    this.valueSource.next(value);
  }

}
