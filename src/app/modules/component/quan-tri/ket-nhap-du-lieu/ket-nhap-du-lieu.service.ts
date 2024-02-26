import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class KetNhapDuLieuService {

  constructor(private http: HttpClient) { }
  SaveFile(filesToUpload: File, ID_DonVi): Observable<any> {
    const formData: FormData = new FormData();

    formData.append('file', filesToUpload);
    let headers = new HttpHeaders();
    return this.http.post<any>(`${environment.apiBaseUrl}api/quantri/ImportQuamLyTaiSan?ID_DonVi=${ID_DonVi}`, formData, { headers: headers });
  }
  GetDmDonViByIDCha(ID_DonViCha) {
    return this.http.get<any>(`${environment.apiBaseUrl}api/quantri/GetDmDonViByIDCha?ID_DonVi_Cha=${ID_DonViCha}`);
  }
  //#endregion
  downloadFile() {
    const filePath = `${environment.apiBaseUrl}api/quantri/KetXuatDuLieuKiemKe`; // Đường dẫn API để tải file

    // Tạo header tùy chỉnh nếu cần
    const headers = new HttpHeaders();

    // Gửi yêu cầu HTTP GET để tải file
    this.http.get(filePath, { responseType: 'blob', headers }).subscribe(response => {
      this.saveFile(response);
    });
  }

  private saveFile(data: any) {
    const blob = new Blob([data], { type: 'application/octet-stream' });

    // Tạo một đường dẫn URL tạm thời để tải file
    const url = window.URL.createObjectURL(blob);

    // Tạo một thẻ a ẩn để tải file
    const link = document.createElement('a');
    link.href = url;
    link.download = 'file.txt'; // Tên tệp bạn muốn lưu
    link.click();

    // Giải phóng đường dẫn URL tạm thời
    window.URL.revokeObjectURL(url);
  }
}