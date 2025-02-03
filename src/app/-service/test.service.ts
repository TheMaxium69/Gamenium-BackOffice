import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {ApicallInterface} from "../-interface/apicall.interface";
import {TestInterface} from "../-interface/test.interface";

@Injectable({
  providedIn: 'root'
})
export class TestService {

  constructor(private http: HttpClient) { }

  getTestAll(limit: number, url:string, option: { headers: HttpHeaders}):Observable<TestInterface[]> {
    return this.http.post<TestInterface[]>(url + '/test/getAll', { limit }, option)
  }

  getTestByGame(id: number, url:string, option: { headers: HttpHeaders}):Observable<ApicallInterface> {
    return this.http.get<ApicallInterface>(url + '/test/getbygame/' + id, option)
  }

  createTest(body: any, url:string, option: { headers: HttpHeaders}):Observable<ApicallInterface> {
    return this.http.post<ApicallInterface>(url + '/test/create', body, option)
  }

}
