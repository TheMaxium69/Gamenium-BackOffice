import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ApicallInterface} from "../-interface/apicall.interface";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BadgeService {


  constructor(private http: HttpClient) { }

  getBadgeAll(url:string, options:{headers: HttpHeaders}): Observable<ApicallInterface> {
    return this.http.get<ApicallInterface>(url + '/badges', options);
  }

  getUserWithBadge(id:number, url:string, options:{headers: HttpHeaders}): Observable<ApicallInterface> {
    return this.http.get<ApicallInterface>(url + '/user-with-badge/' + id, options);
  }

  toggleBadge(id_badge: number, id_user:number, url: string, options: { headers: HttpHeaders }): Observable<ApicallInterface> {
    return this.http.post<ApicallInterface>(url + '/togglebadge', { id_badge, id_user }, options);
  }

  createBadge(name: string, picture_id: number, unlockDescription: string, url: string, options: { headers: HttpHeaders }): Observable<ApicallInterface> {
    return this.http.post<ApicallInterface>(url + '/create-badge', { name, picture_id, unlockDescription }, options);
  }

  removeBadge(id_badge: number, url: string, options: { headers: HttpHeaders }):Observable<ApicallInterface> {
    return this.http.delete<ApicallInterface>(url + '/remove-badge/' + id_badge, options);
  }

}
