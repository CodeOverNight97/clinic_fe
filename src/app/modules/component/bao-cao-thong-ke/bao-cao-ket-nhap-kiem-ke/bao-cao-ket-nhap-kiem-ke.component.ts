import { Component, OnInit } from '@angular/core';
import { Observable, Subject, catchError, finalize, first, forkJoin, of, switchMap, takeUntil, throwError } from 'rxjs';
import { CommonService } from 'src/app/modules/service/common.service';
import { ComboboxService } from 'src/app/modules/service/combobox.service';
import { ComboboxViewModel } from 'src/app/modules/models/common/combobox-view-model';
import { BaoCaoKetNhapKiemKeFilterModel } from 'src/app/modules/models/bao-cao/bao-cao-ket-nhap-kiem-ke-filter-model';
import { formatDate } from '@angular/common';
import { BaoCaoKetNhapKiemKeService } from './bao-cao-ket-nhap-kiem-ke.service';

enum ACTION {
  KET_NHAP,
  KET_NHAP_QRCODE,
  KET_NHAP_TAI_SAN,
  KET_NHAP_TAI_SAN_KIEM_KE,
}

@Component({
  selector: 'app-bao-cao-ket-nhap-kiem-ke',
  templateUrl: './bao-cao-ket-nhap-kiem-ke.component.html',
  styleUrls: ['./bao-cao-ket-nhap-kiem-ke.component.scss']
})
export class BaoCaoKetNhapKiemKeComponent implements OnInit {
  constructor(
    private _baocaoService: BaoCaoKetNhapKiemKeService,
    private _commonService: CommonService,
    private comboboxService: ComboboxService
  ) { }

  dateTuNgay?: Date;
  dateDenNgay?: Date;
  maxDate: Date = this.dateDenNgay ? this.dateDenNgay : new Date();
  minDate: Date = this.dateTuNgay ? this.dateTuNgay : new Date();
  
  action: number = 0;
  loading_search: boolean = false;
  loading_grid_detail: boolean = false;
  loading_grid_lan_ket_nhap: boolean = false;
  
  ListData: any[] = [];
  ListLanKiemKe: ComboboxViewModel[] = [];
  comboboxDonVi: ComboboxViewModel[] = [];
  
  objFilter: BaoCaoKetNhapKiemKeFilterModel = new BaoCaoKetNhapKiemKeFilterModel();
  SelectionLanKetNhap: ComboboxViewModel = new ComboboxViewModel();

  items: any[] = [
    { label: 'Kết nhập', action: ACTION.KET_NHAP },
    { label: 'Kết nhập QrCode', action: ACTION.KET_NHAP_QRCODE },
    { label: 'Kết nhập tài sản', action: ACTION.KET_NHAP_TAI_SAN },
    { label: 'Kết nhập tài sản kiểm kê', action: ACTION.KET_NHAP_TAI_SAN_KIEM_KE },
  ];
  activeItem: any = this.items[0];
  
  cols_lan_ket_nhap: any[] = [
    { field: 'Value', header: 'Lần/Đơn vị', width: '300px', align: 'left' },
  ];

  cols_ket_nhap = [
    { field: 'STT', header: 'STT', width: '50px', align: 'center' },
    { field: 'ten_don_vi', header: 'Đơn vị', width: '200px', align: 'left' },
    { field: 'created_date', header: 'Ngày thêm', width: '100px', align: 'center' },
    { field: 'created_by', header: 'Người thêm', width: '100px', align: 'center' },
  ]

  cols_ket_nhap_qrcode = [
    { field: 'STT', header: 'STT', width: '50px', align: 'center' },
    { field: 'trang_thai', header: 'Trạng thái', width: '100px', align: 'center' },
    { field: 'qrcode', header: 'QrCode', width: '100px', align: 'center' },
    { field: 'noi_dung', header: 'Nội dung', width: '200px', align: 'left' },
    { field: 'url', header: 'URL', width: '250px', align: 'left' },
    { field: 'ma_tai_san', header: 'Mã tài sản', width: '150px', align: 'center' },
    { field: 'ten_don_vi', header: 'Tên đơn vị', width: '200px', align: 'left' },
    { field: 'created_date', header: 'Ngày thêm', width: '100px', align: 'center' },
    { field: 'created_by', header: 'Người thêm', width: '100px', align: 'center' },
  ]

  cols_ket_nhap_tai_san = [
    { field: 'STT', header: 'STT', width: '50px', align: 'center' },
    { field: 'ma_loai_tai_san', header: 'Mã loại tài sản', width: '120px', align: 'center' },
    { field: 'ten_loai_tai_san', header: 'Tên loại tài sản', width: '200px', align: 'left' },
    { field: 'ma_tai_san', header: 'Mã tài sản', width: '120px', align: 'center' },
    { field: 'ten_tai_san', header: 'Tên tài sản', width: '250px', align: 'left' },
    { field: 'nam_su_dung', header: 'Năm sử dụng', width: '80px', align: 'left' },
    { field: 'thong_so_ky_thuat', header: 'Thông số kỹ thuật', width: '150px', align: 'left' },
    { field: 'ten_don_vi_goc', header: 'Tên đơn vị gốc', width: '250px', align: 'left' },
    { field: 'ten_don_vi_quan_ly', header: 'Tên đơn vị quản lý', width: '250px', align: 'left' },
    { field: 'nguyen_gia_tong_tien', header: 'Nguyên giá tổng tiền', width: '120px', align: 'right' },
    { field: 'nguyen_gia_ngan_sach', header: 'Nguyên giá ngân sách', width: '120px', align: 'right' },
    { field: 'nguyen_gia_nguon_khac', header: 'Nguyên giá nguồn khác', width: '120px', align: 'right' },
    { field: 'gia_tri_con_lai', header: 'Giá trị còn lại', width: '120px', align: 'right' },
    { field: 'ghi_chu', header: 'Ghi chú', width: '200px', align: 'left' },
    { field: 'qrcode', header: 'QrCode', width: '100px', align: 'center' },
    { field: 'qrcode_ngay_cap', header: 'QrCode ngày cấp', width: '100px', align: 'center' },
    { field: 'qrcode_nguoi_cap', header: 'QrCode người cấp', width: '200px', align: 'left' },
    { field: 'kiem_ke_ngay', header: 'Kiểm kê ngày', width: '100px', align: 'center' },
    { field: 'kiem_ke_nguoi', header: 'Kiểm kê người', width: '200px', align: 'left' },
    { field: 'kiem_ke_noi_dung', header: 'Kiểm kê nội dung', width: '100px', align: 'left' },
    { field: 'created_date', header: 'Ngày thêm', width: '100px', align: 'center' },
    { field: 'created_by', header: 'Người thêm', width: '100px', align: 'center' },
  ]

  cols_ket_nhap_tai_san_kiem_ke = [
    { field: 'STT', header: 'STT', width: '50px', align: 'center' },
    { field: 'ma_tai_san', header: 'Mã tài sản', width: '200px', align: 'left' },
    { field: 'kiem_ke_ngay', header: 'Kiểm kê ngày', width: '150px', align: 'center' },
    { field: 'kiem_ke_nguoi', header: 'Kiểm kê người', width: '200px', align: 'left' },
    { field: 'kiem_ke_noi_dung', header: 'Kiểm kê nội dung', width: '250px', align: 'left' },
    { field: 'created_date', header: 'Ngày thêm', width: '150px', align: 'center' },
    { field: 'created_by', header: 'Người thêm', width: '150px', align: 'center' },
  ]
  //#endregion
  ngOnInit(): void {
    this.initDate()
    this.loadCombox();
    this.Search();
  }

  //#region LOAD DATA
  Search() {
    this.LoadLanKiemKeKetXuat();
  }
  
  LoadLanKiemKeKetXuat() {
    this.loading_grid_lan_ket_nhap = true;
    this.loading_search = true;

    let now: Date = new Date();
    this.objFilter.tu_ngay = formatDate(this.dateTuNgay ? this.dateTuNgay : new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0), "yyyy-MM-ddTHH:mm:ss", "En-en");
    this.objFilter.den_ngay = formatDate(this.dateDenNgay ? this.dateDenNgay : new Date(now.getFullYear(), now.getMonth(), now.getDate(), 59, 59), "yyyy-MM-ddTHH:mm:ss", "En-en");

    this._baocaoService.GetListLanKiemKeKetNhap(this.objFilter.tu_ngay, this.objFilter.den_ngay, this.objFilter.id_don_vi_goc || 0).pipe(first()).subscribe(
      {
        next: (data) => {
          this.ListLanKiemKe = data;
          this.SelectionLanKetNhap = data.length ? data[0] : new ComboboxViewModel();
          this.LoadData(this.SelectionLanKetNhap.ID || 0);
          this.loading_grid_lan_ket_nhap = false;
          this.loading_search = false;
        },
        error: (error) => {
          this.ListLanKiemKe = [];
          this.loading_grid_lan_ket_nhap = false;
          this.loading_search = false;
        }
      }
    )
  }

  private cancelCallAPI$ = new Subject<void>();

  LoadData(id_kiemke_ket_nhap: number) {
    let apiCall: Observable<any[]> = undefined;

    switch (this.action) {
      case ACTION.KET_NHAP: apiCall = this._baocaoService.GetListBaoCaoKiemKeKetNhapByIdKiemKe(id_kiemke_ket_nhap); break;
      case ACTION.KET_NHAP_QRCODE: apiCall = this._baocaoService.GetListBaoCaoKiemKeKetNhapQrCodeByIdKiemKe(id_kiemke_ket_nhap); break;
      case ACTION.KET_NHAP_TAI_SAN: apiCall = this._baocaoService.GetListBaoCaoKiemKeKetNhapTaiSanByIdKiemKe(id_kiemke_ket_nhap); break;
      case ACTION.KET_NHAP_TAI_SAN_KIEM_KE: apiCall = this._baocaoService.GetListBaoCaoKiemKeKetNhapTaiSanKiemKeByIdKiemKe(id_kiemke_ket_nhap); break;
      default: return this._commonService.showInfo("Không có dữ liệu!");
    }

    this.cancelCallAPI$.next();
    this.loading_grid_detail = true;
    this.loading_search = true;
    this.ListData = [];

    return apiCall.pipe(
      first(),
      takeUntil(this.cancelCallAPI$),
      switchMap((data) => {
        this.ListData = data.length ? data : [];
        if (!data.length) this._commonService.showInfo("Không có dữ liệu!");
        return of(data);
      }),
      catchError((error) => {
        this._commonService.showError();
        this.loading_grid_detail = false;
        this.loading_search = false;
        return throwError(new Error("Internal server error"));
      }),
      finalize(() => {
        this.loading_grid_detail = false;
        this.loading_search = false;
      })
    ).subscribe();
  }
  //#endregion

  //#region OnChange
  onActiveItemChange(event) {
    this.action = event.action
    this.LoadData(this.SelectionLanKetNhap.ID || 0);
  }

  public onRowSelect(event) {
    this.SelectionLanKetNhap = event.data;
    this.LoadData(this.SelectionLanKetNhap.ID || 0);
  }

  loadCombox() {
    this.comboboxService.getListDonVi('Cha').pipe(first()).subscribe(
      {
        next: (data) => {
          this.comboboxDonVi = data;
        },
        error: (error) => {
          this.comboboxDonVi = [];
        }
      }
    );
  }

  initDate() {
    let now = new Date();
    this.dateTuNgay = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate(), 0, 0);
    this.dateDenNgay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59);
  }

  onInputFromDateType(event: any) {
    this.minDate = this.dateTuNgay ? this.dateTuNgay : new Date();
  };

  onFromDateChange(event: any) {
    this.minDate = this.dateTuNgay ? this.dateTuNgay : new Date();
  };

  onInputToDateType(event: any) {
    this.maxDate = this.dateDenNgay ? this.dateDenNgay : new Date();
  };

  onToDateChange(event: any) {
    this.maxDate = this.dateDenNgay ? this.dateDenNgay : new Date();
  };


  xuatExcel() {
  }
}
