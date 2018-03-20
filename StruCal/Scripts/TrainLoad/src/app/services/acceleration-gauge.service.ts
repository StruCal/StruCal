import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class AccelerationGaugeService {

  private valueSource = new Subject<number>();
  private invisibleSource = new Subject<boolean>();

  public value$ = this.valueSource.asObservable();
  public invisible$ = this.invisibleSource.asObservable();

  constructor() { }

  public setValue(value: number): void {
    this.valueSource.next(value);
  }

  public setInvisible(): void {
    this.invisibleSource.next(true);
  }

  public setVisible(): void {
    this.invisibleSource.next(false);
  }

}
