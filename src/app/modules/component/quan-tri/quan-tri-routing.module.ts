import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/_core/helper/auth.guard';
import { LayoutQuanTriComponent } from './layout-quan-tri/layout-quan-tri.component';
import { QuanLyTaiKhoanComponent } from './quan-ly-tai-khoan/quan-ly-tai-khoan.component';
import { KetNhapDuLieuComponent } from './ket-nhap-du-lieu/ket-nhap-du-lieu.component';
import { KetXuatDuLieuKiemKeComponent } from './ket-xuat-du-lieu-kiem-ke/ket-xuat-du-lieu-kiem-ke.component';
import { KetNhapDuLieuKiemKeComponent } from './ket-nhap-du-lieu-kiem-ke/ket-nhap-du-lieu-kiem-ke.component';

@NgModule({
    imports: [RouterModule.forChild([
        {
            path: '',  component: LayoutQuanTriComponent,
            canActivate: [AuthGuard],
            children: [
                { path: '', component: QuanLyTaiKhoanComponent },
                { path: 'quan-ly-tai-khoan', component: QuanLyTaiKhoanComponent },
                { path: 'ket-nhap-du-lieu', component: KetNhapDuLieuComponent },
                { path: 'ket-xuat-du-lieu-kiem-ke', component: KetXuatDuLieuKiemKeComponent },
                { path: 'ket-nhap-du-lieu-kiem-ke', component: KetNhapDuLieuKiemKeComponent },
            ],
        },
    ])],
    exports: [RouterModule]
})
export class QuanTriRoutingModule { }
