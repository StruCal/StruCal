import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { CalculationsInput } from '../../common/calculations/calculationsInput';
import { ResultData } from '../../common/resultData/resultData';
import { isProduction } from '../../../buildScripts/buildType';
import { ProgressMessage } from '../../common/progress/progressMessage';
import { StatusBarService } from './status-bar.service';
import { ProgressProvider } from '../../common/progress/progressProvider';

const baseUrl = isProduction ? '' : 'http://localhost:50025';

const startUrl = () => `${baseUrl}/api/TrainLoadApi`;
const progressUrl = guid => `${baseUrl}/api/TrainLoadApi/Progress/${guid}`;
const resultUrl = guid => `${baseUrl}/api/TrainLoadApi/Result/${guid}`;
@Injectable()
export class HttpService {

  private progressProvider = new ProgressProvider();

  // refactor to decorator
  constructor(private http: HttpClient, private statusBarService: StatusBarService) {

  }


  async getResult(inputData: CalculationsInput): Promise<ResultData> {

    const guid = await this.startCalculations(inputData);

    const p = this.progressProvider.getProgress(0);
    const m = this.progressProvider.getMessage(0);
    this.statusBarService.setProgress(p);
    this.statusBarService.setMsg(m);


    await this.waitForFinish(guid);

    const result = await this.fetchResult(guid);
    return result;
  }

  private async startCalculations(inputData: CalculationsInput): Promise<string> {

    return await this.http.post<string>(startUrl(), inputData).toPromise();
  }

  private async waitForFinish(guid: string): Promise<void> {

    let hasResult = false;

    while (!hasResult) {
      const response = await this.http.get<ProgressMessage>(progressUrl(guid)).toPromise();
      
      hasResult = response.hasResult;

      const p = this.progressProvider.getProgress(response.progress);
      const m = this.progressProvider.getMessage(response.progress);
      this.statusBarService.setProgress(p);
      this.statusBarService.setMsg(m);

    }
  }

  private async fetchResult(guid: string): Promise<ResultData> {
    return await this.http.get<ResultData>(resultUrl(guid)).toPromise();
  }

}
