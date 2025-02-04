import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApicallInterface } from '../-interface/apicall.interface';

@Injectable({
  providedIn: 'root'
})
export class ModerationService {

  constructor(private http: HttpClient) { }

  moderateDeleteComment(url:string, options: {headers: HttpHeaders}): Observable<ApicallInterface> {
    return this.http.post<ApicallInterface>(url + 'modo-comment', options);
  }

  moderateDeleteCommentReply(url:string, options: {headers: HttpHeaders}): Observable<ApicallInterface> {
    return this.http.post<ApicallInterface>(url + 'modo-comment-reply', options);
  }

  moderateDeleteActu(url:string, options: {headers: HttpHeaders}): Observable<ApicallInterface> {
    return this.http.post<ApicallInterface>(url + 'modo-actu', options);
  }

  moderateDeletePP(url:string, options: {headers: HttpHeaders}): Observable<ApicallInterface> {
    return this.http.post<ApicallInterface>(url + 'modo-pp', options);
  }
  moderateHmp(url:string, options: {headers: HttpHeaders}): Observable<ApicallInterface> {
    return this.http.put<ApicallInterface>(url + 'modo-hmp', options);
  }

  moderateHmg(url:string, options: {headers: HttpHeaders}): Observable<ApicallInterface> {
    return this.http.put<ApicallInterface>(url + 'modo-hmg', options);
  }

}
