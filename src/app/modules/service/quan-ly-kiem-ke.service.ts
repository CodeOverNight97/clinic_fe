import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ResultQueryViewModel } from '../models/common/result-query-view-model';
import { FileExcelUploadViewModel } from '../models/quan-ly-kiem-ke/file-excel-upload-view-model';
import { CapPhatQRCodeViewModel } from '../models/quan-ly-kiem-ke/cap-phat-qr-code-view-model';
import { QRCodeFilterViewModel } from '../models/quan-ly-kiem-ke/qr-code-filter-view-model';
import { QRCodeViewModel } from '../models/quan-ly-kiem-ke/qr-code-view-model';
import { TaiSanFilterViewModel } from '../models/quan-ly-kiem-ke/tai-san-filter-view-model';
import { TaiSanViewModel } from '../models/quan-ly-kiem-ke/tai-san-view-model';
import { TaiSanKiemKeViewModel } from '../models/quan-ly-kiem-ke/tai-san-kiem-ke-view-model';

@Injectable({
  providedIn: 'root'
})
export class QuanLyKiemKeService {

  constructor(private http: HttpClient,) { }

  //#region  Danh sách tài sản
  getListTaiSan(filter: TaiSanFilterViewModel) {
    filter.isExcel = false;
    filter.trang_thai = filter.trang_thai ? filter.trang_thai : '';
    filter.ma_tai_san = filter.ma_tai_san ? filter.ma_tai_san : '';
    filter.ten_tai_san = filter.ten_tai_san ? filter.ten_tai_san : '';
    filter.ma_loai_tai_san = filter.ma_loai_tai_san ? filter.ma_loai_tai_san : '';
    filter.nam_su_dung = filter.nam_su_dung ? filter.nam_su_dung : '';
    filter.thong_so_ky_thuat = filter.thong_so_ky_thuat ? filter.thong_so_ky_thuat : '';
    filter.id_don_vi = filter.id_don_vi ? filter.id_don_vi : 0;
    filter.ten_don_vi_quan_ly = filter.ten_don_vi_quan_ly ? filter.ten_don_vi_quan_ly : '';
    filter.tong_tien_tu = filter.tong_tien_tu ? filter.tong_tien_tu : 0;
    filter.tong_tien_den = filter.tong_tien_den ? filter.tong_tien_den : 0;
    filter.ngan_sach_tu = filter.ngan_sach_tu ? filter.ngan_sach_tu : 0;
    filter.ngan_sach_den = filter.ngan_sach_den ? filter.ngan_sach_den : 0;
    filter.nguon_khac_tu = filter.nguon_khac_tu ? filter.nguon_khac_tu : 0;
    filter.nguon_khac_den = filter.nguon_khac_den ? filter.nguon_khac_den : 0;
    filter.gia_tri_con_lai_tu = filter.gia_tri_con_lai_tu ? filter.gia_tri_con_lai_tu : 0;
    filter.gia_tri_con_lai_den = filter.gia_tri_con_lai_den ? filter.gia_tri_con_lai_den : 0;
    filter.ghi_chu = filter.ghi_chu ? filter.ghi_chu : '';
    filter.qr_code = filter.qr_code ? filter.qr_code : '';
    filter.ngay_cap_qr_tu = filter.ngay_cap_qr_tu ? filter.ngay_cap_qr_tu : '1900-01-01T00:00:00';
    filter.ngay_cap_qr_den = filter.ngay_cap_qr_den ? filter.ngay_cap_qr_den : '1900-01-01T00:00:00';
    filter.nguoi_cap_qr = filter.nguoi_cap_qr ? filter.nguoi_cap_qr : '';
    filter.ngay_kiem_ke_tu = filter.ngay_kiem_ke_tu ? filter.ngay_kiem_ke_tu : '1900-01-01T00:00:00';
    filter.ngay_kiem_ke_den = filter.ngay_kiem_ke_den ? filter.ngay_kiem_ke_den : '1900-01-01T00:00:00';
    filter.nguoi_kiem_ke = filter.nguoi_kiem_ke ? filter.nguoi_kiem_ke : '';
    filter.noi_dung_kiem_ke = filter.noi_dung_kiem_ke ? filter.noi_dung_kiem_ke : '';
    filter.take = filter.take ? filter.take : 50;
    filter.skip = filter.skip ? filter.skip : 0;
    return this.http.post<TaiSanViewModel[]>(`${environment.apiBaseUrl}api/quanlykiemke/get-list-tai-san`, filter);
  }
  getListTaiSanExcel(filter: TaiSanFilterViewModel): Observable<any> {
    filter.isExcel = true;
    filter.trang_thai = filter.trang_thai ? filter.trang_thai : '';
    filter.ma_tai_san = filter.ma_tai_san ? filter.ma_tai_san : '';
    filter.ten_tai_san = filter.ten_tai_san ? filter.ten_tai_san : '';
    filter.ma_loai_tai_san = filter.ma_loai_tai_san ? filter.ma_loai_tai_san : '';
    filter.nam_su_dung = filter.nam_su_dung ? filter.nam_su_dung : '';
    filter.thong_so_ky_thuat = filter.thong_so_ky_thuat ? filter.thong_so_ky_thuat : '';
    filter.id_don_vi = filter.id_don_vi ? filter.id_don_vi : 0;
    filter.ten_don_vi_quan_ly = filter.ten_don_vi_quan_ly ? filter.ten_don_vi_quan_ly : '';
    filter.tong_tien_tu = filter.tong_tien_tu ? filter.tong_tien_tu : 0;
    filter.tong_tien_den = filter.tong_tien_den ? filter.tong_tien_den : 0;
    filter.ngan_sach_tu = filter.ngan_sach_tu ? filter.ngan_sach_tu : 0;
    filter.ngan_sach_den = filter.ngan_sach_den ? filter.ngan_sach_den : 0;
    filter.nguon_khac_tu = filter.nguon_khac_tu ? filter.nguon_khac_tu : 0;
    filter.nguon_khac_den = filter.nguon_khac_den ? filter.nguon_khac_den : 0;
    filter.gia_tri_con_lai_tu = filter.gia_tri_con_lai_tu ? filter.gia_tri_con_lai_tu : 0;
    filter.gia_tri_con_lai_den = filter.gia_tri_con_lai_den ? filter.gia_tri_con_lai_den : 0;
    filter.ghi_chu = filter.ghi_chu ? filter.ghi_chu : '';
    filter.qr_code = filter.qr_code ? filter.qr_code : '';
    filter.ngay_cap_qr_tu = filter.ngay_cap_qr_tu ? filter.ngay_cap_qr_tu : '1900-01-01T00:00:00';
    filter.ngay_cap_qr_den = filter.ngay_cap_qr_den ? filter.ngay_cap_qr_den : '1900-01-01T00:00:00';
    filter.nguoi_cap_qr = filter.nguoi_cap_qr ? filter.nguoi_cap_qr : '';
    filter.ngay_kiem_ke_tu = filter.ngay_kiem_ke_tu ? filter.ngay_kiem_ke_tu : '1900-01-01T00:00:00';
    filter.ngay_kiem_ke_den = filter.ngay_kiem_ke_den ? filter.ngay_kiem_ke_den : '1900-01-01T00:00:00';
    filter.nguoi_kiem_ke = filter.nguoi_kiem_ke ? filter.nguoi_kiem_ke : '';
    filter.noi_dung_kiem_ke = filter.noi_dung_kiem_ke ? filter.noi_dung_kiem_ke : '';
    filter.take = filter.take ? filter.take : 50;
    filter.skip = filter.skip ? filter.skip : 0;
    return this.http.post(`${environment.apiBaseUrl}api/quanlykiemke/get-list-tai-san-export-excel`, filter, { observe: 'response', responseType: 'blob' });
  }

  getListTaiSanKiemKe(ma_tai_san: string) {
    return this.http.get<TaiSanKiemKeViewModel[]>(`${environment.apiBaseUrl}api/quanlykiemke/get-list-tai-san-kiem-ke?ma_tai_san=${ma_tai_san}`);
  }

  //#endregion


  //#region Quản lý QRCode

  getListQRCode(filter: QRCodeFilterViewModel) {
    return this.http.post<QRCodeViewModel[]>(`${environment.apiBaseUrl}api/quanlykiemke/get-list-qr-code`, filter);
  }

  getListQRCodeExcel(filter: QRCodeFilterViewModel): Observable<any> {
    return this.http.post(`${environment.apiBaseUrl}api/quanlykiemke/get-list-qr-code`, filter, { observe: 'response', responseType: 'blob' });
  }

  saveFileQRCode(filesToUpload: any[]): Observable<ResultQueryViewModel> {
    const formData: FormData = new FormData();
    for (let file of filesToUpload) {
      formData.append('file', file);
    }
    let headers = new HttpHeaders();
    return this.http.post<ResultQueryViewModel>(`${environment.apiBaseUrl}api/quanlykiemke/save-file-excel-qr-code`, formData, { headers: headers });
  }

  GetTemplateQRCode(): Observable<any> {
    return this.http.get(`${environment.apiBaseUrl}api/quanlykiemke/get-template-file-excel-qr-code`, { observe: 'response', responseType: 'blob' });
  }

  importExcelQRCode(obj: FileExcelUploadViewModel): Observable<any> {
    return this.http.post(`${environment.apiBaseUrl}api/quanlykiemke/import-excel-qr-code`, obj, { observe: 'response', responseType: 'blob' });
  }

  getSoLuongQRCodeChuaCap() {
    return this.http.get<ResultQueryViewModel>(`${environment.apiBaseUrl}api/quanlykiemke/get-so-luong-qr-chua-cap`);
  }

  getSoLuongQRCodeChuaCapTuDem(tu: number, den: number) {
    return this.http.get<ResultQueryViewModel>(`${environment.apiBaseUrl}api/quanlykiemke/get-so-luong-qr-chua-cap-tu-den?tu=${tu}&den=${den}`);
  }

  capPhatQRCode(ojb: any) {
    return this.http.post<ResultQueryViewModel>(`${environment.apiBaseUrl}api/quanlykiemke/cap-phat-qr-code`, ojb);
  }
  //#endregion

}
