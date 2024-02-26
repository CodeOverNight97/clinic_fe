import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuanTriRoutingModule } from './quan-tri-routing.module';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { MenuBarLeftComponent } from '../menu-bar-left/menu-bar-left/menu-bar-left.component';
import { LayoutQuanTriComponent } from './layout-quan-tri/layout-quan-tri.component';
import { KetNhapDuLieuComponent } from './ket-nhap-du-lieu/ket-nhap-du-lieu.component';
import { KetNhapDuLieuKiemKeComponent } from './ket-nhap-du-lieu-kiem-ke/ket-nhap-du-lieu-kiem-ke.component';
import { KetXuatDuLieuKiemKeComponent } from './ket-xuat-du-lieu-kiem-ke/ket-xuat-du-lieu-kiem-ke.component';
import { QuanLyTaiKhoanComponent } from './quan-ly-tai-khoan/quan-ly-tai-khoan.component';
import { MessageModule } from 'primeng/message';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ProgressBarModule } from 'primeng/progressbar';


@NgModule({
    declarations: [
        QuanLyTaiKhoanComponent,
        KetNhapDuLieuComponent,
        KetNhapDuLieuKiemKeComponent,
        KetXuatDuLieuKiemKeComponent,
        LayoutQuanTriComponent
    ],
    imports: [
        CommonModule,
        QuanTriRoutingModule,
        RouterModule,
        SharedModule,
        MessageModule,
        MenuBarLeftComponent,
        ProgressBarModule
    ],
    providers: [ConfirmationService, MessageService]

})
export class QuanTriModule { }
