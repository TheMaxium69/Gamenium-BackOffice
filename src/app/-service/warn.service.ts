import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApicallInterface } from '../-interface/apicall.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WarnService {

  constructor(private http: HttpClient) {}

  getAllWarn(url:string, options: {headers: HttpHeaders}): Observable<ApicallInterface>{
    return this.http.get<ApicallInterface>(url + '/warns', options);
  }

  getAllWarnAdmin(url:string, options: {headers: HttpHeaders}): Observable<ApicallInterface>{
    return this.http.get<ApicallInterface>(url + '/warns-admin', options);
  }

  getOneWarn(url: string, options: {headers: HttpHeaders}, id: number): Observable<ApicallInterface> {
    return this.http.get<ApicallInterface>(url + "/onewarn/" + id, options);
  }

  updateWarn(id: number, url: string, option: { headers: HttpHeaders }): Observable<ApicallInterface> {
    return this.http.put<ApicallInterface>(url + "/updatewarn", { id }, option);
  }
}
