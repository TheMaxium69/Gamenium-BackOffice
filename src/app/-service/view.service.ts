import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ApicallInterface} from "../-interface/apicall.interface";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ViewService {


  constructor(private http: HttpClient) {}

  getPostActuViews(idPostActu: number, url: string, option: {headers: HttpHeaders}): Observable<ApicallInterface> {
    return this.http.get<ApicallInterface>(url + '/view-actu-show/' + idPostActu, option);
  }

  getProviderViews(idProvider: number, url: string, option: {headers: HttpHeaders}): Observable<ApicallInterface> {
    return this.http.get<ApicallInterface>(url + '/view-provider-show/' + idProvider, option);
  }

}
