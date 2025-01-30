import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PostActuInterface } from '../-interface/postActu.interface';
import { Observable } from 'rxjs';
import { ApicallInterface } from '../-interface/apicall.interface';

@Injectable({
  providedIn: 'root'
})
export class ActualityService {

  constructor(private http: HttpClient) { }

  createPostActu(body: any, url:string, option: { headers: HttpHeaders}):Observable<ApicallInterface> {
    return this.http.post<ApicallInterface>(url + '/postactus/', body, option)

  }
}
