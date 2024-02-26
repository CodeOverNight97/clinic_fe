import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LayoutBaoCaoThongKeComponent } from './layout-bao-cao-thong-ke/layout-bao-cao-thong-ke.component';
import { AuthGuard } from 'src/app/_core/helper/auth.guard';
import { BaoCaoThayDoiDuLieuComponent } from './bao-cao-thay-doi-du-lieu/bao-cao-thay-doi-du-lieu.component';
import { BaoCaoKetNhapDuLieuComponent } from './bao-cao-ket-nhap-du-lieu/bao-cao-ket-nhap-du-lieu.component';
import { BaoCaoKetXuatDuLieuComponent } from './bao-cao-ket-xuat-du-lieu/bao-cao-ket-xuat-du-lieu.component';
import { BaoCaoKetNhapKiemKeComponent } from './bao-cao-ket-nhap-kiem-ke/bao-cao-ket-nhap-kiem-ke.component';
import { BaoCaoChiTietTaiSanComponent } from './bao-cao-chi-tiet-tai-san/bao-cao-chi-tiet-tai-san.component';

@NgModule({
    imports: [RouterModule.forChild([
        {
            path: '', component: LayoutBaoCaoThongKeComponent,
            canActivate: [AuthGuard],
            children: [
                { path: '', component: BaoCaoChiTietTaiSanComponent },
                { path: 'bao-cao-chi-tiet-tai-san', component: BaoCaoChiTietTaiSanComponent },
                { path: 'bao-cao-thay-doi-du-lieu', component: BaoCaoThayDoiDuLieuComponent },
                { path: 'bao-cao-ket-nhap-du-lieu', component: BaoCaoKetNhapDuLieuComponent },
                { path: 'bao-cao-ket-xuat-du-lieu', component: BaoCaoKetXuatDuLieuComponent },
                { path: 'bao-cao-ket-nhap-kiem-ke', component: BaoCaoKetNhapKiemKeComponent },
            ],
        },
    ])],
    exports: [RouterModule]
})
export class BaoCaoThongKeRoutingModule { }
