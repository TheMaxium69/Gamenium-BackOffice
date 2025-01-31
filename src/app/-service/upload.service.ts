import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApicallInterface } from '../-interface/apicall.interface';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  constructor(private http: HttpClient) {}

  // ✅ Use the same method structure as `uploadUserPhoto()`
  uploadPostActuPhoto(photo: File, url: string, option: { headers: HttpHeaders }): Observable<ApicallInterface> {
    const formData = new FormData();
    formData.append('photo', photo); // 🟢 Ensure the key matches Symfony's `$request->files->get('photo')`

    return this.http.post<ApicallInterface>(url + '/postactus/upload', formData, option);
  }
}
