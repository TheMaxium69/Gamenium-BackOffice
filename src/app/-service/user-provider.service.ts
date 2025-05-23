import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {ApicallInterface} from "../-interface/apicall.interface";

@Injectable({
  providedIn: 'root'
})
export class UserProviderService {

  constructor(private http: HttpClient) {}

  getProviderByUser(url:string, options: {headers: HttpHeaders}): Observable<ApicallInterface> {
    return this.http.get<ApicallInterface>(url + '/getProvider/', options);
  }

  updateProvider(id: number, body: any, url: string, option: { headers: HttpHeaders }): Observable<ApicallInterface> {
    return this.http.put<ApicallInterface>( url + '/provider/' + id, body, option);
  }

  searchPostActuByProvider(searchValue: string, limit:number, url:string, options: {headers: HttpHeaders}): Observable<ApicallInterface>{
    return this.http.post<ApicallInterface>(url + '/provider/search-postactus', { searchValue, limit}, options);
  }

  createPostActuByProvider(body: any, url: string, options: { headers: HttpHeaders }): Observable<ApicallInterface> {
    return this.http.post<ApicallInterface>(url + '/provider/createPostActu', body, options);
  }

  updatePostActuByProvider(id: number, body: any, url: string, option: { headers: HttpHeaders }): Observable<ApicallInterface> {
    return this.http.put<ApicallInterface>(`${url}/provider/edit-article/${id}`, body, option);
  }

  deletePostActuByProvider(id: number, url: string, option: { headers: HttpHeaders }): Observable<ApicallInterface> {
    return this.http.put<ApicallInterface>(`${url}/provider/deletePostActu/${id}`, {}, option);
  }

  linkUserToProvider(user_id: number, provider_id: number, url: string, options: { headers: HttpHeaders }): Observable<ApicallInterface> {
    return this.http.post<ApicallInterface>(url + '/user-provider/link', { user_id, provider_id }, options);
  }

  // Récupère toutes les relations User-Provider
  getUserProviders(url: string, options: { headers: HttpHeaders }): Observable<ApicallInterface> {
    return this.http.get<ApicallInterface>(url + '/admin/user-providers', options);
  }

  // Supprime une relation User-Provider spécifique
  deleteUserProvider(userId: number, providerId: number, url: string, options: { headers: HttpHeaders }): Observable<ApicallInterface> {
    return this.http.delete<ApicallInterface>(`${url}/admin/user-provider/${userId}/${providerId}`, options);
  }
  

}
