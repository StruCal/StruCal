import { Injectable } from '@angular/core';
import {HttpClientModule, HttpClient} from '@angular/common/http';



@Injectable()
export class HttpService {

  constructor(private http: HttpClient) { }

}
