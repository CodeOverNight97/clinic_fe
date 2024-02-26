import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class KetNhapDuLieuKiemKeService {

  constructor(private http: HttpClient) { }
  SaveFile(filesToUpload: File, ID_DonVi): Observable<any> {
    const formData: FormData = new FormData();

    formData.append('file', filesToUpload);
    let headers = new HttpHeaders();
    return this.http.post<any>(`${environment.apiBaseUrl}api/quantri/KetNhapDuLieuKiemKe?ID_DonVi=${ID_DonVi}`, formData, { headers: headers });
  }
  GetDmDonViByIDCha(ID_DonViCha) {
    return this.http.get<any>(`${environment.apiBaseUrl}api/quantri/GetDmDonViByIDCha?ID_DonVi_Cha=${ID_DonViCha}`);
  }
}