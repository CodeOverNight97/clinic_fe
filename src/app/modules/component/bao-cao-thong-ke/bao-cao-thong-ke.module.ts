import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaoCaoThongKeRoutingModule } from './bao-cao-thong-ke.routing.module';
import { RouterModule } from '@angular/router';
import { LayoutBaoCaoThongKeComponent } from './layout-bao-cao-thong-ke/layout-bao-cao-thong-ke.component';
import { MenuBarLeftComponent } from '../menu-bar-left/menu-bar-left/menu-bar-left.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { BaoCaoThayDoiDuLieuComponent } from './bao-cao-thay-doi-du-lieu/bao-cao-thay-doi-du-lieu.component';
import { BaoCaoKetNhapDuLieuComponent } from './bao-cao-ket-nhap-du-lieu/bao-cao-ket-nhap-du-lieu.component';
import { BaoCaoKetXuatDuLieuComponent } from './bao-cao-ket-xuat-du-lieu/bao-cao-ket-xuat-du-lieu.component';
import { BaoCaoKetNhapKiemKeComponent } from './bao-cao-ket-nhap-kiem-ke/bao-cao-ket-nhap-kiem-ke.component';
import { TabViewModule } from 'primeng/tabview';
import { BaoCaoChiTietTaiSanComponent } from './bao-cao-chi-tiet-tai-san/bao-cao-chi-tiet-tai-san.component';

@NgModule({
    declarations: [
        BaoCaoChiTietTaiSanComponent,
        BaoCaoThayDoiDuLieuComponent,
        BaoCaoKetNhapDuLieuComponent,
        BaoCaoKetXuatDuLieuComponent,
        BaoCaoKetNhapKiemKeComponent,
        LayoutBaoCaoThongKeComponent,
    ],
    imports: [
        CommonModule,
        BaoCaoThongKeRoutingModule,
        RouterModule,
        SharedModule,
        TabViewModule,
        MenuBarLeftComponent
    ]
})
export class BaoCaoThongKeModule { }
