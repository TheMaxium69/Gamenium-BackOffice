import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApicallInterface } from '../-interface/apicall.interface';
import { ProviderInterface } from '../-interface/provider.interface';

@Injectable({
  providedIn: 'root'
})
export class ProviderService {

  constructor(private http : HttpClient) { }

  searchProviders(searchValue: string, limit: number, url: string, options: { headers: HttpHeaders }): Observable<any> {
    return this.http.post<any>(url + '/providers/search', { searchValue, limit }, options);
  }

  getProviderById(id: number, url:string, option: {headers: HttpHeaders}): Observable<ApicallInterface> {
    return this.http.get<ApicallInterface>(url + '/provider/' + id, option);
  }
  
}
