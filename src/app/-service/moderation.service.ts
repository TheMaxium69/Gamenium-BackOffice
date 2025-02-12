import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApicallInterface } from '../-interface/apicall.interface';

@Injectable({
  providedIn: 'root'
})
export class ModerationService {

  constructor(private http: HttpClient) { }

  moderateDeleteComment(body: string, url:string, options: {headers: HttpHeaders}): Observable<ApicallInterface> {
    return this.http.post<ApicallInterface>(url + '/modo-comment', body, options);
  }

  moderateDeleteCommentReply(body: string, url:string, options: {headers: HttpHeaders}): Observable<ApicallInterface> {
    return this.http.post<ApicallInterface>(url + '/modo-comment-reply', body, options);
  }

  moderateDeleteActu(body: string, url:string, options: {headers: HttpHeaders}): Observable<ApicallInterface> {
    return this.http.post<ApicallInterface>(url + '/modo-actu', body, options);
  }

  moderateDeletePP(body: string, url:string, options: {headers: HttpHeaders}): Observable<ApicallInterface> {
    return this.http.post<ApicallInterface>(url + '/modo-pp', body, options);
  }
  moderateHmp(body: string, url:string, options: {headers: HttpHeaders}): Observable<ApicallInterface> {
    return this.http.put<ApicallInterface>(url + '/modo-hmp', body, options);
  }

  moderateHmg(body: string, url:string, options: {headers: HttpHeaders}): Observable<ApicallInterface> {
    return this.http.put<ApicallInterface>(url + '/modo-hmg', body, options);
  }




  getProfilRandom(url:string, options: {headers: HttpHeaders}): Observable<ApicallInterface> {
    return this.http.get<ApicallInterface>(url + '/modo-profil-random', options);
  }

  getCommentRandom(url:string, options: {headers: HttpHeaders}): Observable<ApicallInterface> {
    return this.http.get<ApicallInterface>(url + '/modo-comment-random', options);
  }

  getCommentReplyRandom(url:string, options: {headers: HttpHeaders}): Observable<ApicallInterface> {
    return this.http.get<ApicallInterface>(url + '/modo-comment-reply-random', options);
  }

  getActuRandom(url:string, options: {headers: HttpHeaders}): Observable<ApicallInterface> {
    return this.http.get<ApicallInterface>(url + '/modo-actu-random', options);
  }

  getHmpRandom(url:string, options: {headers: HttpHeaders}): Observable<ApicallInterface> {
    return this.http.get<ApicallInterface>(url + '/modo-hmp-random', options);
  }

  getHmgRandom(url:string, options: {headers: HttpHeaders}): Observable<ApicallInterface> {
    return this.http.get<ApicallInterface>(url + '/modo-hmg-random', options);
  }





}
