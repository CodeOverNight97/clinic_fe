import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BaoCaoKetNhapKiemKeViewModel } from '../models/bao-cao/bao-cao-ket-nhap-kiem-ke-view-model';
import { BaoCaoKetNhapKiemKeFilterModel } from '../models/bao-cao/bao-cao-ket-nhap-kiem-ke-filter-model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BaoCaoThongKeService {

  constructor(private http: HttpClient,) { }

  getListBaoCaoKetNhapKiemKe(ojb: BaoCaoKetNhapKiemKeFilterModel) {
    return this.http.post<BaoCaoKetNhapKiemKeViewModel[]>(`${environment.apiBaseUrl}api/baocao/get-list-bao-cao-ket-nhap-kiem-ke`, ojb);
  }

  getListBaoCaoKetNhapKiemKe_DonVi(id_qlts_ket_nhap: number) {
    id_qlts_ket_nhap = id_qlts_ket_nhap ? id_qlts_ket_nhap : 0
    return this.http.get<BaoCaoKetNhapKiemKeViewModel[]>(`${environment.apiBaseUrl}api/baocao/get-list-bao-cao-ket-nhap-kiem-ke-don-vi?id_qlts_ket_nhap=${id_qlts_ket_nhap}`);
  }
  exportBaoCaoKetNhapKiemKe_DonVi(id_qlts_ket_nhap: number): Observable<any> {
    id_qlts_ket_nhap = id_qlts_ket_nhap ? id_qlts_ket_nhap : 0
    return this.http.get(`${environment.apiBaseUrl}api/baocao/export-bao-cao-ket-nhap-kiem-ke-don-vi?id_qlts_ket_nhap=${id_qlts_ket_nhap}`, { observe: 'response', responseType: 'blob' });
  }


  getListBaoCaoKetNhapKiemKe_LoaiTaiSan(id_qlts_ket_nhap: number) {
    id_qlts_ket_nhap = id_qlts_ket_nhap ? id_qlts_ket_nhap : 0
    return this.http.get<BaoCaoKetNhapKiemKeViewModel[]>(`${environment.apiBaseUrl}api/baocao/get-list-bao-cao-ket-nhap-kiem-ke-tai-san?id_qlts_ket_nhap=${id_qlts_ket_nhap}`);
  }
  exportBaoCaoKetNhapKiemKe_LoaiTaiSan(id_qlts_ket_nhap: number): Observable<any> {
    id_qlts_ket_nhap = id_qlts_ket_nhap ? id_qlts_ket_nhap : 0
    return this.http.get(`${environment.apiBaseUrl}api/baocao/export-bao-cao-ket-nhap-kiem-ke-tai-san?id_qlts_ket_nhap=${id_qlts_ket_nhap}`, { observe: 'response', responseType: 'blob' });
  }
}
