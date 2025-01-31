import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApicallInterface } from '../-interface/apicall.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HistoryMyGameService {

  constructor(private http: HttpClient) { }

  getOneMyGame(idMyGame: number, url:string, option: {headers: HttpHeaders}): Observable<ApicallInterface> {
    return this.http.get<ApicallInterface>(url + '/OneMyGame/' + idMyGame, option);
  }
}
