import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ApicallInterface} from "../-interface/apicall.interface";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BadgeService {


  constructor(private http: HttpClient) { }

  getBadgeAll(url:string, options:{headers: HttpHeaders}): Observable<ApicallInterface> {
    return this.http.get<ApicallInterface>(url + '/badges', options);
  }

}
