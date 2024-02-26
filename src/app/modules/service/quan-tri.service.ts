import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ResultQueryViewModel } from '../models/common/result-query-view-model';
import { TaiKhoanViewModel } from '../models/quan-tri/tai-khoan-view-model';

@Injectable({
  providedIn: 'root'
})
export class QuanTriService {

  constructor(private http: HttpClient,) { }

  //#region Quản lý Tài Khoản 
  getListTaiKhoan(ten_day_du: string, loai_tai_khoan: string, id_don_vi: number) {
    let ojb = {
      ten_day_du: ten_day_du,
      loai_tai_khoan: loai_tai_khoan,
      id_don_vi: id_don_vi
    }
    return this.http.post<TaiKhoanViewModel[]>(`${environment.apiBaseUrl}api/quantri/get-list-tai-khoan`, ojb);
  }

  getListTaiKhoanExcel(ten_day_du: string, loai_tai_khoan: string, id_don_vi: number): Observable<any> {
    let ojb = {
      ten_day_du: ten_day_du,
      loai_tai_khoan: loai_tai_khoan,
      id_don_vi: id_don_vi
    }
    return this.http.post(`${environment.apiBaseUrl}api/quantri/get-list-tai-khoan-export-excel`, ojb, { observe: 'response', responseType: 'blob' });
  }

  themTaiKhoan(taikhoan: any) {
    return this.http.post<ResultQueryViewModel>(`${environment.apiBaseUrl}api/quantri/them-tai-khoan`, taikhoan);
  }

  capNhatTaiKhoan(taikhoan: any) {
    return this.http.post<ResultQueryViewModel>(`${environment.apiBaseUrl}api/quantri/cap-nhat-tai-khoan`, taikhoan);
  }

  khoaMoKhoaTaiKhoan(ten_dang_nhap: string, is_lock: boolean) {
    return this.http.get<ResultQueryViewModel>(`${environment.apiBaseUrl}api/quantri/khoa-mo-tai-khoan?ten_dang_nhap=${ten_dang_nhap}&is_lock=${is_lock}`);
  }

  //#endregion

}
