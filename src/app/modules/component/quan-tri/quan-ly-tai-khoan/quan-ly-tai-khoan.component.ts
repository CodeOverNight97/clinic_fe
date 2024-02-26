import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs';
import { ComboboxViewModel } from 'src/app/modules/models/common/combobox-view-model';
import { TaiKhoanViewModel } from 'src/app/modules/models/quan-tri/tai-khoan-view-model';
import { ComboboxService } from 'src/app/modules/service/combobox.service';
import { CommonService } from 'src/app/modules/service/common.service';
import { QuanTriService } from 'src/app/modules/service/quan-tri.service';

@Component({
  selector: 'app-quan-ly-tai-khoan',
  templateUrl: './quan-ly-tai-khoan.component.html',
  styleUrls: ['./quan-ly-tai-khoan.component.scss']
})
export class QuanLyTaiKhoanComponent implements OnInit {
  constructor(
    private quanTriService: QuanTriService,
    private commonService: CommonService,
    private comboboxService: ComboboxService) { }

  LABEL_HEADER_DIAGLOG: string = '';
  select_ten_tai_khoan: string = ''
  select_loai_tai_khoan: string = ''
  select_don_vi: number = 0
  loading: boolean = false
  loading_excel: boolean = false
  isOpenThemTaiKhoan: boolean = false
  regexptdn = /^[a-zA-Z0-9_]+$/;
  typeTaiKhoan: number = 0
  ojb_TaiKhoan: TaiKhoanViewModel = new TaiKhoanViewModel()
  loading_taikhoan: boolean = false
  listLoaiTaiKhoan: ComboboxViewModel[] = [
    { ID: 'ADMIN', Value: 'ADMIN' },
    { ID: 'APP', Value: 'APP' },
    { ID: 'WEB', Value: 'WEB' },
    { ID: 'WEB_APP', Value: 'WEB APP' },
  ]

  listDonVi: ComboboxViewModel[] = []
  data_CallAPI: any[] = []
  cols_List_CallAPI: any[] = [
    { field: 'TacVu', header: 'Tác vụ', width: '100px', align: 'center' },
    { field: 'STT', header: 'STT', width: '50px', align: 'left' },
    { field: 'ten_dang_nhap', header: 'Tên đăng nhập', width: '150px', align: 'left' },
    { field: 'ten_day_du', header: 'Tên đầy đủ', width: '250px', align: 'left' },
    // { field: 'loai_tai_khoan', header: 'Loại tài khoản', width: '150px', align: 'center' },
    // { field: 'ten_don_vi_goc', header: 'Đơn vị gốc', width: '270px', align: 'left' },
    { field: 'ten_don_vi', header: 'Đơn vị', width: '270px', align: 'left' },
  ]
  ngOnInit(): void {
    this.loadData()
    this.loadCombox()
  }

  loadData() {
    this.select_loai_tai_khoan = this.select_loai_tai_khoan ? this.select_loai_tai_khoan : ''
    this.select_ten_tai_khoan = this.select_ten_tai_khoan ? this.select_ten_tai_khoan : ''
    // this.select_don_vi = this.select_don_vi ? this.select_don_vi : 0
    this.loading = true
    this.data_CallAPI = []
    this.quanTriService.getListTaiKhoan(this.select_ten_tai_khoan, this.select_loai_tai_khoan, this.select_don_vi || 0).pipe(first()).subscribe(
      (data) => {
        this.loading = false
        this.data_CallAPI = data
      },
      (error) => {
        this.commonService.showError()
        this.loading = false
      }
    )
  }

  loadCombox() {
    this.comboboxService.getListDonVi('Cha').pipe(first()).subscribe((data) => {
      this.listDonVi = data
    }, (error) => {
      this.listDonVi = []
    })
  }

  XuatExcel() {
    if (this.data_CallAPI.length == 0) {
      this.commonService.showWarn('Không có dữ liệu!')
    }
    else {
      this.select_loai_tai_khoan = this.select_loai_tai_khoan ? this.select_loai_tai_khoan : ''
      this.select_ten_tai_khoan = this.select_ten_tai_khoan ? this.select_ten_tai_khoan : ''
      // this.select_don_vi = this.select_don_vi ? this.select_don_vi : 0
      this.loading_excel = true
      this.quanTriService.getListTaiKhoanExcel(this.select_ten_tai_khoan, this.select_loai_tai_khoan, this.select_don_vi || 0).pipe(first()).subscribe(
        (data) => {
          this.commonService.downloadFile('Danh sách tài khoản_', data, '.xls');
          setTimeout(() => {
            this.loading_excel = false;
          }, 350)
        }, (error) => {
          console.log('ee', error)
          console.log("Export excel báo cáo fail", error);
          this.commonService.showError('Đã có lỗi xảy ra.Vui lòng thử lại trong giây lát');
          this.loading_excel = false;
        }
      )
    }
  }

  khoaMoTaiKhoan(ten_dang_nhap: string, khoa: boolean) {
    this.quanTriService.khoaMoKhoaTaiKhoan(ten_dang_nhap, khoa).pipe(first()).subscribe(
      (data) => {
        if (data.flag) {
          this.loadData();
          this.commonService.showSuccess(data.msg)
        }
        else {
          this.commonService.showSuccess(data.msg)
        }
      }, (erroe) => {
        this.commonService.showError();
      }
    )
  }

  openThemTaiKhoan() {
    this.LABEL_HEADER_DIAGLOG = 'Thêm mới tài khoản'
    this.typeTaiKhoan = 1
    this.isOpenThemTaiKhoan = true
    this.ojb_TaiKhoan = new TaiKhoanViewModel();
    this.ojb_TaiKhoan.loai_tai_khoan = 'APP'
  }

  openSuaTaiKhoan(row: TaiKhoanViewModel) {
    this.LABEL_HEADER_DIAGLOG = 'Cập nhật tài khoản'
    this.typeTaiKhoan = 2
    this.isOpenThemTaiKhoan = true
    this.ojb_TaiKhoan = row;
  }

  validateTaiKhoan() {
    if (!this.ojb_TaiKhoan.ten_day_du || this.ojb_TaiKhoan.ten_day_du.length == 0) {
      document.getElementById('ten_day_du')?.focus();
      this.commonService.showWarn('Tên đầy đủ không được để trống!')
      return false;
    }

    if (!this.ojb_TaiKhoan.ten_dang_nhap || this.ojb_TaiKhoan.ten_dang_nhap.length == 0) {
      document.getElementById('ten_dang_nhap')?.focus();
      this.commonService.showWarn('Tên đăng nhập không được để trống!')
      return false;
    }

    if (!this.regexptdn.test(this.ojb_TaiKhoan.ten_dang_nhap)) {
      document.getElementById('ten_dang_nhap')?.focus();
      this.commonService.showWarn('Tên đăng nhập không được chứa ký tự đặc biệt!')
      return false;
    }

    if (this.typeTaiKhoan == 1 && (!this.ojb_TaiKhoan.mat_khau || this.ojb_TaiKhoan.mat_khau.length == 0)) {
      document.getElementById('mat_khau')?.focus();
      this.commonService.showWarn('Mật khẩu không được để trống!')
      return false;
    }

    if (!this.ojb_TaiKhoan.loai_tai_khoan || this.ojb_TaiKhoan.loai_tai_khoan == '') {
      document.getElementById('combobox_loai_tai_khoan')?.focus();
      this.commonService.showWarn('Loại tài khoản không được để trống!')
      return false;
    }

    if (!this.ojb_TaiKhoan.id_don_vi || this.ojb_TaiKhoan.id_don_vi == 0) {
      document.getElementById('combobox_id_don_vi')?.focus();
      this.commonService.showWarn('Đơn vị không được để trống!')
      return false;
    }

    return true;
  }

  themTaiKhoan() {
    if (this.validateTaiKhoan()) {
      this.loading_taikhoan = true;
      if(this.typeTaiKhoan == 1) {
        this.quanTriService.themTaiKhoan(this.ojb_TaiKhoan).pipe(first()).subscribe(
          {
            next: (data) => {
              if(data.flag){
                this.commonService.showSuccess(data.msg);
                this.loadData();
                this.isOpenThemTaiKhoan = false;
              }
              else
                this.commonService.showWarn(data.msg);
            },
            error: (error) => {
              this.commonService.showError();
              this.loading_taikhoan = false;
            },
            complete: () => {
              this.loading_taikhoan = false;
            }
          }
        )
      }else {
        this.quanTriService.capNhatTaiKhoan(this.ojb_TaiKhoan).pipe(first()).subscribe(
          {
            next: (data) => {
              if(data.flag){
                this.commonService.showSuccess(data.msg);
                this.loadData();
                this.isOpenThemTaiKhoan = false;
              }
              else
                this.commonService.showWarn(data.msg);
            },
            error: (error) => {
              this.commonService.showError();
              this.loading_taikhoan = false;
            },
            complete: () => {
              this.loading_taikhoan = false;
            }
          }
        )
      }
    }
  }
}
