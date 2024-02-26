import { Component, OnInit } from '@angular/core';
import { MenuBarLeftModel } from '../../menu-bar-left/menu-bar-left/menu-bar-left.models/menu-bar-left.model';

@Component({
  selector: 'app-layout-quan-tri',
  templateUrl: './layout-quan-tri.component.html',
  styleUrls: ['./layout-quan-tri.component.scss']
})
export class LayoutQuanTriComponent implements OnInit {
  itemMenuBarLeft: MenuBarLeftModel[]
  constructor() {
    this.itemMenuBarLeft = [
      new MenuBarLeftModel("Quản lý tài khoản", "quan-tri/quan-ly-tai-khoan", "pi pi-users", 0, true),
      new MenuBarLeftModel("Kết nhập dữ liệu", "quan-tri/ket-nhap-du-lieu", "pi pi-download", 1, false),
      new MenuBarLeftModel("Kết xuất kiểm kê", "quan-tri/ket-xuat-du-lieu-kiem-ke", "pi pi-upload", 2, false),
      new MenuBarLeftModel("Kết nhập kiểm kê", "quan-tri/ket-nhap-du-lieu-kiem-ke", "pi pi-download", 3, false),
    ]
  }
  ngOnInit(): void { 
    this.itemMenuBarLeft[0].isActive = true;

  }

}
