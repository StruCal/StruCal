import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { CalculationsInput } from '../../common/calculations/calculationsInput';
import { ResultData } from '../../common/resultData/resultData';
import { isProduction } from '../../../buildScripts/buildType';
import { StatusBarService } from './status-bar.service';
import { ProgressService } from './progress.service';
import { progressStep } from '../../common/progress/progressProvider';
import { ProgressResponse } from '../../common/progress/progressResponse';

const baseUrl = isProduction ? '' : 'http://localhost:50025';

const startUrl = () => `${baseUrl}/api/TrainLoadApi`;
const progressUrl = guid => `${baseUrl}/api/TrainLoadApi/Progress/${guid}`;
const resultUrl = guid => `${baseUrl}/api/TrainLoadApi/Result/${guid}`;
@Injectable()
export class HttpService {

  // refactor to decorator
  constructor(private http: HttpClient, private progressService: ProgressService) {

  }


  public async getResult(inputData: CalculationsInput): Promise<ResultData> {

    this.progressService.setStep(progressStep.gatheringData);
    const guid = await this.startCalculations(inputData);

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
      const response = await this.http.get<ProgressResponse>(progressUrl(guid)).toPromise();

      hasResult = response.hasResult;
      this.progressService.setStep(response.progress);


    }
  }

  private async fetchResult(guid: string): Promise<ResultData> {
    return await this.http.get<ResultData>(resultUrl(guid)).toPromise();
  }

}
