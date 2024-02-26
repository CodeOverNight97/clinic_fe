import { Component, OnInit } from '@angular/core';
import { KetNhapDuLieuService } from './ket-nhap-du-lieu.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-ket-nhap-du-lieu',
  templateUrl: './ket-nhap-du-lieu.component.html',
  styleUrls: ['./ket-nhap-du-lieu.component.scss']
})
export class KetNhapDuLieuComponent implements OnInit {
  uploadedFiles: any[]
  pendingImport: boolean = false
  ID_DonVi: number = 1
  ListDonVi: any[]
  loadDstsImport: boolean
  constructor(private _ketNhapDuLieuService: KetNhapDuLieuService, private messageService: MessageService,) { }
  ngOnInit(): void {
    this.initData();
  }
  initData() {
    this.loadDanhSachDonViCoTheImport()
  }
  changeDonVi() {
    console.log(this.ID_DonVi)
    if (this.ID_DonVi) {
      this.loadDstsImport = true
    }
    else {
      this.loadDstsImport = false
    }
  }
  loadDanhSachDonViCoTheImport() {
    this._ketNhapDuLieuService.GetDmDonViByIDCha(1).subscribe(res => {
      this.ListDonVi = res
    },
      (er) => {
        console.log(er)
        this.ListDonVi = [];
        this.messageService.add({ key: "ketNhapDuLieu", severity: 'error', summary: 'Thông báo', detail: "Load đơn vị Import thất bại vui lòng thử lại sau." });
      })
  }
  onUpload(evnt: any, fileUpload: any) {
    this.pendingImport = true
    this.value = 0
    console.log(evnt.files[0])
    console.log(fileUpload)
    this.loadDstsImport = true
    fileUpload.clear();
    this.pendingFun(0);
    this._ketNhapDuLieuService.SaveFile(evnt.files[0], this.ID_DonVi).subscribe((data) => {
      this.messageService.add({ key: "ketNhapDuLieu", severity: data.flag ? 'success' : 'error', summary: 'Thông báo', detail: data.mess });
      this.loadDstsImport = false
      this.pendingImport = false
      this.pendingFun(100);
    }, (error) => {
      this.messageService.add({ key: "ketNhapDuLieu", severity: 'error', summary: 'Thông báo', detail: 'Có lỗi xảy ra trong quá trình đọc file dữ liệu.Vui lòng thử lại sau' });
      console.log("SaveFile lỗi", error);
      this.loadDstsImport = false
      this.pendingImport = false
      this.pendingFun(100);
    });

  }
  value: number = 0
  pendingFun(EndTime: number) {
    let interval = setInterval(() => {
      this.value = this.value + Math.floor(Math.random() * 10) + 1;
      if (this.value >= 100) {
        this.value = 99;
        clearInterval(interval);
      }
    }, 2000);
    if(EndTime == 100){
      this.value = 100
      clearInterval(interval)
      this.value = 0
    }
  }
}
