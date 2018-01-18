import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ResultData } from '../3DSolver/resultData/resultData';
import { CalculationsInput } from '../3DSolver/calculations/calculationsInput';


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
