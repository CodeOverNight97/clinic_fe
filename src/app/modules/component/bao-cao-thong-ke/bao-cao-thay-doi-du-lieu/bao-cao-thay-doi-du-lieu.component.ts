import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, type OnInit } from '@angular/core';
// import { BaoCaoChiTietTaiSanFilterModel } from 'src/app/modules/models/bao-cao/baocao-chitiet-taisan-filter-model';
import { BaoCaoChiTietTaiSanViewModel } from 'src/app/modules/models/bao-cao/baocao-chitiet-taisan-view-model';
import { first } from 'rxjs';
import { CommonService } from 'src/app/modules/service/common.service';
import { ComboboxService } from 'src/app/modules/service/combobox.service';
import { BaoCaoChiTietTaiSanService } from '../bao-cao-chi-tiet-tai-san/bao-cao-chi-tiet-tai-san.service';
import { BaoCaoChiTietTaiSanFilterModel } from './bao-cao-thay-doi-du-lieu.models/bao-cao-thay-doi-du-lieu.models';

@Component({
  selector: 'app-bao-cao-thay-doi-du-lieu',
  templateUrl: './bao-cao-thay-doi-du-lieu.component.html',
  styleUrls: ['./bao-cao-thay-doi-du-lieu.component.scss']
})
export class BaoCaoThayDoiDuLieuComponent implements OnInit {

  constructor(
    private _baocaoService: BaoCaoChiTietTaiSanService,
    private _commonService: CommonService,
    private comboboxService: ComboboxService,
  ) { }

  loading_export_excel: boolean = false;
  loading_search: boolean = false;
  loading_grid: boolean = false;
  now: Date = new Date();
  comboboxDonVi: any[] = [];
  comboboxLoaiTaiSan: any[] = [];
  ListData: BaoCaoChiTietTaiSanViewModel[] = [];

  objFilter: BaoCaoChiTietTaiSanFilterModel = new BaoCaoChiTietTaiSanFilterModel();

  cols: any[] = [
    { field: 'ma_tai_san', header: 'Mã tài sản', width: '0px', align: 'left' },
    { field: 'ten_tai_san', header: 'Tên tài sản', width: '0px', align: 'left' },
    { field: 'nam_su_dung', header: 'Năm sử dụng', width: '0px', align: 'center' },
    { field: 'thong_so_ky_thuat', header: 'Thông số kĩ thuật', width: '0px', align: 'left' },
    { field: 'ten_don_vi_quan_ly', header: 'Đơn vị quản lý', width: '0px', align: 'left' },
    { field: 'nguyen_gia_tong_tien', header: 'Tổng số', width: '0px', align: 'right' },
    { field: 'nguyen_gia_ngan_sach', header: 'Ngân sách', width: '0px', align: 'right' },
    { field: 'nguyen_gia_nguon_khac', header: 'Nguồn khác', width: '0px', align: 'right' },
    { field: 'gia_tri_con_lai', header: 'Giá trị còn lại', width: '0px', align: 'right' },
    { field: 'ghi_chu', header: 'Ghi chú', width: '0px', align: 'left' },
    { field: 'kiem_ke_ngay', header: 'Ngày kiểm kê', width: '0px', align: 'center' },
    { field: 'kiem_ke_nguoi', header: 'Người kiểm kê', width: '0px', align: 'left' },
    { field: 'kiem_ke_noi_dung', header: 'Nội dung kiểm kê', width: '0px', align: 'left' },
  ]
  //#endregion
  ngOnInit(): void {
    this.loadCombox();
  }

  Search() {
    const { ma_loai_tai_san = '', ten_tai_san = '', id_donvi = 0 } = this.objFilter;

    this.loading_grid = this.loading_search = true;
    this.ListData = [];
    this._baocaoService.GetListBaoCaoChiTietTaiSan({ ma_loai_tai_san, ten_tai_san, id_donvi }).pipe(first()).subscribe({
      next: (data) => {
        this.ListData = data.length ? data : [];
        if (!data.length) this._commonService.showInfo("Không có dữ liệu!");
      },
      error: (error) => {
        this._commonService.showError();
        this.loading_grid = this.loading_search = false;
      },
      complete: () => {
        this.loading_grid = this.loading_search = false;
      }
    })
  }

  XuatExcel() {
    if (this.ListData.length == 0) {
      this._commonService.showInfo('Không có dữ liệu!')
    }
    else {
      this.loading_export_excel = true;
      const { ma_loai_tai_san = '', ten_tai_san = '', id_donvi = 0 } = this.objFilter;
      this._baocaoService.ExportBaoCaoChiTietTaiSan({ ma_loai_tai_san, ten_tai_san, id_donvi }).pipe(first()).subscribe(
        {
          next: (data) => {
            this._commonService.downloadFile('Báo cáo chi tiết tài sản _ ', data, '.xls');
          },
          error: (error) => {
            this._commonService.showError('Đã có lỗi xảy ra.Vui lòng thử lại trong giây lát');
            this.loading_export_excel = false;
          },
          complete: () => {
            this.loading_export_excel = false;
          }
        }
      )
    }
  }
  comboboxThoiGian: any[]
  showDatePick: boolean = false
  ChangeFilterDate($event) {
    if ($event.value == 'KHOANGTHOIGIAN') {
      this.showDatePick = true
    } else {
      this.showDatePick = false
    }
  }
  loadCombox() {
    this.comboboxThoiGian = [
      {
        type: 'GANNHAT',
        text: 'So với lần gần nhất'
      },
      {
        type: 'KHOANGTHOIGIAN',
        text: 'So khoảng thời gian'
      }
    ]
    this.comboboxService.getListDonVi('Cha').pipe(first()).subscribe(
      {
        next: (data) => {
          this.objFilter.id_donvi = data[0].ID || undefined;
          this.Search();
          this.comboboxDonVi = data;
        },
        error: (error) => {
          this.comboboxDonVi = [];
        }
      }
    )
    this.comboboxService.getListLoaiTaiSan().pipe(first()).subscribe(
      {
        next: (data) => {
          console.log(data)
          this.objFilter.ma_loai_tai_san = data[0].ID || undefined;
          this.Search();
          this.comboboxLoaiTaiSan = data;
        },
        error: (error) => {
          this.comboboxLoaiTaiSan = [];
        }
      }
    )
  }
}
