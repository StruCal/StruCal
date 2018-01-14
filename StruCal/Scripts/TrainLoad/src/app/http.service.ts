import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ResultData } from './resultData/resultData';
import { CalculationsInput } from './calculations/calculationsInput';


const url = 'http://localhost:50025/api/TrainLoadApi';

@Injectable()
export class HttpService {

  public onError: any;

  constructor(private http: HttpClient) {
    this.onError = error => { };
  }


  getResult(inputData: CalculationsInput): ResultData {
    let result: ResultData;
    this.http.post<ResultData>(url, inputData).subscribe(
      data => {
        result = data;
      },
      error => this.onError(error),
    );

    return result;
  }

}
