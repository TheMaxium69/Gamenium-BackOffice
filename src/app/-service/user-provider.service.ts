import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {ApicallInterface} from "../-interface/apicall.interface";

@Injectable({
  providedIn: 'root'
})
export class UserProviderService {

  constructor(private http: HttpClient) {}

  getProviderByUser(url:string, options: {headers: HttpHeaders}): Observable<ApicallInterface> {
    return this.http.get<ApicallInterface>(url + '/getProvider/', options);
  }

  updateProvider(id: number, body: any, url: string, option: { headers: HttpHeaders }): Observable<ApicallInterface> {
    return this.http.put<ApicallInterface>( url + '/provider/' + id, body, option);
  }

}
