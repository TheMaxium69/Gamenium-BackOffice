import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApicallInterface } from '../-interface/apicall.interface';

@Injectable({
  providedIn: 'root'
})
export class LogActuService {

  constructor(private http: HttpClient) {}

  getLogActu(searchValue: string, limit: number, url: string, options: { headers: HttpHeaders }): Observable<ApicallInterface> {
    return this.http.post<ApicallInterface>(`${url}/log-actu-view`, { searchValue, limit }, options);
  }
}
