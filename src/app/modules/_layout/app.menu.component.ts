import { AfterViewInit, ElementRef, OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { first } from 'rxjs';
import { MenuService } from './app.menu.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_core/services/auth.service';
import { SidemenuService } from './sidemenu/sidemenu.component.service';
import { MessageService } from 'primeng/api';
import { LayoutService } from './service/app.layout.service';
import { UserSessionModel } from 'src/app/_core/models/user-session-model';


@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html',
    styleUrls: ['./app.menu.component.scss']
})
export class AppMenuComponent implements OnInit, AfterViewInit {

    model: any[] = [];
    Menu: any[] = [];
    user!: UserSessionModel;

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

    ngOnInit() {

        this.user = this.authService.userValue;
        this.menuservice.getMenuTheoNhanVien().pipe(first()).subscribe({
            next: (data) => {
                this.Menu = data;

                setTimeout(() => {
                    const listItems = document.querySelectorAll(".sidebar-list li");

                    listItems.forEach((item) => {
                        item.addEventListener("click", () => {
                            let isActive = item.classList.contains("active");

                            listItems.forEach((el) => {
                                el.classList.remove("active");
                            });

                            if (isActive) item.classList.remove("active");
                            else item.classList.add("active");
                        });
                    });
                }, 100);

            },
            error: (error) => {

            }
        })

        // this.model = [
        //     {
        //         label: 'Home',
        //         items: [
        //             { label: 'Trang chủ', icon: 'pi pi-fw pi-home', routerLink: ['/main/todawork'] },
        //         ]
        //     },
        //     {
        //         label: 'Danh mục',
        //         items: [
        //             { label: 'Cảnh báo màu số lần gọi', icon: 'pi pi-fw pi-bookmark', routerLink: ['/danhmuc/canhbaomau'] },
        //             { label: 'Câu hỏi chiến dịch khảo sát', icon: 'pi pi-fw pi-id-card', routerLink: ['/danhmuc/cauhoi-chiendich-khaosat'] },
        //             {
        //                 label: 'FAQ', icon: 'pi pi-fw pi-bookmark',
        //                 items: [
        //                     { label: 'Danh mục câu hỏi', icon: 'pi pi-fw pi-bookmark', routerLink: ['/faq/cauhoi'] },
        //                     { label: 'Danh sách kỹ thuật viên', icon: 'pi pi-fw pi-bookmark', routerLink: ['/faq/kythuatvien'] }
        //                 ]
                       
        //             },
        //         ] ,data: { breadcrumb: 'Danh mục' }
        //     },
        // ];
    }

    getIconByTenChucNang(TenChucNang) {
        switch (TenChucNang) {
            case 'Danh mục': return 'bx bx-collection';
            case 'Cấu hình': return 'bx bx-cog';
            case 'Quản lý': return 'bx bx-history';
            case 'Quản trị': return 'bx bx-cog';
            default: return 'bx bx-extension';
        }
    }

    get containerClass() {
        return {
            'layout-theme-light': this.layoutService.config.colorScheme === 'light',
            'layout-theme-dark': this.layoutService.config.colorScheme === 'dark',
            'layout-overlay': this.layoutService.config.menuMode === 'overlay',
            'layout-static': this.layoutService.config.menuMode === 'static',
            'layout-slim': this.layoutService.config.menuMode === 'slim',
            'layout-horizontal': this.layoutService.config.menuMode === 'horizontal',
            'layout-static-inactive': this.layoutService.state.staticMenuDesktopInactive && this.layoutService.config.menuMode === 'static',
            'layout-overlay-active': this.layoutService.state.overlayMenuActive,
            'layout-mobile-active': this.layoutService.state.staticMenuMobileActive,
            'p-input-filled': this.layoutService.config.inputStyle === 'filled',
            'p-ripple-disabled': !this.layoutService.config.ripple
        }
    }
}
