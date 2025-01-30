import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private http: HttpClient) { }

  searchGames(body: any, url: string, option: { headers: HttpHeaders }): Observable<any> {
    return this.http.post(url + '/games/search', body, option);
  }
}
