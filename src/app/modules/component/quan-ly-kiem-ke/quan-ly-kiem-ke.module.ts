import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuanLyKiemkeiRoutingModule } from './quan-ly-kiem-ke-routing.module';
import { MenuBarLeftComponent } from '../menu-bar-left/menu-bar-left/menu-bar-left.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { LayoutQuanLyKiemKeComponent } from './layout-quan-ly-kiem-ke/layout-quan-ly-kiem-ke.component';
import { DanhSachTaiSanComponent } from './danh-sach-tai-san/danh-sach-tai-san.component';
import { QuanLyQRComponent } from './quan-ly-qr-code/quan-ly-qr.component';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { FieldsetModule } from 'primeng/fieldset';
import { TabViewModule } from 'primeng/tabview';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@NgModule({
    declarations:[
        DanhSachTaiSanComponent,
        QuanLyQRComponent,
        LayoutQuanLyKiemKeComponent
    ],
    imports: [
        CommonModule,
        ConfirmDialogModule,
        TabViewModule,
        QuanLyKiemkeiRoutingModule,
        SharedModule,
        MenuBarLeftComponent,
        ScrollPanelModule,
        FieldsetModule
    ]
})
export class QuanLyKiemKeModule { }
