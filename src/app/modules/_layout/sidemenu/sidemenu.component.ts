import { AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { first } from 'rxjs';
import { UserSessionModel } from 'src/app/_core/models/user-session-model';
import { AuthService } from 'src/app/_core/services/auth.service';
import { MenuService } from '../app.menu.service';
import { SidemenuService } from './sidemenu.component.service';
import { LayoutService } from '../service/app.layout.service';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.scss']
})

export class SidemenuComponent implements OnInit, AfterViewInit {
  ActiveIndex: number = 0;
  ActiveDropdownIndex: number = 0;

  MenuDanhMuc: any[] = [];
  MenuQuanLy: any[] = [];
  MenuQuanTri: any[] = [];
  constructor(public menuservice: MenuService,
    private router: Router,
    private authService: AuthService,
    private service: SidemenuService,
    private messageService: MessageService,
    private elementRef: ElementRef,
    public layoutService: LayoutService
  ) { }

  ngAfterViewInit(): void {

  }
  items: any[];
  ngOnInit(): void {
    this.items = [
      {
        text: "Quản trị",
        link: "/quan-tri"
      },
      {
        text: "Quản lý kiểm kê",
        link: "/quan-ly-kiem-ke"
      },
      {
        text: "Báo cáo thống kê",
        link: "/bao-cao-thong-ke"
      }
    ];
    this.user = this.authService.userValue;
    // this.menuservice.getMenuTheoNhanVien().pipe(first()).subscribe({
    //   next: (data) => {
    //     this.MenuDanhMuc = data.filter(x => x.MaCha == 'DANHMUC');
    //     this.MenuQuanLy = data.filter(x => x.MaCha == 'QUANLY');
    //     this.MenuQuanTri = data.filter(x => x.MaCha == 'QUANTRI');
    //   },
    //   error: (error) => {

    //   }
    // })
  }
  RidirectToLink(link: string) {
    console.log(link)
    this.router.navigate([link])
  }
  goHome() {
    this.hideDropdown();
    this.ActiveIndex = 0;
    this.router.navigate(['/home']);
  }

  active(index: number) {
    this.ActiveIndex = index;
    if (this.ActiveDropdownIndex == index) {
      this.hideDropdown();
    }
    else {
      this.ActiveDropdownIndex = index;
    }
  }

  user!: UserSessionModel;
  Menu: any[] = [];

  goToLink(link) {
    this.router.navigate([link]);
    setTimeout(() => {
      this.hideDropdown();
    }, 100);
  }

  hideDropdown() {
    this.ActiveDropdownIndex = 0;
  }

  logout() {
    this.authService.logout();
  }

  ShowMenuMobileToggle: boolean = false
  showMenuMobile() {
    this.ShowMenuMobileToggle = true
  }

  onChildClick(event: any) {
    const target = event.target as HTMLElement;
    // Xử lý logic khi người dùng nhấp chuột vào phần tử con
    this.ShowMenuMobileToggle = false
  }

  openDoiMatKhau() {
    this.isChangePassWordDialog = true;
  }

  closeAllEtc() {
    this.hideDropdown();
  }

  //#region Change PassWord
  isChangePassWordDialog: boolean = false;
  key_toast: string = 'notification';
  hideDialog(event) {
    this.isChangePassWordDialog = false;
  }
  //#endregion
}
