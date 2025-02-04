import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {ApicallInterface} from "../-interface/apicall.interface";

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private http: HttpClient) { }

  searchGames(body: any, url: string, option: { headers: HttpHeaders }): Observable<any> {
    return this.http.post(url + '/games/search', body, option);
  }

  getGame(id: number, url: string, option: {headers: HttpHeaders}): Observable<ApicallInterface> {
    return this.http.get<ApicallInterface>(url +'/game/' + id, option);
  }
}
