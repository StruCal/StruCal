import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ResultData } from './resultData/resultData';
import { CalculationsInput } from './calculations/calculationsInput';
import { Observable } from 'rxjs/Observable';


const url = 'http://localhost:50025/api/TrainLoadApi';

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
