import { Injectable } from '@angular/core';
import { StatusBarService } from './status-bar.service';
import { getProgressInfo } from '../../common/progress/progressProvider';


@Injectable()
export class ProgressService {



  constructor(private statusBarService: StatusBarService) { }


  public setStep(step: number): void {
    const progressInfo = getProgressInfo(step);

    this.statusBarService.setMsg(progressInfo.message);
    this.statusBarService.setProgress(progressInfo.value);

  }
}
