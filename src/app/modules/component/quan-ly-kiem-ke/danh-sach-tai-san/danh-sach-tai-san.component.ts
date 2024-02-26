import { formatDate } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { first, forkJoin } from 'rxjs';
import { ComboboxViewModel } from 'src/app/modules/models/common/combobox-view-model';
import { TaiSanFilterViewModel } from 'src/app/modules/models/quan-ly-kiem-ke/tai-san-filter-view-model';
import { TaiSanKiemKeViewModel } from 'src/app/modules/models/quan-ly-kiem-ke/tai-san-kiem-ke-view-model';
import { TaiSanViewModel } from 'src/app/modules/models/quan-ly-kiem-ke/tai-san-view-model';
import { ComboboxService } from 'src/app/modules/service/combobox.service';
import { CommonService } from 'src/app/modules/service/common.service';
import { QuanLyKiemKeService } from 'src/app/modules/service/quan-ly-kiem-ke.service';

@Component({
  selector: 'app-bao-cao-chi-tiet-qr-code',
  templateUrl: './danh-sach-tai-san.component.html',
  styleUrls: ['./danh-sach-tai-san.scss']
})
export class DanhSachTaiSanComponent implements OnInit {
  constructor(
    private quanLyKiemKeService: QuanLyKiemKeService,
    private commonService: CommonService,
    private comboboxService: ComboboxService) { }

  @ViewChild('data_report') data_report: any;

  cols_List_CallAPI: any[] = [
    { field: 'TacVu', header: 'Tác vụ', width: '70px', align: 'left' },
    { field: 'STT', header: 'STT', width: '50px', align: 'left' },
    { field: 'trang_thai', header: 'Trạng thái', width: '100px', align: 'left' },
    { field: 'ma_tai_san', header: 'Mã tài sản', width: '110px', align: 'center' },
    { field: 'ten_tai_san', header: 'Tên tài sản', width: '250px', align: 'left' },
    { field: 'ma_loai_tai_san', header: 'Mã loại tài sản', width: '110px', align: 'center' },
    { field: 'ten_loai_tai_san', header: 'Tên loại tài sản', width: '250px', align: 'left' },
    { field: 'nam_su_dung', header: 'Năm sử dụng', width: '110px', align: 'center' },
    { field: 'thong_so_ky_thuat', header: 'Thông số kỹ thuật', width: '200px', align: 'left' },
    { field: 'ten_don_vi_goc', header: 'Đơn vị gốc', width: '260px', align: 'left' },
    { field: 'ten_don_vi_quan_ly', header: 'Đơn vị quản lý', width: '260px', align: 'left' },
    { field: 'nguyen_gia_tong_tien', header: 'Nguyên giá tổng tiền', width: '150px', align: 'left' },
    { field: 'nguyen_gia_ngan_sach', header: 'Nguyên giá ngân sách', width: '150px', align: 'left' },
    { field: 'nguyen_gia_nguon_khac', header: 'Nguyên giá nguồn khác', width: '150px', align: 'left' },
    { field: 'gia_tri_con_lai', header: 'Giá trị còn lại', width: '150px', align: 'left' },
    { field: 'ghi_chu', header: 'Ghi chú', width: '250px', align: 'left' },
    { field: 'qrcode', header: 'QRCode', width: '210px', align: 'left' },
    { field: 'qrcode_ngay_cap', header: 'Ngày cấp QRCode', width: '150px', align: 'center' },
    { field: 'qrcode_nguoi_cap', header: 'Người cấp QRCode', width: '200px', align: 'left' },
    { field: 'kiem_ke_ngay', header: 'Ngày kiểm kê', width: '150px', align: 'center' },
    { field: 'kiem_ke_nguoi', header: 'Người kiểm kê', width: '200px', align: 'left' },
    { field: 'kiem_ke_noi_dung', header: 'Nội dung kiểm kê', width: '250px', align: 'left' },
  ]

  data_CallAPI: TaiSanViewModel[] = []
  taiSanFilter: TaiSanFilterViewModel = new TaiSanFilterViewModel()

  ngay_cap_qr_code_tu: Date = undefined
  ngay_cap_qr_code_den: Date = undefined
  ngay_kiem_ke_tu: Date = undefined
  ngay_kiem_ke_den: Date = undefined

  row_DataTaiSan: TaiSanViewModel = new TaiSanViewModel();
  taiSanKiemKe: TaiSanKiemKeViewModel[] = [];
  total_data: number = 0

  listLoaiTaiSan: ComboboxViewModel[] = []
  listDonVi: ComboboxViewModel[] = []
  listTrangThai: ComboboxViewModel[] = [
    { ID: 'DAGAN', Value: 'Đã gán' },
    { ID: 'CHUAGAN', Value: 'Chưa gán' }
  ]
  ngOnInit(): void {
    this.LoadCombobox();
    this.taiSanFilter = new TaiSanFilterViewModel();
    this.loadData();
  }

  isOpenLoadNangCao: boolean = false
  isChiTietTaiSan: boolean = false
  loading: boolean = false
  loading_excel: boolean = false

  loadData() {
    if (this.data_report)
      this.data_report.clear();

    this.data_report.first = 0;

    this.loading = true;
    this.total_data = 0
    this.data_CallAPI = []
    this.quanLyKiemKeService.getListTaiSan(this.taiSanFilter).pipe(first()).subscribe((data) => {
      this.loading = false
      if (data.length == 0) {
        this.total_data = 0
        if (!this.taiSanFilter.id_don_vi)
          this.taiSanFilter.id_don_vi = undefined
      }
      else {
        this.data_CallAPI = data
        this.total_data = this.data_CallAPI[0].total ? this.data_CallAPI[0].total : 0
        if (!this.taiSanFilter.id_don_vi)
          this.taiSanFilter.id_don_vi = undefined
        console.log(this.total_data)
      }
    }, (error) => {
      if (!this.taiSanFilter.id_don_vi)
        this.taiSanFilter.id_don_vi = undefined
      this.loading = false
      this.data_CallAPI = []
      this.commonService.showError('Đã xảy ra lỗi. Vui lòng thử lại sau!')
    })
  }

  validate() {
    if (this.taiSanFilter.tong_tien_den < this.taiSanFilter.tong_tien_tu) {
      document.getElementById('tong_tien_den')?.focus();
      this.commonService.showWarn('Nguyên giá tổng tiền đến cần lớn hơn nguyên giá tổng tiền từ!');
      return false;
    }

    if (this.taiSanFilter.ngan_sach_den < this.taiSanFilter.ngan_sach_tu) {
      document.getElementById('ngan_sach_den')?.focus();
      this.commonService.showWarn('Nguyên giá ngân sách đến cần lớn hơn nguyên giá ngân sách từ!');
      return false;
    }

    if (this.taiSanFilter.nguon_khac_den < this.taiSanFilter.nguon_khac_tu) {
      document.getElementById('nguon_khac_den')?.focus();
      this.commonService.showWarn('Nguyên giá nguồn khác đến cần lớn hơn nguyên giá từ!');
      return false;
    }

    if (this.taiSanFilter.gia_tri_con_lai_den < this.taiSanFilter.gia_tri_con_lai_tu) {
      document.getElementById('gia_tri_con_lai_den')?.focus();
      this.commonService.showWarn('Giá trị còn lại đến cần lớn hơn giá trị còn lại từ!');
      return false;
    }

    if (!this.ngay_cap_qr_code_tu && this.ngay_cap_qr_code_den) {
      document.getElementById('ngay_cap_qr_code_tu')?.focus();
      this.commonService.showWarn('Ngày cấp QRCode từ không được để trống!');
      return false;
    }

    if (this.ngay_cap_qr_code_tu && !this.ngay_cap_qr_code_den) {
      document.getElementById('ngay_cap_qr_code_den')?.focus();
      this.commonService.showWarn('Ngày cấp QRCode đến không được để trống!');
      return false;
    }

    if (this.ngay_cap_qr_code_den && this.ngay_cap_qr_code_tu && (this.ngay_cap_qr_code_tu > this.ngay_cap_qr_code_den)) {
      document.getElementById('ngay_cap_qr_code_den')?.focus();
      this.commonService.showWarn('Ngày cấp QRCode đến không được nhỏ hơn ngày cấp QRCode từ!');
      return false;
    }

    if (!this.ngay_kiem_ke_tu && this.ngay_kiem_ke_den) {
      document.getElementById('ngay_kiem_ke_tu')?.focus();
      this.commonService.showWarn('Ngày kiểm kê từ không được để trống!');
      return false;
    }

    if (this.ngay_kiem_ke_tu && !this.ngay_kiem_ke_den) {
      document.getElementById('ngay_kiem_ke_den')?.focus();
      this.commonService.showWarn('Ngày kiểm kê đến không được để trống!');
      return false;
    }

    if (this.ngay_kiem_ke_tu && this.ngay_kiem_ke_den && (this.ngay_kiem_ke_tu > this.ngay_kiem_ke_den)) {
      document.getElementById('ngay_cap_qr_code_den')?.focus();
      this.commonService.showWarn('Ngày kiểm kê đến không được nhỏ hơn ngày kiểm kê từ!');
      return false;
    }

    return true;
  }

  timKiemNangCao() {
    if (this.validate()) {
      if (this.data_report)
        this.data_report.clear();
      this.data_report.first = 0;

      this.total_data = 0
      this.data_CallAPI = []
      this.taiSanFilter.ngay_cap_qr_tu = this.ngay_cap_qr_code_tu ? formatDate(this.ngay_cap_qr_code_tu, "yyyy-MM-ddTHH:mm:ss", "En-en") : '1900-01-01T00:00:00';
      this.taiSanFilter.ngay_cap_qr_den = this.ngay_cap_qr_code_den ? formatDate(this.ngay_cap_qr_code_den, "yyyy-MM-ddTHH:mm:ss", "En-en") : '1900-01-01T00:00:00';
      this.taiSanFilter.ngay_kiem_ke_tu = this.ngay_kiem_ke_tu ? formatDate(this.ngay_kiem_ke_tu, "yyyy-MM-ddTHH:mm:ss", "En-en") : '1900-01-01T00:00:00';
      this.taiSanFilter.ngay_kiem_ke_den = this.ngay_kiem_ke_den ? formatDate(this.ngay_kiem_ke_den, "yyyy-MM-ddTHH:mm:ss", "En-en") : '1900-01-01T00:00:00';
      this.taiSanFilter.take = 50;
      this.taiSanFilter.skip = 0
      this.loading = true

      this.quanLyKiemKeService.getListTaiSan(this.taiSanFilter).pipe(first()).subscribe((data) => {
        this.loading = false
        this.isOpenLoadNangCao = false
        if (data.length == 0) {
          this.total_data = 0
          if (!this.taiSanFilter.id_don_vi)
            this.taiSanFilter.id_don_vi = undefined
        }
        else {
          this.data_CallAPI = data
          this.total_data = this.data_CallAPI[0].total ? this.data_CallAPI[0].total : 0
          if (!this.taiSanFilter.id_don_vi)
            this.taiSanFilter.id_don_vi = undefined
        }
      }, (error) => {
        this.loading = false
        this.data_CallAPI = []
        this.commonService.showError('Đã xảy ra lỗi. Vui lòng thử lại sau!')
      })
    }
  }

  loadGridChange(event: any) {
    this.loading = true
    this.taiSanFilter.take = 50;
    this.taiSanFilter.skip = event.first ? event.first : 0
    this.data_CallAPI = []
    this.quanLyKiemKeService.getListTaiSan(this.taiSanFilter).pipe(first()).subscribe((data) => {
      this.loading = false
      if (data.length == 0) {
        if (!this.taiSanFilter.id_don_vi)
          this.taiSanFilter.id_don_vi = undefined
      }
      else {
        this.data_CallAPI = data
        if (!this.taiSanFilter.id_don_vi)
          this.taiSanFilter.id_don_vi = undefined
      }
    }, (error) => {
      this.loading = false
      this.data_CallAPI = []
      this.commonService.showError('Đã xảy ra lỗi. Vui lòng thử lại sau!')
    })
  }

  XuatExcel() {
    if (this.data_CallAPI.length == 0) {
      this.commonService.showWarn('Không có dữ liệu!');
    }
    else {
      let ojb: TaiSanFilterViewModel = new TaiSanFilterViewModel()
      ojb.trang_thai = this.taiSanFilter.trang_thai ? this.taiSanFilter.trang_thai : '';
      ojb.ma_tai_san = this.taiSanFilter.ma_tai_san ? this.taiSanFilter.ma_tai_san : '';
      ojb.ten_tai_san = this.taiSanFilter.ten_tai_san ? this.taiSanFilter.ten_tai_san : '';
      ojb.ma_loai_tai_san = this.taiSanFilter.ma_loai_tai_san ? this.taiSanFilter.ma_loai_tai_san : '';
      ojb.nam_su_dung = this.taiSanFilter.nam_su_dung ? this.taiSanFilter.nam_su_dung : '';
      ojb.thong_so_ky_thuat = this.taiSanFilter.thong_so_ky_thuat ? this.taiSanFilter.thong_so_ky_thuat : '';
      ojb.id_don_vi = this.taiSanFilter.id_don_vi ? this.taiSanFilter.id_don_vi : 0;
      ojb.ten_don_vi_quan_ly = this.taiSanFilter.ten_don_vi_quan_ly ? this.taiSanFilter.ten_don_vi_quan_ly : '';
      ojb.tong_tien_tu = this.taiSanFilter.tong_tien_tu ? this.taiSanFilter.tong_tien_tu : 0;
      ojb.tong_tien_den = this.taiSanFilter.tong_tien_den ? this.taiSanFilter.tong_tien_den : 0;
      ojb.ngan_sach_tu = this.taiSanFilter.ngan_sach_tu ? this.taiSanFilter.ngan_sach_tu : 0;
      ojb.ngan_sach_den = this.taiSanFilter.ngan_sach_den ? this.taiSanFilter.ngan_sach_den : 0;
      ojb.nguon_khac_tu = this.taiSanFilter.nguon_khac_tu ? this.taiSanFilter.nguon_khac_tu : 0;
      ojb.nguon_khac_den = this.taiSanFilter.nguon_khac_den ? this.taiSanFilter.nguon_khac_den : 0;
      ojb.gia_tri_con_lai_tu = this.taiSanFilter.gia_tri_con_lai_tu ? this.taiSanFilter.gia_tri_con_lai_tu : 0;
      ojb.gia_tri_con_lai_den = this.taiSanFilter.gia_tri_con_lai_den ? this.taiSanFilter.gia_tri_con_lai_den : 0;
      ojb.ghi_chu = this.taiSanFilter.ghi_chu ? this.taiSanFilter.ghi_chu : '';
      ojb.qr_code = this.taiSanFilter.qr_code ? this.taiSanFilter.qr_code : '';
      ojb.ngay_cap_qr_tu = this.ngay_cap_qr_code_tu ? formatDate(this.ngay_cap_qr_code_tu, "yyyy-MM-ddTHH:mm:ss", "En-en") : '1900-01-01T00:00:00';
      ojb.ngay_cap_qr_den = this.ngay_cap_qr_code_den ? formatDate(this.ngay_cap_qr_code_den, "yyyy-MM-ddTHH:mm:ss", "En-en") : '1900-01-01T00:00:00';
      ojb.nguoi_cap_qr = this.taiSanFilter.nguoi_cap_qr ? this.taiSanFilter.nguoi_cap_qr : '';
      ojb.ngay_kiem_ke_tu = this.ngay_kiem_ke_tu ? formatDate(this.ngay_kiem_ke_tu, "yyyy-MM-ddTHH:mm:ss", "En-en") : '1900-01-01T00:00:00';
      ojb.ngay_kiem_ke_den = this.ngay_kiem_ke_den ? formatDate(this.ngay_kiem_ke_den, "yyyy-MM-ddTHH:mm:ss", "En-en") : '1900-01-01T00:00:00';
      ojb.nguoi_kiem_ke = this.taiSanFilter.nguoi_kiem_ke ? this.taiSanFilter.nguoi_kiem_ke : '';
      ojb.noi_dung_kiem_ke = this.taiSanFilter.noi_dung_kiem_ke ? this.taiSanFilter.noi_dung_kiem_ke : '';

      this.loading_excel = true;
      this.quanLyKiemKeService.getListTaiSanExcel(ojb).pipe(first()).subscribe((data) => {
        this.commonService.downloadFile('Danh sách tài sản_', data, '.xls');
        setTimeout(() => {
          this.loading_excel = false;
        }, 350)
      }, (error) => {
        console.log("Export excel báo cáo fail", error);
        this.commonService.showError('Đã có lỗi xảy ra.Vui lòng thử lại trong giây lát');
        this.loading_excel = false;
      });
    }
  }

  LoadCombobox() {
    let apiCalls = [
      this.comboboxService.getListLoaiTaiSan(),
      this.comboboxService.getListDonVi('GOC')
    ];
    this.listLoaiTaiSan = [];
    this.listDonVi = [];

    forkJoin(apiCalls)
      .pipe(first())
      .subscribe(
        ([loaitaisan, donvi]) => {
          this.listLoaiTaiSan = loaitaisan;
          this.listDonVi = donvi;
        },
        error => {
        }
      );
  }

  xemChiTietTaiSan(row: TaiSanViewModel) {
    this.quanLyKiemKeService.getListTaiSanKiemKe(row.ma_tai_san).pipe(first()).subscribe(
      (data) => {
        this.taiSanKiemKe = data;
        this.row_DataTaiSan = row;
        this.isChiTietTaiSan = true
      }, (error) => {
        this.commonService.showError('Đã xảy ra lỗi. Vui lòng thử lại sau!')
      }
    )
  }

}
