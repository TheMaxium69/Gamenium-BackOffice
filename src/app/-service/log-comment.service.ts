import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {ApicallInterface} from "../-interface/apicall.interface";

@Injectable({
  providedIn: 'root'
})
export class LogCommentService {

  constructor(private http: HttpClient) {}

  getLogComment(searchValue: string, limit: number, url: string, options: { headers: HttpHeaders }): Observable<ApicallInterface> {
    return this.http.post<ApicallInterface>(`${url}/log-comment`, { searchValue, limit }, options);
  }
}
