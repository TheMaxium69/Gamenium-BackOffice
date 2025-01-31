import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApicallInterface } from '../-interface/apicall.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommentReplyService {

  constructor(private http: HttpClient) { }

  getReplyById(url: string, options: {headers: HttpHeaders}, id: number): Observable<ApicallInterface> {
    return this.http.get<ApicallInterface>(url + "/getReplyById/" + id, options);
  }
}
 