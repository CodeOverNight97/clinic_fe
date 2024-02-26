import { ChangeDetectionStrategy, Component, inject, type OnInit } from '@angular/core';
import { BaoCaoChiTietTaiSanFilterModel } from 'src/app/modules/models/bao-cao/baocao-chitiet-taisan-filter-model';
import { BaoCaoChiTietTaiSanViewModel } from 'src/app/modules/models/bao-cao/baocao-chitiet-taisan-view-model';
import { catchError, finalize, first, map, Observable, of, Subject, switchMap, takeUntil, throwError } from 'rxjs';
import { CommonService } from 'src/app/modules/service/common.service';
import { ComboboxService } from 'src/app/modules/service/combobox.service';
import { BaoCaoKetXuatDuLieuService } from './bao-cao-ket-xuat-du-lieu.service';
import { ComboboxViewModel } from 'src/app/modules/models/common/combobox-view-model';
import { environment } from 'src/environments/environment';
import { BaoCaoKetNhapKiemKeFilterModel } from 'src/app/modules/models/bao-cao/bao-cao-ket-nhap-kiem-ke-filter-model';
import { formatDate } from '@angular/common';

enum ACTION {
  KET_XUAT,
  KET_XUAT_DON_VI,
  KET_XUAT_LOAI_TAI_SAN,
  KET_XUAT_QRCODE,
  KET_XUAT_TAI_KHOAN,
  KET_XUAT_TAISAN,
  KET_XUAT_TAI_SAN_KIEM_KE
}

@Component({
  selector: 'app-bao-cao-ket-xuat-du-lieu',
  templateUrl: './bao-cao-ket-xuat-du-lieu.component.html',
  styleUrls: ['./bao-cao-ket-xuat-du-lieu.component.scss']
})
export class BaoCaoKetXuatDuLieuComponent implements OnInit {
  constructor(
    private _baocaoService: BaoCaoKetXuatDuLieuService,
    private _commonService: CommonService,
    private comboboxService: ComboboxService,
  ) { }

  dateTuNgay?: Date;
  dateDenNgay?: Date;
  maxDate: Date = this.dateDenNgay ? this.dateDenNgay : new Date();
  minDate: Date = this.dateTuNgay ? this.dateTuNgay : new Date();

  action: number = 0;
  loading_grid_lan_ket_xuat: boolean = false;
  loading_grid_detail: boolean = false;
  loading_export_excel: boolean = false;
  ListLanKiemKe: ComboboxViewModel[] = [];
  objFilter: BaoCaoKetNhapKiemKeFilterModel = new BaoCaoKetNhapKiemKeFilterModel();
  SelectionLanKiemKe: ComboboxViewModel = new ComboboxViewModel();
  ListData: any[] = [];

  items: any[] = [
    { label: 'Kết xuất', action: ACTION.KET_XUAT },
    { label: 'Kết xuất đơn vị', action: ACTION.KET_XUAT_DON_VI },
    { label: 'Kết xuất loại tài sản', action: ACTION.KET_XUAT_LOAI_TAI_SAN },
    { label: 'Kết xuất QrCode', action: ACTION.KET_XUAT_QRCODE },
    { label: 'Kết xuất tài khoản', action: ACTION.KET_XUAT_TAI_KHOAN },
    { label: 'Kết xuất tài sản', action: ACTION.KET_XUAT_TAISAN },
    { label: 'Kết xuất tài sản kiểm kê', action: ACTION.KET_XUAT_TAI_SAN_KIEM_KE },
  ];
  activeItem: any = this.items[0];

  cols_lan_ket_xuat: any[] = [
    { field: 'Task', header: 'Tác vụ', width: '50px', align: 'center' },
    { field: 'Value', header: 'Lần/Đơn vị', width: '250px', align: 'left' },
  ];

  cols_ket_xuat: any[] = [
    { field: 'STT', header: 'STT', width: '50px', align: 'center' },
    { field: 'ten_don_vi', header: 'Tên đơn vị', width: '200px', align: 'left' },
    { field: 'url', header: 'URL', width: '200px', align: 'left' },
    { field: 'created_by', header: 'Người kết xuất', width: '100px', align: 'center' },
    { field: 'created_date', header: 'Ngày kết xuất', width: '100px', align: 'center' },
  ];

  cols_ket_xuat_don_vi: any[] = [
    { field: 'STT', header: 'STT', width: '50px', align: 'center' },
    { field: 'ten_don_vi', header: 'Tên đơn vị', width: '300px', align: 'left' },
    { field: 'created_by', header: 'Người kết xuất', width: '100px', align: 'center' },
    { field: 'created_date', header: 'Ngày kết xuất', width: '100px', align: 'center' },
  ];
  cols_ket_xuat_loai_tai_san: any[] = [
    { field: 'STT', header: 'STT', width: '50px', align: 'center' },
    { field: 'ma_loai_tai_san', header: 'Mã loại tài sản', width: '100px', align: 'center' },
    { field: 'ten_loai_tai_san', header: 'Tên loại tài sản', width: '300px', align: 'left' },
    { field: 'created_by', header: 'Người kết xuất', width: '100px', align: 'center' },
    { field: 'created_date', header: 'Ngày kết xuất', width: '100px', align: 'center' },
  ];
  cols_ket_qr_code: any[] = [
    { field: 'STT', header: 'STT', width: '50px', align: 'center' },
    { field: 'qrcode', header: 'QrCode', width: '100px', align: 'center' },
    { field: 'ma_tai_san', header: 'Mã tài sản', width: '100px', align: 'center' },
    { field: 'ten_tai_san', header: 'Tên tài sản', width: '200px', align: 'left' },
    { field: 'url', header: 'URL', width: '100px', align: 'left' },
    { field: 'trang_thai', header: 'Trạng thái', width: '100px', align: 'center' },
    { field: 'noi_dung', header: 'Nội dung', width: '250px', align: 'left' },
    { field: 'created_by', header: 'Người kết xuất', width: '100px', align: 'center' },
    { field: 'created_date', header: 'Ngày kết xuất', width: '100px', align: 'center' },
  ];
  cols_ket_tai_khoan: any[] = [
    { field: 'STT', header: 'STT', width: '50px', align: 'center' },
    { field: 'ten_dang_nhap', header: 'Tên đăng nhập', width: '200px', align: 'center' },
    { field: 'created_by', header: 'Người kết xuất', width: '100px', align: 'center' },
    { field: 'created_date', header: 'Ngày kết xuất', width: '100px', align: 'center' },
  ];
  cols_ket_tai_san: any[] = [
    { field: 'STT', header: 'STT', width: '50px', align: 'center' },
    { field: 'ma_tai_san', header: 'Mã tài sản', width: '100px', align: 'center' },
    { field: 'ten_tai_san', header: 'Tên tài sản', width: '200px', align: 'left' },
    { field: 'ma_loai_tai_san', header: 'Mã loại tài sản', width: '100px', align: 'center' },
    { field: 'ten_loai_tai_san', header: 'Tên loại tài sản', width: '200px', align: 'left' },
    { field: 'nam_su_dung', header: 'Năm sử dụng', width: '70px', align: 'center' },
    { field: 'thong_so_ky_thuat', header: 'Thông số kỹ thuật', width: '200px', align: 'left' },
    { field: 'don_vi_goc', header: 'Đơn vị gốc', width: '200px', align: 'left' },
    { field: 'ten_don_vi_quan_ly', header: 'Đơn vị quản lý', width: '200px', align: 'left' },
    { field: 'nguyen_gia_tong_tien', header: 'Nguyên giá tổng tiền', width: '150px', align: 'right' },
    { field: 'nguyen_gia_ngan_sach', header: 'Nguyên giá ngân sách', width: '150px', align: 'right' },
    { field: 'nguyen_gia_nguon_khac', header: 'Nguyên giá nguồn khác', width: '150px', align: 'right' },
    { field: 'gia_tri_con_lai', header: 'Giá trị còn lại', width: '150px', align: 'right' },
    { field: 'qrcode', header: 'QrCode', width: '100px', align: 'center' },
    { field: 'qrcode_ngay_cap', header: 'QrCode ngày cấp', width: '150px', align: 'center' },
    { field: 'qrcode_nguoi_cap', header: 'QrCode người cấp', width: '150px', align: 'center' },
    { field: 'kiem_ke_ngay', header: 'Kiểm kê ngày', width: '150px', align: 'center' },
    { field: 'kiem_ke_nguoi', header: 'Kiểm kê người', width: '150px', align: 'center' },
    { field: 'kiem_ke_noi_dung', header: 'Kiểm kê nội dung', width: '250px', align: 'center' },
    { field: 'created_by', header: 'Người kết xuất', width: '100px', align: 'center' },
    { field: 'created_date', header: 'Ngày kết xuất', width: '100px', align: 'center' },
  ];
  cols_ket_tai_san_kiem_ke: any[] = [
    { field: 'STT', header: 'STT', width: '50px', align: 'center' },
    { field: 'ma_tai_san', header: 'Mã tài sản', width: '200px', align: 'center' },
    { field: 'kiem_ke_ngay', header: 'Kiểm kê ngày', width: '200px', align: 'center' },
    { field: 'kiem_ke_nguoi', header: 'Kiểm kê người', width: '200px', align: 'left' },
    { field: 'kiem_ke_noi_dung', header: 'Kiểm kê nội dung', width: '200px', align: 'left' },
    { field: 'created_by', header: 'Người kết xuất', width: '100px', align: 'center' },
    { field: 'created_date', header: 'Ngày kết xuất', width: '100px', align: 'center' },
  ];
  //#endregion

  ngOnInit(): void {
    this.initDate();
    this.loadCombox();
    this.Search();
  }

  //#region LOAD DATA
  Search() {
    this.LoadLanKiemKeKetXuat();
  }

  LoadLanKiemKeKetXuat() {
    this.loading_grid_lan_ket_xuat = true;

    let now: Date = new Date();
    this.objFilter.tu_ngay = formatDate(this.dateTuNgay ? this.dateTuNgay : new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0), "yyyy-MM-ddTHH:mm:ss", "En-en");
    this.objFilter.den_ngay = formatDate(this.dateDenNgay ? this.dateDenNgay : new Date(now.getFullYear(), now.getMonth(), now.getDate(), 59, 59), "yyyy-MM-ddTHH:mm:ss", "En-en");

    this._baocaoService.GetListLanKiemKeKetXuat(this.objFilter.tu_ngay, this.objFilter.den_ngay, this.objFilter.id_don_vi_goc || 0).pipe(first()).subscribe(
      {
        next: (data) => {
          this.ListLanKiemKe = data;
          this.SelectionLanKiemKe = data.length ? data[0] : new ComboboxViewModel();
          if (data.length) this.LoadData(this.SelectionLanKiemKe.ID || 0);
          this.loading_grid_lan_ket_xuat = false;
        },
        error: (error) => {
          this.ListLanKiemKe = [];
          this.loading_grid_lan_ket_xuat = false;
        }
      }
    )
  }

  private cancelCallAPI$ = new Subject<void>();

  LoadData(id_kiem_ke_ket_xuat: number) {
    let apiCall: Observable<any[]> = undefined;

    switch (this.action) {
      case ACTION.KET_XUAT: apiCall = this._baocaoService.LoadDataKetXuat(id_kiem_ke_ket_xuat); break;
      case ACTION.KET_XUAT_DON_VI: apiCall = this._baocaoService.LoadDataKetXuatDonVi(id_kiem_ke_ket_xuat); break;
      case ACTION.KET_XUAT_LOAI_TAI_SAN: apiCall = this._baocaoService.LoadDataKetXuatLoaiTaiSan(id_kiem_ke_ket_xuat); break;
      case ACTION.KET_XUAT_QRCODE: apiCall = this._baocaoService.LoadDataKetXuatQrCode(id_kiem_ke_ket_xuat); break;
      case ACTION.KET_XUAT_TAI_KHOAN: apiCall = this._baocaoService.LoadDataKetXuatTaiKhoan(id_kiem_ke_ket_xuat); break;
      case ACTION.KET_XUAT_TAISAN: apiCall = this._baocaoService.LoadDataKetXuatTaiSan(id_kiem_ke_ket_xuat); break;
      case ACTION.KET_XUAT_TAI_SAN_KIEM_KE: apiCall = this._baocaoService.LoadDataKetXuatTaiSanKiemKe(id_kiem_ke_ket_xuat); break;
      default: return this._commonService.showInfo("Không có dữ liệu!");
    }

    this.cancelCallAPI$.next();
    this.loading_grid_detail = true;
    this.ListData = [];

    return apiCall.pipe(
      first(),
      takeUntil(this.cancelCallAPI$),
      switchMap((data) => {
        this.ListData = data.length ? data.map(x => { return { ...x, url: environment.apiBaseUrl + x.url } }) : [];
        if (!data.length) this._commonService.showInfo("Không có dữ liệu!");
        return of(data); // Trả về observable với dữ liệu đã được xử lý
      }),
      catchError((error) => {
        this._commonService.showError();
        this.loading_grid_detail = false;
        return throwError(new Error("Internal server error"));
      }),
      finalize(() => {
        this.loading_grid_detail = false;
      })
    ).subscribe();
  }
  //#endregion

  //#region OnChange
  onActiveItemChange(event) {
    this.action = event.action
    this.LoadData(this.SelectionLanKiemKe.ID || 0);
  }

  public onRowSelect(event) {
    this.SelectionLanKiemKe = event.data;

    this.LoadData(this.SelectionLanKiemKe.ID || 0);
  }
  //#endregion

  //#region LOAD COMBOBOX
  //#endregion

  //#region FUNC PRIVATE
  //#endregion

  //#region EXPORT 
  XuatExcel() {
    if (this.ListData.length == 0) {
      this._commonService.showInfo('Không có dữ liệu!')
    }
    else {
      this.loading_export_excel = true;
      // this._baocaoService.ExportBaoCaoChiTietTaiSan().pipe(first()).subscribe(
      //   {
      //     next: (data) => {
      //       this._commonService.downloadFile('Báo cáo chi tiết tài sản _ ', data, '.xls');
      //     }, 
      //     error: (error) => {
      //       this._commonService.showError('Đã có lỗi xảy ra.Vui lòng thử lại trong giây lát');
      //       this.loading_export_excel = false;
      //     },
      //     complete: () => {
      //       this.loading_export_excel = false;
      //     }
      //   }
      // )
    }
  }
  //#endregion

  DowloadFile(id_kiem_ke_ket_xuat: number) {
    this._baocaoService.LoadDataKetXuat(id_kiem_ke_ket_xuat).pipe(first()).subscribe(
      {
        next: (data) => {
           const url = data.length ? data[0].url : '';
           this._baocaoService.downloadFile(url).pipe(first()).subscribe(data => {
            if (data.status == 200) {
              const file_name = url.substring(url.lastIndexOf('/') + 1, url.substring(0, url.indexOf(".")).trim());
              const duoi = url.substring(url.lastIndexOf(".")).trim();
              this._commonService.downloadFile(file_name, data, duoi);
              this._commonService.showSuccess('Tải file thành công !');
            }
            else
              this._commonService.showSuccess('Tải file thất bại.Vui lòng thử lại trong giây lát!');
          })
        }
      }
    );
  }

  //#region laod combobox
  comboboxDonVi: ComboboxViewModel[] = [];
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
  //#endregion

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

}