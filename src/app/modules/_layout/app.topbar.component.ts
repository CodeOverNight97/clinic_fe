import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from "./service/app.layout.service";
import { AuthService } from '../../_core/services/auth.service';
import { UserSessionModel } from '../../_core/models/user-session-model';
import { first } from 'rxjs';
import { Router } from '@angular/router';
import { formatDate } from '@angular/common';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent implements OnInit {
  connectionEstablishedSubscription?: any = undefined;

  items!: MenuItem[];
  menuItems!: MenuItem[];
  user!: UserSessionModel;
  fullName!: string;
  extension!: string;
  chucdanh!: string;
  donVi!: string;

  DoiMatKhauDialog: boolean = false;
  @Input() DoiMatKhau_Dialog;

  constructor(
    public layoutService: LayoutService, 
    private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
      this.user = this.authService.userValue;

      this.menuItems = [
          {
              label: this.user.value?.TaiKhoan?.ten_dang_nhap, 
              escape: false, icon: 'bx bx-user-circle bx-sm'
          },
          {
              label: 'Đổi mật khẩu', icon: 'pi pi-fw pi-refresh',
              command: (event) => {
                  this.DoiMatKhauDialog = true;
              }
          },
          {
              separator: true
          },
          {
              label: 'Đăng xuất', icon: 'pi pi-fw pi-sign-out',
              command: (event) => {
                  this.logout();
              }
          },
      ];
      this.fullName = this.user.value?.TaiKhoan?.ten_dang_nhap || '';
  }

  ngOnChanges(changes: SimpleChanges) {
  }

  logout() {
      this.authService.logout();
  }

  onDoiMatKhauDialog(data: boolean) {
      this.DoiMatKhauDialog = data;
  }
}
