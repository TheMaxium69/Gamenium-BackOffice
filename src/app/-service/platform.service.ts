import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {ApicallInterface} from "../-interface/apicall.interface";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PlatformService {

  constructor(private http: HttpClient) {}

  getPlateformsRandom(url:string, option: {headers: HttpHeaders}): Observable<ApicallInterface> {
    return this.http.get<ApicallInterface>(url + `/plateforms-random`, option);
  }
}
