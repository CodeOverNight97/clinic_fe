import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaoCaoChiTietTaiSanFilterModel } from 'src/app/modules/models/bao-cao/baocao-chitiet-taisan-filter-model';
import { BaoCaoChiTietTaiSanViewModel } from 'src/app/modules/models/bao-cao/baocao-chitiet-taisan-view-model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BaoCaoChiTietTaiSanService {

  constructor(
    private http: HttpClient
  ) { }

  GetListBaoCaoChiTietTaiSan(obj: BaoCaoChiTietTaiSanFilterModel) {
    return this.http.post<BaoCaoChiTietTaiSanViewModel[]>(`${environment.apiBaseUrl}api/baocao/get_list_bao_cao_chi_tiet_tai_san`, obj);
  }

  ExportBaoCaoChiTietTaiSan(obj: BaoCaoChiTietTaiSanFilterModel): Observable<any> {
    return this.http.post(`${environment.apiBaseUrl}api/baocao/export_bao_cao_chi_tiet_tai_san`, obj, { observe: 'response', responseType: 'blob' });
  }
}
