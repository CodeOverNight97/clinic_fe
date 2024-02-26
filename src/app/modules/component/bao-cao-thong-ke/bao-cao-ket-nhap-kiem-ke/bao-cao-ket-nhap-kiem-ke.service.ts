import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ComboboxViewModel } from 'src/app/modules/models/common/combobox-view-model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BaoCaoKetNhapKiemKeService {

  constructor(private http: HttpClient) { }

  GetListLanKiemKeKetNhap(tu_ngay: string, den_ngay: string, id_don_vi_goc: number) {
    return this.http.post<ComboboxViewModel[]>(`${environment.apiBaseUrl}api/baocao/get_list_bao_cao_lan_kiem_ke_ket_nhap`, { tu_ngay, den_ngay, id_don_vi_goc });
  }

  GetListBaoCaoKiemKeKetNhapByIdKiemKe(id_kiemke_ket_nhap: number) {
    return this.http.get<any[]>(`${environment.apiBaseUrl}api/baocao/get_list_bao_cao_kiem_ke_ket_nhap_by_id_kiemke?id_kiemke_ket_nhap=${id_kiemke_ket_nhap}`);
  }

  GetListBaoCaoKiemKeKetNhapQrCodeByIdKiemKe(id_kiemke_ket_nhap: number) {
    return this.http.get<any[]>(`${environment.apiBaseUrl}api/baocao/get_list_bao_cao_kiem_ke_ket_nhap_qrcode_by_id_kiemke?id_kiemke_ket_nhap=${id_kiemke_ket_nhap}`);
  }

  GetListBaoCaoKiemKeKetNhapTaiSanByIdKiemKe(id_kiemke_ket_nhap: number) {
    return this.http.get<any[]>(`${environment.apiBaseUrl}api/baocao/get_list_bao_cao_kiem_ke_ket_nhap_tai_san_by_id_kiemke?id_kiemke_ket_nhap=${id_kiemke_ket_nhap}`);
  }

  GetListBaoCaoKiemKeKetNhapTaiSanKiemKeByIdKiemKe(id_kiemke_ket_nhap: number) {
    return this.http.get<any[]>(`${environment.apiBaseUrl}api/baocao/get_list_bao_cao_kiem_ke_ket_nhap_tai_san_kiem_ke_by_id_kiemke?id_kiemke_ket_nhap=${id_kiemke_ket_nhap}`);
  }
}
