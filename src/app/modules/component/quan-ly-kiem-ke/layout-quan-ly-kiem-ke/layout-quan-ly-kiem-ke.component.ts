import { Component, type OnInit } from '@angular/core';
import { MenuBarLeftModel } from '../../menu-bar-left/menu-bar-left/menu-bar-left.models/menu-bar-left.model';

@Component({
  selector: 'app-layout-quan-ly-kiem-ke',
  templateUrl: './layout-quan-ly-kiem-ke.component.html',
  styleUrls: ['./layout-quan-ly-kiem-ke.component.css'],
})
export class LayoutQuanLyKiemKeComponent implements OnInit {
  constructor() {
    this.itemMenuBarLeft = [
      new MenuBarLeftModel("Danh sách tài sản", "quan-ly-kiem-ke/danh-sach-tai-san", "pi pi-briefcase", 0, true),
      new MenuBarLeftModel("Quản lý QR code", "quan-ly-kiem-ke/quan-ly-qr-code", "pi pi-qrcode", 1, false),
    ]
  }
  itemMenuBarLeft: MenuBarLeftModel[];
  ngOnInit(): void {

  }
}
