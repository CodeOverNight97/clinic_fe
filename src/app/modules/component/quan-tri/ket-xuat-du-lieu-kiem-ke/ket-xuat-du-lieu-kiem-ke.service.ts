import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class KetXuatDuLieuKiemKeService {

  constructor(private http: HttpClient) { }
  //#endregion
  downloadFile(ID_DonVi: number) {
    const filePath = `${environment.apiBaseUrl}api/quantri/KetXuatDuLieuKiemKe?ID_DonVi=${ID_DonVi}`; // Đường dẫn API để tải file

    // Tạo header tùy chỉnh nếu cần
    const headers = new HttpHeaders();

    // Gửi yêu cầu HTTP GET để tải file
    return this.http.get(filePath, { responseType: 'blob', headers })
  }

  public saveFile(data: any, name: string) {
    const blob = new Blob([data], { type: 'application/octet-stream' });

    // Tạo một đường dẫn URL tạm thời để tải file
    const url = window.URL.createObjectURL(blob);
    // Tạo một thẻ a ẩn để tải file
    const link = document.createElement('a');
    link.href = url;
    console.log(this.formatDateTime())
    link.download = `QLTS ${name.normalize("NFD").replace(/[\u0300-\u036f]/g, "")} ${this.formatDateTime()}.json`; // Tên tệp bạn muốn lưu
    link.click();

    // Giải phóng đường dẫn URL tạm thời
    window.URL.revokeObjectURL(url);
  }
  formatDateTime() {
    const currentDate = new Date();

    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    const hours = String(currentDate.getHours()).padStart(2, '0');
    const minutes = String(currentDate.getMinutes()).padStart(2, '0');
    const seconds = String(currentDate.getSeconds()).padStart(2, '0');
    
    return `${year}-${month}-${day} ${hours}h${minutes}m${seconds}s`;
  }
}