import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ApicallInterface} from "../-interface/apicall.interface";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class StatService {

  constructor(private http: HttpClient) { }

  getStatGlobal(url:string, options: {headers: HttpHeaders}): Observable<ApicallInterface> {
    return this.http.get<ApicallInterface>(url + '/stats/global', options);
  }

  getStatSanction(url:string, options: {headers: HttpHeaders}): Observable<ApicallInterface> {
    return this.http.get<ApicallInterface>(url + '/stats/sanction', options);
  }

  getStatCopy(url:string, options: {headers: HttpHeaders}): Observable<ApicallInterface> {
    return this.http.get<ApicallInterface>(url + '/stats/copy', options);
  }

  getStatOneGame(id: number, url: string, options: { headers: HttpHeaders }) {
    return this.http.get<ApicallInterface>(url + '/stats/gameOne/' + id, options);
  }
}
