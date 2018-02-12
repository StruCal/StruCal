import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { CalculationsInput } from '../../common/calculations/calculationsInput';
import { ResultData } from '../../common/resultData/resultData';



// const url = 'http://localhost:50025/api/TrainLoadApi';
const url = '/api/TrainLoadApi';
@Injectable()
export class HttpService {

  public onError: any;

  constructor(private http: HttpClient) {
    this.onError = error => { };
  }


  getResult(inputData: CalculationsInput): Observable<ResultData> {

    return this.http.post<ResultData>(url, inputData);

  }

}
