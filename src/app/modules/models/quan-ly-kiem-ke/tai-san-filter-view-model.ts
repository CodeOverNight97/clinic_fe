export class TaiSanFilterViewModel {
    isExcel: boolean = false;
    trang_thai: string = ''
    ma_tai_san: string  =''
    ten_tai_san: string  = ''
    ma_loai_tai_san: string = ''
    nam_su_dung: string = ''
    thong_so_ky_thuat: string = ''
    id_don_vi: number = undefined
    ten_don_vi_quan_ly: string = ''
    tong_tien_tu: number = undefined
    tong_tien_den: number = undefined
    ngan_sach_tu: number = undefined
    ngan_sach_den: number = undefined
    nguon_khac_tu: number = undefined
    nguon_khac_den: number = undefined
    gia_tri_con_lai_tu: number = undefined
    gia_tri_con_lai_den: number = undefined
    ghi_chu: string = ''
    qr_code: string = ''
    ngay_cap_qr_tu: string = '1900-01-01T00:00:00'
    ngay_cap_qr_den: string = '1900-01-01T00:00:00'
    nguoi_cap_qr: string = ''
    ngay_kiem_ke_tu: string = '1900-01-01T00:00:00'
    ngay_kiem_ke_den: string = '1900-01-01T00:00:00'
    nguoi_kiem_ke: string = ''
    noi_dung_kiem_ke: string = ''
    take: number = 50
    skip: number = 0
}