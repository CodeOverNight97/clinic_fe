import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { KetNhapDuLieuKiemKeService } from './ket-nhap-du-lieu-kiem-ke..service';
import { KetNhapDuLieuService } from '../ket-nhap-du-lieu/ket-nhap-du-lieu.service';

@Component({
  selector: 'app-ket-nhap-du-lieu-kiem-ke',
  templateUrl: './ket-nhap-du-lieu-kiem-ke.component.html',
  styleUrls: ['./ket-nhap-du-lieu-kiem-ke.component.scss']
})
export class KetNhapDuLieuKiemKeComponent implements OnInit {
  uploadedFiles: any[]
  ID_DonVi: number = 1
  ListDonVi: any[]
  loadDstsImport: boolean = true
  penddingImport: boolean = false
  constructor(
    private _ketNhapDuLieuService: KetNhapDuLieuService,
    private _ketNhapDuLieuKiemKeService: KetNhapDuLieuKiemKeService,
    private messageService: MessageService,) { }

  ngOnInit(): void {
    this.initData();
  }
  initData() {
    this.loadDanhSachDonViCoTheImport()
  }
  changeDonVi() {
    console.log(this.ID_DonVi)
    if (this.ID_DonVi) {
      this.loadDstsImport = false
    }
    else {
      this.loadDstsImport = true
    }
  }
  loadDanhSachDonViCoTheImport() {
    this._ketNhapDuLieuService.GetDmDonViByIDCha(1).subscribe(res => {
      this.ListDonVi = res
    },
      (er) => {
        console.log(er)
        this.ListDonVi = [];
        this.messageService.add({ key: "ketNhapDuLieuKiemKe", severity: 'error', summary: 'Thông báo', detail: "Load đơn vị Import thất bại vui lòng thử lại sau." });
      })
  }
  onUpload(evnt: any, fileUpload: any) {
    this.penddingImport = true
    this.value = 0
    console.log(evnt.files[0])
    console.log(fileUpload)
    this.loadDstsImport = true
    fileUpload.clear();
    this.pendingFun(0);
    this._ketNhapDuLieuKiemKeService.SaveFile(evnt.files[0], this.ID_DonVi).subscribe((data) => {
      this.messageService.add({ key: "ketNhapDuLieuKiemKe", severity: data.flag ? 'success' : 'error', summary: 'Thông báo', detail: data.mess });
      this.loadDstsImport = false
      this.penddingImport = false
      this.pendingFun(100);
      this.value = 0
    }, (error) => {
      this.messageService.add({ key: "ketNhapDuLieuKiemKe", severity: 'error', summary: 'Thông báo', detail: 'Có lỗi xảy ra trong quá trình đọc file dữ liệu.Vui lòng thử lại sau' });
      console.log("SaveFile lỗi", error);
      this.loadDstsImport = false
      this.penddingImport = false
      this.pendingFun(100);
      this.value = 0
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
    if (EndTime == 100) {
      this.value = 100
      clearInterval(interval)
      this.value = 0
    }
  }
}
