import { formatDate } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { first, forkJoin } from 'rxjs';
import { ComboboxViewModel } from 'src/app/modules/models/common/combobox-view-model';
import { FileExcelUploadViewModel } from 'src/app/modules/models/quan-ly-kiem-ke/file-excel-upload-view-model';
import { QRCodeFilterViewModel } from 'src/app/modules/models/quan-ly-kiem-ke/qr-code-filter-view-model';
import { QRCodeViewModel } from 'src/app/modules/models/quan-ly-kiem-ke/qr-code-view-model';
import { ComboboxService } from 'src/app/modules/service/combobox.service';
import { CommonService } from 'src/app/modules/service/common.service';
import { QuanLyKiemKeService } from 'src/app/modules/service/quan-ly-kiem-ke.service';

@Component({
  selector: 'app-bao-cao-chi-tiet-qr-code',
  templateUrl: './quan-ly-qr.component.html',
  styleUrls: ['./quan-ly-qr.component.scss']
})
export class QuanLyQRComponent implements OnInit {
  @ViewChild('data_report') data_report: any;

  cols_List_CallAPI: any[] = [
    // { field: 'TacVu', header: 'Tác vụ', width: '50px', align: 'center' },
    { field: 'STT', header: 'STT', width: '50px', align: 'center' },
    { field: 'qrcode', header: 'QRCode', width: '200px', align: 'center' },
    { field: 'trang_thai', header: 'Trạng thái', width: '100px', align: 'center' },
    { field: 'ma_tai_san', header: 'Mã tài sản', width: '100px', align: 'center' },
    { field: 'khai_bao', header: 'Khai báo', width: '130px', align: 'center' },
    { field: 'ten_don_vi', header: 'Đơn vị gốc', width: '250px', align: 'left' },
  ]

  data_CallAPI: QRCodeViewModel[] = []
  filter_CallAPI: QRCodeFilterViewModel = new QRCodeFilterViewModel();

  loading: boolean = false;
  loading_search: boolean = false;
  loading_excel: boolean = false;

  constructor(private quanLyKiemKeService: QuanLyKiemKeService,
    private commonService: CommonService,
    private confirmationService: ConfirmationService,
    private comboboxService: ComboboxService) { }

  ngOnInit(): void {
    this.LoadCombobox();
    this.initDate();
    this.loadData();
  };

  //#region Load danh sách qr code

  loadData() {
    if (this.data_report)
      this.data_report.clear();

    let now = new Date();
    this.filter_CallAPI.tu_ngay = formatDate(this.dateTuNgay ? this.dateTuNgay : new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0), "yyyy-MM-ddTHH:mm:ss", "En-en");
    this.filter_CallAPI.den_ngay = formatDate(this.dateDenNgay ? this.dateDenNgay : new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0), "yyyy-MM-ddTHH:mm:ss", "En-en");
    this.filter_CallAPI.id_don_vi = this.select_Don_Vi ? this.select_Don_Vi : 0;
    this.filter_CallAPI.id_khai_bao = this.select_Khai_Bao ? this.select_Khai_Bao : 0;
    this.filter_CallAPI.list_trang_thai = this.select_TrangThai ? this.select_TrangThai.map(x => x.ID).toString() : ''
    this.filter_CallAPI.skip = 0;
    this.filter_CallAPI.take = 50;
    this.loading = true;

    this.data_CallAPI = [];

    this.quanLyKiemKeService.getListQRCode(this.filter_CallAPI).pipe(first()).subscribe(
      (data) => {
        this.loading = false;
        this.data_CallAPI = data;
      },
      (error) => {
        this.commonService.showError('Đã có lỗi xảy ra.Vui lòng thử lại trong giây lát');
        this.loading = false;
        this.data_CallAPI = [];
      }
    )
  }

  loadGridChange(event: any) {
    this.loading = true
    this.filter_CallAPI.take = 50;
    this.filter_CallAPI.skip = event.first ? event.first : 0

    this.quanLyKiemKeService.getListQRCode(this.filter_CallAPI).pipe(first()).subscribe(
      (data) => {
        this.loading = false;
        this.data_CallAPI = data;
      },
      (error) => {
        this.commonService.showError('Đã có lỗi xảy ra.Vui lòng thử lại trong giây lát');
        this.loading = false;
        this.data_CallAPI = [];
      }
    )
  }

  XuatExcel() {
    if (this.data_CallAPI.length == 0) {
      this.commonService.showWarn('Không có dữ liệu!');
    }
    else {
      this.loading_excel = true;
      this.quanLyKiemKeService.getListQRCodeExcel(this.filter_CallAPI).pipe(first()).subscribe((data) => {
        this.commonService.downloadFile('Danh sách QRCode', data, '.xls');
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

  //#endregion

  //#region Cấp phát QRCode
  isKieuCap: number = 0

  loadingCapPhat: boolean = false
  isOpen_CapPhat: boolean = false
  max_SoLuong: number = 0
  mintu_SoLuong: number = 0
  maxden_SoLuong: number = 0
  soLuongCapPhat: number = 0
  listDonVi_CapPhat: ComboboxViewModel[] = []
  id_don_vi_cap_phat: number = 0
  noiDung_CapPhat: string = ''
  tu_CapPhat: number = 0
  den_CapPhat: number = 0

  openCapPhat() {
    this.isOpen_CapPhat = true
    this.isKieuCap = 0
    this.max_SoLuong = 0
    this.soLuongCapPhat = 0
    this.id_don_vi_cap_phat = 0
    this.tu_CapPhat = 0
    this.den_CapPhat = 0
    this.noiDung_CapPhat = ''
    this.quanLyKiemKeService.getSoLuongQRCodeChuaCap().subscribe((data) => {
      this.max_SoLuong = data.Value.total ? data.Value.total : 0

      this.mintu_SoLuong = data.Value.min ? data.Value.min : 0
      this.tu_CapPhat = data.Value.min ? data.Value.min : 0

      this.maxden_SoLuong = data.Value.max ? data.Value.max : 0
      this.den_CapPhat = data.Value.max ? data.Value.max : 0

      this.soLuongCapPhat = data.Value.total ? data.Value.total : 0
    }, (error) => {
      this.max_SoLuong = 0
      this.mintu_SoLuong = 0
      this.maxden_SoLuong = 0
      this.soLuongCapPhat = 0
    })

    this.comboboxService.getListDonVi('CHA').pipe(first()).subscribe((data) => {
      this.listDonVi_CapPhat = data
    })
  }

  onKieuCap(type: number) {
    this.isKieuCap = type
    if (type == 0) {
      this.soLuongCapPhat = this.max_SoLuong
    }
    else {
      this.tu_CapPhat = this.mintu_SoLuong
      this.den_CapPhat = this.maxden_SoLuong
    }
  }

  validateCapQR() {
    if (!this.id_don_vi_cap_phat) {

      this.commonService.showWarn('Chọn đơn vị')
      return false;
    }

    if (this.isKieuCap == 0 && !this.soLuongCapPhat) {
      this.commonService.showWarn('Nhập số lượng QRCode')
      return false;
    }

    if (this.isKieuCap != 0 && (this.tu_CapPhat == undefined || this.den_CapPhat == undefined)) {
      this.commonService.showWarn('Nhập số lượng QRCode từ đến');
      return false;
    }


    if (this.isKieuCap != 0 && (this.tu_CapPhat > this.den_CapPhat)) {
      this.commonService.showWarn('Số từ: ' + this.tu_CapPhat + ' đang lớn hơn số đến: ' + this.den_CapPhat);
      return false;
    }

    return true
  }

  capPhatQRCode() {
    if (this.validateCapQR()) {
      if (this.isKieuCap != 0) {
        this.quanLyKiemKeService.getSoLuongQRCodeChuaCapTuDem(this.tu_CapPhat, this.den_CapPhat).pipe(first()).subscribe(
          (data) => {
            if (data.Value == 0) {
              this.commonService.showInfo('Không có mã QRCode nào thỏa mãn điều kiện từ ' + this.tu_CapPhat + ' đến ' + this.den_CapPhat)
            }
            else {
              this.confirmationService.confirm({
                target: event.target as EventTarget,
                key: "qrcodecapphat",
                message: 'Có  <b>' + data.Value + '</b> mã QRCode thỏa mãn điều kiện từ ' + this.tu_CapPhat + ' đến ' + this.den_CapPhat + ' bạn có muốn cấp không ?',
                header: 'Thông báo',
                icon: 'pi pi-exclamation-triangle',
                acceptLabel:'Đồng ý',
                rejectLabel:'Từ chối',
                acceptIcon: "none",
                rejectIcon: "none",
                rejectButtonStyleClass: "p-button-text",
                accept: () => {
                  let ojb = {
                    id_don_vi: this.id_don_vi_cap_phat,
                    noi_dung: this.noiDung_CapPhat,
                    type: this.isKieuCap,
                    so_luong: this.soLuongCapPhat,
                    tu: this.tu_CapPhat,
                    den: this.den_CapPhat,
                    modified_by: ''
                  }

                  this.loadingCapPhat = true
                  this.quanLyKiemKeService.capPhatQRCode(ojb).pipe(first()).subscribe(
                    (data) => {
                      if (data.flag) {
                        this.isOpen_CapPhat = false
                        this.loadingCapPhat = false
                        this.loadData()
                        this.commonService.showSuccess(data.msg);
                      }
                      else {
                        this.loadingCapPhat = false
                        this.commonService.showWarn(data.msg);
                      }
                    }, (error) => {
                      this.loadingCapPhat = false
                      this.commonService.showError('Đã xảy ra lỗi vui lòng thử lại sau!');
                    }
                  )
                },
                reject: () => {
                }
              });
            }

          }, (error) => {
            this.commonService.showError()
          }
        )
      }
      else {
        let ojb = {
          id_don_vi: this.id_don_vi_cap_phat,
          noi_dung: this.noiDung_CapPhat,
          type: this.isKieuCap,
          so_luong: this.soLuongCapPhat,
          tu: this.tu_CapPhat,
          den: this.den_CapPhat,
          modified_by: ''
        }

        this.loadingCapPhat = true
        this.quanLyKiemKeService.capPhatQRCode(ojb).pipe(first()).subscribe(
          (data) => {
            if (data.flag) {
              this.isOpen_CapPhat = false
              this.loadingCapPhat = false
              this.loadData()
              this.commonService.showSuccess(data.msg);
            }
            else {
              this.loadingCapPhat = false
              this.commonService.showWarn(data.msg);
            }
          }, (error) => {
            this.loadingCapPhat = false
            this.commonService.showError('Đã xảy ra lỗi vui lòng thử lại sau!');
          }
        )
      }
    }
  }

  //#endregion


  //#region  Combobox
  listDonVi: ComboboxViewModel[] = []
  listKhaiBao: ComboboxViewModel[] = []
  listTrangThai: any[] = [
    { ID: 'CHUAGAN', Value: 'Chưa gán' },
    { ID: 'DAGAN', Value: 'Đã gán' },
    { ID: 'HUY', Value: 'Hủy' }
  ]
  select_TrangThai: any[] = []
  select_Don_Vi: number = 0
  select_Khai_Bao: number = 0

  LoadCombobox() {
    let apiCalls = [
      this.comboboxService.getListDonVi('GOC'),
      this.comboboxService.getListKhaiBaoQRCode()
    ];
    this.listDonVi = [];
    this.listKhaiBao = [];

    forkJoin(apiCalls)
      .pipe(first())
      .subscribe(
        ([donvi, khaibao]) => {
          this.listDonVi = donvi;
          this.listKhaiBao = khaibao;
        },
        error => {
        }
      );
  }


  //#endregion

  //#region Khai báo mới QRCode
  isOpen_KhaiBao: boolean = false
  isLoading_TaiFileMau: boolean = false
  uploadedFiles: any[] = [];
  tenFile: string = ''
  noiDung_KhaiBao: string = ''
  loading_Import: boolean = false;

  taiFileMauQRCode() {
    this.isLoading_TaiFileMau = true
    this.quanLyKiemKeService.GetTemplateQRCode().pipe(first()).subscribe(
      (data) => {
        this.commonService.downloadFile('TemplateImport_QRCode_', data, '.xls');
        this.isLoading_TaiFileMau = false
      }, (error) => {
        this.isLoading_TaiFileMau = false
        this.commonService.showWarn('Có lỗi xảy ra trong quá trình tải file mẫu!');
      }
    )
  }

  onShowKhaiBao() {
    this.tenFile = ''
    this.noiDung_KhaiBao = ''
  }

  onUpload(event: any) {
    console.log(event)

    this.uploadedFiles = [];
    for (let file of event.files) {
      this.tenFile = file.name
      this.uploadedFiles.push(file);
    }
  }

  uploadFileToActivity() {
    this.loading_Import = true;
    this.quanLyKiemKeService.saveFileQRCode(this.uploadedFiles).pipe(first()).subscribe((data) => {
      let param: FileExcelUploadViewModel = new FileExcelUploadViewModel();
      param.filename = data.Value.filename;
      param.id_khai_bao = data.Value.id_khai_bao;
      param.id_don_vi_goc = 0;
      param.noi_dung = this.noiDung_KhaiBao;
      param.modified_by = ''
      this.ImportFiles(param);
    }, (error) => {
      this.loading_Import = false
      console.log("SaveFile lỗi", error);
      this.commonService.showError('Có lỗi xảy ra trong quá trình đọc file dữ liệu.Vui lòng thử lại sau');
    });
  }

  ImportFiles(param: FileExcelUploadViewModel) {
    this.quanLyKiemKeService.importExcelQRCode(param).pipe(first()).subscribe(data => {
      if (data.status == 201) {
        this.commonService.showSuccess('Tác vụ thực hiện thành công');
        this.loading_Import = false;
        this.isOpen_KhaiBao = false;
        this.LoadCombobox();
        this.loadData;
      }
      else if (data.status == 204) {
        this.commonService.showWarn('File không đúng định dạng hoặc không tồn tại bản ghi');
        this.loading_Import = false;
      }
      else if (data.status == 411) {
        this.commonService.showWarn('Số lượng bản ghi không thể vướt quá 5000');
        this.loading_Import = false;
      }
      else if (data.status == 200) {
        this.commonService.downloadFile('TemplateImport_QRCode_Error_', data, '.xls');
        this.loading_Import = false;
      }
      else {
        this.commonService.showWarn('Có lỗi xảy ra vui lòng kiểm tra lại file dữ liệu');
        this.loading_Import = false;
      }
    }, (error_import) => {
      console.log("SaveFile lỗi", error_import);
      this.commonService.showError('Có lỗi xảy ra trong quá trình import dữ liệu.Vui lòng thử lại sau');
      this.loading_Import = false;
    });
  }
  //#endregion

  //#region  initDate
  dateTuNgay?: Date;
  dateDenNgay?: Date;
  maxDate: Date = this.dateDenNgay ? this.dateDenNgay : new Date();
  minDate: Date = this.dateTuNgay ? this.dateTuNgay : new Date();

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

  //#endregion
}
