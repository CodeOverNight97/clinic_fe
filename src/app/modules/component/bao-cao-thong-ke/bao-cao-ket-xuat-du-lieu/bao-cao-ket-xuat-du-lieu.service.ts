import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ComboboxViewModel } from 'src/app/modules/models/common/combobox-view-model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BaoCaoKetXuatDuLieuService {

  constructor(private http: HttpClient) { }

  GetListLanKiemKeKetXuat(tu_ngay: string, den_ngay: string, id_don_vi_goc: number) {
    return this.http.post<ComboboxViewModel[]>(`${environment.apiBaseUrl}api/baocao/get_list_lan_kiem_ke_ket_xuat`, { tu_ngay, den_ngay, id_don_vi_goc });
  }

  LoadDataKetXuat(id_kiem_ke_ket_xuat: number) {
    return this.http.get<any[]>(`${environment.apiBaseUrl}api/baocao/get_list_kiemke_ket_xuat_by_id_kiemke?id_kiem_ke_ket_xuat=${id_kiem_ke_ket_xuat}`);
  }
  LoadDataKetXuatDonVi(id_kiem_ke_ket_xuat: number) {
    return this.http.get<any[]>(`${environment.apiBaseUrl}api/baocao/get_list_kiemke_ket_xuat_don_vi_by_id_kiemke?id_kiem_ke_ket_xuat=${id_kiem_ke_ket_xuat}`);
  }
  LoadDataKetXuatLoaiTaiSan(id_kiem_ke_ket_xuat: number) {
    return this.http.get<any[]>(`${environment.apiBaseUrl}api/baocao/get_list_kiemke_ket_xuat_loai_tai_san_by_id_kiemke?id_kiem_ke_ket_xuat=${id_kiem_ke_ket_xuat}`);
  }
  LoadDataKetXuatQrCode(id_kiem_ke_ket_xuat: number) {
    return this.http.get<any[]>(`${environment.apiBaseUrl}api/baocao/get_list_kiemke_ket_xuat_qrcode_by_id_kiemke?id_kiem_ke_ket_xuat=${id_kiem_ke_ket_xuat}`);
  }
  LoadDataKetXuatTaiKhoan(id_kiem_ke_ket_xuat: number) {
    return this.http.get<any[]>(`${environment.apiBaseUrl}api/baocao/get_list_kiemke_ket_xuat_tai_khoan_by_id_kiemke?id_kiem_ke_ket_xuat=${id_kiem_ke_ket_xuat}`);
  }
  LoadDataKetXuatTaiSan(id_kiem_ke_ket_xuat: number) {
    return this.http.get<any[]>(`${environment.apiBaseUrl}api/baocao/get_list_kiemke_ket_xuat_tai_san_by_id_kiemke?id_kiem_ke_ket_xuat=${id_kiem_ke_ket_xuat}`);
  }
  LoadDataKetXuatTaiSanKiemKe(id_kiem_ke_ket_xuat: number) {
    return this.http.get<any[]>(`${environment.apiBaseUrl}api/baocao/get_list_kiemke_ket_xuat_tai_san_kiem_ke_by_id_kiemke?id_kiem_ke_ket_xuat=${id_kiem_ke_ket_xuat}`);
  }

  downloadFile(url: string): Observable<any> {
    return this.http.post(`${environment.apiBaseUrl}api/baocao/downloadfile?url=${url}`, {}, { observe: 'response', responseType: 'blob' });
  }

}
