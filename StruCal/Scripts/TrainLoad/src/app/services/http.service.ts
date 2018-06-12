import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { CalculationsInput } from '../../common/calculations/calculationsInput';
import { ResultData } from '../../common/resultData/resultData';
import { isProduction } from '../../../buildScripts/buildType';
import { ProgressMessage } from '../../common/progress/progressMessage';
import { StatusBarService } from './status-bar.service';

const baseUrl = isProduction ? '' : 'http://localhost:50025';

const startUrl = () => `${baseUrl}/api/TrainLoadApi`;
const progressUrl = guid => `${baseUrl}/api/TrainLoadApi/Progress/${guid}`;
const resultUrl = guid => `${baseUrl}/api/TrainLoadApi/Result/${guid}`;
@Injectable()
export class HttpService {



  constructor(private http: HttpClient, private statusBarService: StatusBarService) {

  }


  async getResult(inputData: CalculationsInput): Promise<ResultData> {

    const guid = await this.http.post<string>(startUrl(), inputData).toPromise();

    await this.waitForFinish(guid);

    const result = this.http.get<ResultData>(resultUrl(guid)).toPromise();
    return result;
  }

  private async waitForFinish(guid: string) {

    let hasResult = false;

    while (!hasResult) {
      const response = await this.http.get<ProgressMessage>(progressUrl(guid)).toPromise();
      this.statusBarService.setMsg(response.progress.toString());
      hasResult = response.hasResult;
    }
  }

}
