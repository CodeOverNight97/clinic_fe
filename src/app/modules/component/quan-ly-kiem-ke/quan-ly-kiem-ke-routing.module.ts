import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/_core/helper/auth.guard';
import { LayoutQuanLyKiemKeComponent } from './layout-quan-ly-kiem-ke/layout-quan-ly-kiem-ke.component';
import { DanhSachTaiSanComponent } from './danh-sach-tai-san/danh-sach-tai-san.component';
import { QuanLyQRComponent } from './quan-ly-qr-code/quan-ly-qr.component';

@NgModule({
    imports: [RouterModule.forChild([
        {
            path: '', component: LayoutQuanLyKiemKeComponent,
            canActivate: [AuthGuard],
            children: [
                { path: '', component: DanhSachTaiSanComponent },
                { path: 'danh-sach-tai-san', component: DanhSachTaiSanComponent },
                { path: 'quan-ly-qr-code', component: QuanLyQRComponent },
            ],
        },
    ])],
    exports: [RouterModule]
})
export class QuanLyKiemkeiRoutingModule { }
