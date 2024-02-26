import { formatDate } from '@angular/common';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private messageService: MessageService) { }

  showSuccess(detail: string = 'Tác vụ thực hiện thành công!') {
    this.messageService.add({ severity: 'success', summary: 'Thông báo', detail: detail });
  }

  showError(detail: string = 'Đã xảy ra lỗi. Vui lòng thử lại sau!') {
    this.messageService.add({ severity: 'error', summary: 'Thông báo', detail: detail });
  }

  showInfo(detail: string) {
    this.messageService.add({ severity: 'info', summary: 'Thông báo', detail: detail });
  }

  showWarn(detail: string = 'Tác vụ thực hiện thất bại!') {
    this.messageService.add({ severity: 'warn', summary: 'Thông báo', detail: detail });
  }

  downloadFile(fileName_: string, data: any, duoi: string = '.xls'): void {
    var fileName = fileName_ + formatDate(new Date, "yyyyMMddHHmmss", "En-en") + duoi;
    
    try {
      let downloadLink = document.createElement('a');
      downloadLink.href = window.URL.createObjectURL(data.body);
      downloadLink.setAttribute('download', fileName);
      document.body.appendChild(downloadLink);
      downloadLink.click();
      downloadLink.remove();
    } catch (ex) {
      this.showError('Đã xảy ra lỗi không thể tải file!')
      console.log(ex);
    }
  }
}
