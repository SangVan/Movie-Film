import { GROUPID } from "../util/settings/config";
import { baseService } from "./baseService";

export class QuanLyNguoiDungService extends baseService {
  dangNhap = (thongTinDangNhap) => {
    return this.post(`/api/QuanLyNguoiDung/DangNhap`, thongTinDangNhap);
  };

  dangKy = (thongTinDangKy) => {
    return this.post(`/api/QuanLyNguoiDung/DangKy`, thongTinDangKy);
  };

  layThongTinNguoiDung = () => {
    return this.post("/api/QuanLyNguoiDung/ThongTinTaiKhoan");
  };

  layDanhSachNguoiDung = () => {
    return this.get(
      `/api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=${GROUPID}`
    );
  };

  timKiemNguoiDung = (keyWord) => {
    return this.get(
      `api/QuanLyNguoiDung/TimKiemNguoiDung?MaNhom=${GROUPID}&tuKhoa=${keyWord}`
    );
  };

  layDanhSachLoaiNguoiDung = () => {
    return this.get("api/QuanLyNguoiDung/LayDanhSachLoaiNguoiDung");
  };

  themNguoiDung = (user) => {
    return this.post("api/QuanLyNguoiDung/ThemNguoiDung", user);
  };

  capNhatNguoiDung =  (user) => {
    return this.post("api/QuanLyNguoiDung/CapNhatThongTinNguoiDung", user);
  };

  xoaNguoiDung = (taiKhoan) => {
    return this.delete(`api/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${taiKhoan}`);
  };
}

export const quanLyNguoiDungService = new QuanLyNguoiDungService();
