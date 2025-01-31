import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApicallInterface } from '../-interface/apicall.interface';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) { }
  
  getCommentById(url: string, options: {headers: HttpHeaders}, id: number): Observable<ApicallInterface> {
    return this.http.get<ApicallInterface>(url + "/getCommentById/" + id, options);
  }
}
