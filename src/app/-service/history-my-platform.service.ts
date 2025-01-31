import { Injectable } from '@angular/core';
import { ApicallInterface } from '../-interface/apicall.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HistoryMyPlatformService {

  constructor(private http: HttpClient) { }

  getOneMyHmpById(idMyPlatform: number, url:string, option: {headers: HttpHeaders}): Observable<ApicallInterface> {
    return this.http.get<ApicallInterface>(url + '/OneMyPlatform/' + idMyPlatform, option);
  }
}
