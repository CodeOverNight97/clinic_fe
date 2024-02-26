import { Component, OnInit, ViewChild } from '@angular/core';
import { first, forkJoin } from 'rxjs';
import { CommonService } from 'src/app/modules/service/common.service';
import { ComboboxService } from 'src/app/modules/service/combobox.service';
import { BaoCaoKetNhapKiemKeViewModel } from 'src/app/modules/models/bao-cao/bao-cao-ket-nhap-kiem-ke-view-model';
import { BaoCaoThongKeService } from 'src/app/modules/service/bao-cao-thong-ke.service';
import { ComboboxViewModel } from 'src/app/modules/models/common/combobox-view-model';
import { BaoCaoKetNhapKiemKeFilterModel } from 'src/app/modules/models/bao-cao/bao-cao-ket-nhap-kiem-ke-filter-model';
import { formatDate } from '@angular/common';
import { environment } from 'src/environments/environment';
import { Listbox } from 'primeng/listbox';

@Component({
  selector: 'app-bao-cao-ket-nhap-du-lieu',
  templateUrl: './bao-cao-ket-nhap-du-lieu.component.html',
  styleUrls: ['./bao-cao-ket-nhap-du-lieu.component.scss']
})
export class BaoCaoKetNhapDuLieuComponent {
  constructor(
    private baoCaoThongKeService: BaoCaoThongKeService,
    private commonService: CommonService,
    private comboboxService: ComboboxService
  ) { }
   
   
  comboboxDonVi: ComboboxViewModel[] = [];
  select_donvi: number = 0;
  dateTuNgay?: Date;
  dateDenNgay?: Date;
  maxDate: Date = this.dateDenNgay ? this.dateDenNgay : new Date();
  minDate: Date = this.dateTuNgay ? this.dateTuNgay : new Date();
  @ViewChild('ifr') ifr!: any;

  loading_export_excel: boolean = false;
  loading_search: boolean = false;
  loading_search_chitiet: boolean = false;

  listData: BaoCaoKetNhapKiemKeViewModel[] = [];
  filterCallApi: BaoCaoKetNhapKiemKeFilterModel = new BaoCaoKetNhapKiemKeFilterModel();
  id_qlts_ket_nhap: number = 0

  selectionKetNhapKiemKe: BaoCaoKetNhapKiemKeViewModel = new BaoCaoKetNhapKiemKeViewModel()
  cols: any[] = [
    { field: 'lan', header: 'Lần', width: '300px', align: 'left' },
  ];

  ListDataKetNhap: BaoCaoKetNhapKiemKeViewModel[] = []
  cols_ketnhap = [
    { field: 'stt', header: 'STT', width: '50px', align: 'center' },
    { field: 'ket_nhap', header: 'Kết nhập', width: '80px', align: 'center' },
    { field: 'ten_don_vi_goc', header: 'Tên đơn vị', width: '200px', align: 'left' },
    { field: 'so_luong_don_vi', header: 'Đơn vị kết nhập', width: '5px', align: 'center' },
    { field: 'so_luong_tai_san', header: 'Loại tài sản kết nhập', width: '5px', align: 'center' },
    { field: 'noi_dung', header: 'Nội dung', width: '200px', align: 'center' },
  ]

  listDataChiTietDonVi: any[] = []
  cols_donvi = [
    { field: 'stt', header: 'STT', width: '50px', align: 'center' },
    { field: 'ten_don_vi', header: 'Đơn vị', width: '200px', align: 'left' },
    { field: 'ten_don_vi_goc', header: 'Đơn vị gốc', width: '200px', align: 'left' },
    { field: 'ghi_chu', header: 'Ghi chú', width: '150px', align: 'center' },
    { field: 'created_date', header: 'Ngày thêm', width: '100px', align: 'center' },
    { field: 'created_by', header: 'Người thêm', width: '100px', align: 'center' },
  ]

  listDataChiTietTaiSan: any[] = []
  cols_taisan = [
    { field: 'stt', header: 'STT', width: '50px', align: 'center' },
    { field: 'ma_loai_tai_san', header: 'Mã loại tài sản', width: '80px', align: 'left' },
    { field: 'ten_loai_tai_san', header: 'Tên loại tài sản', width: '200px', align: 'left' },
    { field: 'ma_cha', header: 'Mã cha', width: '80px', align: 'left' },
    { field: 'created_date', header: 'Ngày thêm', width: '100px', align: 'center' },
    { field: 'created_by', header: 'Người thêm', width: '100px', align: 'center' },
  ]


  //#endregion
  ngOnInit(): void {
    this.initDate()
    this.loadCombox();
  }


  onRowSelect(event) {
    this.loading_search_chitiet = true

    this.selectionKetNhapKiemKe = event.data;
    let apiCalls = [
      this.baoCaoThongKeService.getListBaoCaoKetNhapKiemKe_DonVi(this.selectionKetNhapKiemKe.id_qlts_ket_nhap),
      this.baoCaoThongKeService.getListBaoCaoKetNhapKiemKe_LoaiTaiSan(this.selectionKetNhapKiemKe.id_qlts_ket_nhap)
    ];

    this.ListDataKetNhap = []
    this.listDataChiTietDonVi = [];
    this.listDataChiTietTaiSan = [];

    this.ListDataKetNhap.push(this.selectionKetNhapKiemKe);

    forkJoin(apiCalls)
      .pipe(first())
      .subscribe(
        ([donvi, taisan]) => {
          this.listDataChiTietDonVi = donvi;
          this.listDataChiTietTaiSan = taisan;
          this.loading_search_chitiet = false
        },
        error => {
          this.loading_search_chitiet = false
          this.commonService.showError()
        }
      );
  }

  onRow(row: BaoCaoKetNhapKiemKeViewModel) {
    this.selectionKetNhapKiemKe = row;
    this.loading_search_chitiet = true


    let apiCalls = [
      this.baoCaoThongKeService.getListBaoCaoKetNhapKiemKe_DonVi(this.selectionKetNhapKiemKe.id_qlts_ket_nhap),
      this.baoCaoThongKeService.getListBaoCaoKetNhapKiemKe_LoaiTaiSan(this.selectionKetNhapKiemKe.id_qlts_ket_nhap)
    ];

    this.ListDataKetNhap = []
    this.listDataChiTietDonVi = [];
    this.listDataChiTietTaiSan = [];
    this.ListDataKetNhap.push(this.selectionKetNhapKiemKe);

    forkJoin(apiCalls)
      .pipe(first())
      .subscribe(
        ([donvi, taisan]) => {
          this.listDataChiTietDonVi = donvi;
          this.listDataChiTietTaiSan = taisan;
          this.loading_search_chitiet = false

        },
        error => {
          this.loading_search_chitiet = false
          this.commonService.showError()
        }
      );
  }

  Search() {
    let now: Date = new Date();
    this.onDate();
    this.loading_search = true;
    this.loading_search_chitiet = true;
    this.select_donvi = this.select_donvi ? this.select_donvi : 0;
    this.filterCallApi.id_don_vi_goc = this.select_donvi;
    this.filterCallApi.tu_ngay = formatDate(this.dateTuNgay ? this.dateTuNgay : new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0), "yyyy-MM-ddTHH:mm:ss", "En-en");
    this.filterCallApi.den_ngay = formatDate(this.dateDenNgay ? this.dateDenNgay : new Date(now.getFullYear(), now.getMonth(), now.getDate(), 59, 59), "yyyy-MM-ddTHH:mm:ss", "En-en");
    this.listData = [];
    this.ListDataKetNhap = []
    this.listDataChiTietDonVi = [];
    this.listDataChiTietTaiSan = [];

    this.baoCaoThongKeService.getListBaoCaoKetNhapKiemKe(this.filterCallApi).pipe(first()).subscribe((result) => {
      this.listData = result;

      if (this.listData.length > 0)
        this.onRow(this.listData[0])

      this.loading_search = this.loading_search_chitiet = false;
      if (!this.select_donvi)
        this.select_donvi = undefined
    }, (error) => {
      this.listData = [];
      this.loading_search = this.loading_search_chitiet = false;
      this.commonService.showError();
      if (!this.select_donvi)
        this.select_donvi = undefined
    });
  }

  loadCombox() {
    this.comboboxService.getListDonVi('Cha').pipe(first()).subscribe(
      {
        next: (data) => {
          this.Search();
          this.comboboxDonVi = data;
        },
        error: (error) => {
          this.comboboxDonVi = [];
        }
      }
    );
  }

  onDate() {
    if (!this.dateTuNgay)
      this.dateTuNgay = new Date();

    if (!this.dateDenNgay)
      this.dateDenNgay = new Date();
  }

  initDate() {
    let now = new Date();
    this.dateTuNgay = new Date(now.getFullYear(), now.getMonth() - 6, now.getDate(), 0, 0);//trừ 6 tháng
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


  isLoadingExecl: boolean = false
  xuatExcel() {
    // this.isLoadingExecl = true
    // if (this.type == 1) {
    //   this.baoCaoThongKeService.exportBaoCaoKetNhapKiemKe_DonVi(this.id_qlts_ket_nhap).pipe(first()).subscribe((data) => {
    //     this.commonService.downloadFile('Báo cáo kết nhập kiểm kê đơn vị_', data, '.xls');
    //     setTimeout(() => {
    //       this.isLoadingExecl = false;
    //     }, 350)
    //   }, (error) => {
    //     console.log("Export excel báo cáo fail", error);
    //     this.commonService.showError('Đã có lỗi xảy ra.Vui lòng thử lại trong giây lát');
    //     this.isLoadingExecl = false;
    //   });
    // }
    // else {
    //   this.baoCaoThongKeService.exportBaoCaoKetNhapKiemKe_LoaiTaiSan(this.id_qlts_ket_nhap).pipe(first()).subscribe((data) => {
    //     this.commonService.downloadFile('Báo cáo kết nhập kiểm kê loại tài sản_', data, '.xls');
    //     setTimeout(() => {
    //       this.isLoadingExecl = false;
    //     }, 350)
    //   }, (error) => {
    //     console.log("Export excel báo cáo fail", error);
    //     this.commonService.showError('Đã có lỗi xảy ra.Vui lòng thử lại trong giây lát');
    //     this.isLoadingExecl = false;
    //   });
    // }
  }
}

