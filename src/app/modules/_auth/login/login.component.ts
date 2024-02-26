import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '../../../_core/services/auth.service';
import { Message } from 'primeng/api';
import { interval } from 'rxjs';
import { LayoutService } from '../../_layout/service/app.layout.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: [`
        :host ::ng-deep .p-password input {
            width: 100%;
            padding:1rem;
        }

        :host ::ng-deep .pi-eye{
            transform:scale(1.6);
            margin-right: 1rem;
            color: #00a654 !important;
        }

        :host ::ng-deep .pi-eye-slash{
            transform:scale(1.6);
            margin-right: 1rem;
            color: #00a654 !important;
        }
        :host ::ng-deep .element:hover {
            cursor: pointer;
            }

    `]
})
export class LoginComponent implements OnInit {
    @ViewChild('tendangnhap') tendangnhap?: ElementRef;

    loadtime: number = 0;

    intervalCheckExistElemnt = interval(400);
    subscription: any;

    valCheck: string[] = ['remember'];
    msgs: Message[] = [];

    username!: string;
    password!: string;

    constructor(
        public layoutService: LayoutService,
        private authService: AuthService,
        private router: Router
    ) { }

    ngOnInit(): void {
        if (this.authService.userValue.flag) {
            this.router.navigate(['/home']);
        }
    }

    signin() {
        if (!navigator.onLine) {
            this.msgs = [];
            this.msgs.push({ severity: 'error', summary: 'Lỗi', detail: 'Không có kết nối Internet.Vui lòng thử lại !' });
            return;
        }

        this.authService.login(this.username, this.password).pipe(first()).subscribe(
            {
                next: (data) => {
                    if (data.flag) {
                        // if (data.flag) {
                        this.authService.luuThongTinTaiKhoan(data)
                        this.router.navigate(['/quan-ly-kiem-ke']);
                    }
                    else {
                        this.msgs = [];
                        this.msgs.push({ severity: 'error', summary: 'Thông báo', detail: data.msg });
                    }
                },
                error: (error) => {
                    this.msgs = [];
                    this.msgs.push({ severity: 'error', summary: 'Thông báo', detail: 'Đã có lỗi xảy ra.Vui lòng thử lại sau giây lát !' });
                }
            });
    }

    ChangeUserName(Event) {
        console.log(Event)
    }
}
