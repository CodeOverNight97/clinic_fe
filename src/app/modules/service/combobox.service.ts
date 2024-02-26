import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ComboboxViewModel } from '../models/common/combobox-view-model';

@Injectable({
  providedIn: 'root'
})
export class ComboboxService {

  constructor(private http: HttpClient,) { }

  getListDonVi(type: string = 'ALL') {
    return this.http.get<ComboboxViewModel[]>(`${environment.apiBaseUrl}api/combobox/get-list-don-vi?type=${type}`);
  }

  getListKhaiBaoQRCode() {
    return this.http.get<ComboboxViewModel[]>(`${environment.apiBaseUrl}api/combobox/get-list-khai-bao-qr-code`);
  }

  getListLoaiTaiSan() {
    return this.http.get<any[]>(`${environment.apiBaseUrl}api/combobox/get-list-loai-tai-san`);
  }

}
