import { Component, OnInit } from '@angular/core';
import { KetXuatDuLieuKiemKeService } from './ket-xuat-du-lieu-kiem-ke.service';
import { KetNhapDuLieuService } from '../ket-nhap-du-lieu/ket-nhap-du-lieu.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-ket-xuat-du-lieu-kiem-ke',
  templateUrl: './ket-xuat-du-lieu-kiem-ke.component.html',
  styleUrls: ['./ket-xuat-du-lieu-kiem-ke.component.scss']
})
export class KetXuatDuLieuKiemKeComponent implements OnInit {
  constructor(
    private _ketXuatDuLieuKiemKeService: KetXuatDuLieuKiemKeService,
    private _ketNhapDuLieuService: KetNhapDuLieuService,
    private messageService: MessageService) { }
  ID_DonVi: number = 1
  penddingImport: boolean = false
  ListDonVi: any[]
  loadKetXuatDuLieuKiemKe: boolean = false
  ngOnInit(): void {
    this.initData();
  }
  initData() {
    this.loadDanhSachDonViCoTheImport()
  }
  changeDonVi() {
    console.log(this.ID_DonVi)
    if (this.ID_DonVi) {
      this.loadKetXuatDuLieuKiemKe = true
    }
    else {
      this.loadKetXuatDuLieuKiemKe = false
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
  KetXuatDuLieu() {
    this.penddingImport = true
    this.value = 0
    console.log(this.penddingImport)
    this.pendingFun(0);
    this._ketXuatDuLieuKiemKeService.downloadFile(this.ID_DonVi).subscribe(response => {
      this.penddingImport =false
      this._ketXuatDuLieuKiemKeService.saveFile(response, this.ListDonVi.find(x=>x.id_don_vi == this.ID_DonVi).ten_don_vi);
      this.messageService.add({ key: "ketNhapDuLieuKiemKe", severity: 'success', summary: 'Thông báo', detail: "Kết xuất kiểm kê thành công." });
      this.pendingFun(100);
    }, (er) => {
      console.log(er)
      this.penddingImport =false
      this.messageService.add({ key: "ketNhapDuLieuKiemKe", severity: 'error', summary: 'Thông báo', detail: "Kết xuất kiểm kê thất bại." });
      this.pendingFun(100);
    });
  }
  value: number = 0
  pendingFun(EndTime: number) {
    console.log(this.value)
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
