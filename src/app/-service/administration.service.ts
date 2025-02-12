import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {ApicallInterface} from "../-interface/apicall.interface";

@Injectable({
  providedIn: 'root'
})
export class AdministrationService {

  constructor(private http: HttpClient) { }

  searchUsersAdmin(searchValue: string, limit:number, url:string, options: {headers: HttpHeaders}): Observable<ApicallInterface>{
    return this.http.post<ApicallInterface>(url + '/admin-users-search',  { searchValue, limit}, options);
  }

  searchProfilsAdmin(searchValue: string, limit:number, url:string, options: {headers: HttpHeaders}): Observable<ApicallInterface>{
    return this.http.post<ApicallInterface>(url + '/admin-profils-search',  { searchValue, limit}, options);
  }

  searchProfilViewAdmin(searchValue: string, limit:number, url:string, options: {headers: HttpHeaders}): Observable<ApicallInterface>{
    return this.http.post<ApicallInterface>(url + '/admin-profilview-search',  { searchValue, limit}, options);
  }

  searchProviderAdmin(searchValue: string, limit:number, url:string, options: {headers: HttpHeaders}): Observable<ApicallInterface>{
    return this.http.post<ApicallInterface>(url + '/admin-provider-search',  { searchValue, limit}, options);
  }

  searchGamesAdmin(searchValue: string, limit:number, url:string, options: {headers: HttpHeaders}): Observable<ApicallInterface>{
    return this.http.post<ApicallInterface>(url + '/admin-games-search',  { searchValue, limit}, options);
  }

  searchPostActusAdmin(searchValue: string, limit:number, url:string, options: {headers: HttpHeaders}): Observable<ApicallInterface>{
    return this.http.post<ApicallInterface>(url + '/admin-postactus-search',  { searchValue, limit}, options);
  }

  searchComment(searchValue: string, limit:number, url:string, options: {headers: HttpHeaders}): Observable<ApicallInterface>{
    return this.http.post<ApicallInterface>(url + '/admin-comment-search',  { searchValue, limit}, options);
  }

  searchCommentReply(searchValue: string, limit:number, url:string, options: {headers: HttpHeaders}): Observable<ApicallInterface>{
    return this.http.post<ApicallInterface>(url + '/admin-comment-reply-search',  { searchValue, limit}, options);
  }

  searchHmg(searchValue: string, limit:number, url:string, options: {headers: HttpHeaders}): Observable<ApicallInterface>{
    return this.http.post<ApicallInterface>(url + '/admin-hmg-search',  { searchValue, limit}, options);
  }

  searchHmp(searchValue: string, limit:number, url:string, options: {headers: HttpHeaders}): Observable<ApicallInterface>{
    return this.http.post<ApicallInterface>(url + '/admin-hmp-search',  { searchValue, limit}, options);
  }

  toggleBanAdmin(id_user:number, url:string, options: {headers: HttpHeaders}): Observable<ApicallInterface>{
    return this.http.get<ApicallInterface>(url + '/admin-ban/' + id_user, options);
  }

  addRoleAdmin(id_user:number, new_role:string, url:string, options: {headers: HttpHeaders}): Observable<ApicallInterface>{
    return this.http.post<ApicallInterface>(url + '/admin-add-role', {id_user, new_role}, options);
  }

  removeRoleAdmin(id_user:number, remove_role:string, url:string, options: {headers: HttpHeaders}): Observable<ApicallInterface>{
    return this.http.post<ApicallInterface>(url + '/admin-remove-role', {id_user, remove_role}, options);
  }

  getRoleOne(ROLE_NAME: string, limit: number, url: string, options: { headers: HttpHeaders }): Observable<ApicallInterface>{
    return this.http.post<ApicallInterface>(url + '/admin-role-one', {ROLE_NAME, limit}, options);
  }

  getPostActu(url: string, id: number, option: { headers: HttpHeaders}): Observable<ApicallInterface> {
    return this.http.get<ApicallInterface>(url + "/admin-postactu/" + id, option);
  }
}
