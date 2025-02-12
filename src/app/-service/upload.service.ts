import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApicallInterface } from '../-interface/apicall.interface';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  constructor(private http: HttpClient) {}

  uploadProviderPhoto(formData: FormData, url: string, option: { headers: HttpHeaders }): Observable<ApicallInterface> {
    return this.http.post<ApicallInterface>(`${url}/upload/provider`, formData, {
      headers: option.headers,
    });
  }
}
