import { quanLyNguoiDungService } from "../../services/QuanLyNguoiDung";
import {
  CLOSE_MODAL_USER,
  DANG_NHAP_ACTION,
  LAY_DANH_SACH_LOAI_NGUOI_DUNG,
  LAY_DANH_SACH_NGUOI_DUNG,
  LAY_DANH_SACH_NGUOI_DUNG_KEYWORD,
  LAY_THONG_TIN_USER,
} from "./types/QuanLyNguoiDungType";
import { history } from "../../App";
import Swal from "sweetalert2";

export const dangNhapAction = (thongTinDangNhap) => {
  return async (dispatch) => {
    try {
      const result = await quanLyNguoiDungService.dangNhap(thongTinDangNhap);

      if (result.data.statusCode === 200) {
        dispatch({
          type: DANG_NHAP_ACTION,
          thongTinDangNhap: result.data.content,
        });
         Swal.fire({
          title: "Đăng nhập thành công!",
          icon: "success",
          html: "Thông báo tự động tắt sau 2 giây",
          timer: 2000,
          timerProgressBar: true,
          confirmButtonText: "Ok",
        });
        // history.goBack();
        history.goBack();
      }
    } catch (error) {
      Swal.fire({
        title: "Có lỗi!",
        text: error.response.data.content,
        icon: "error",
        confirmButtonText: "Thử lại",
      });
    }
  };
};

export const dangKyAction = (thongTinDangKy) => {
  return async () => {
    try {
      const result = await quanLyNguoiDungService.dangKy(thongTinDangKy);
      if (result.data.statusCode === 200) {
        Swal.fire({
          title: "Đăng ký thành công!",
          icon: "success",
          confirmButtonText: "Đăng nhập ngay",
        });
        history.goBack();
        // history.back();
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: error.response.data.content,
        icon: "error",
        confirmButtonText: "Try Again!",
      });
    }
  };
};

export const layThongTinUserAction = () => {
  return async (dispatch) => {
    try {
      const result = await quanLyNguoiDungService.layThongTinNguoiDung();
      if (result.data.statusCode === 200) {
        dispatch({
          type: LAY_THONG_TIN_USER,
          userData: result.data.content,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const layDanhSachNguoiDungAction = () => {
  return async (dispatch) => {
    const result = await quanLyNguoiDungService.layDanhSachNguoiDung();
    try {
      if (result.data.statusCode === 200) {
        dispatch({
          type: LAY_DANH_SACH_NGUOI_DUNG,
          arrUser: result.data.content,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const timKiemNguoiDungAction = (keyWord) => {
  return async (dispatch) => {
    try {
      const result = await quanLyNguoiDungService.timKiemNguoiDung(keyWord);
      if (result.data.statusCode === 200) {
        dispatch({
          type: LAY_DANH_SACH_NGUOI_DUNG_KEYWORD,
          arrUserSearch: result.data.content,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const layDanhSachLoaiNguoiDungAction = () => {
  return async (dispatch) => {
    try {
      const result = await quanLyNguoiDungService.layDanhSachLoaiNguoiDung();
      if (result.data.statusCode === 200) {
        dispatch({
          type: LAY_DANH_SACH_LOAI_NGUOI_DUNG,
          arrTypeUser: result.data.content,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const themNguoiDung = (user) => {
  return async (dispatch) => {
    try {
      const result = await quanLyNguoiDungService.themNguoiDung(user);
      if (result.data.statusCode === 200) {
        await Swal.fire({
          title: "Thêm mới thành công!",
          icon: "success",
          confirmButtonText: "Ok",
        });
        await dispatch(layDanhSachNguoiDungAction());
        history.push("/admin/users");
      }
    } catch (errors) {
      Swal.fire({
        title: "Có lỗi xảy ra!",
        text: errors.response.data.content,
        icon: "error",
        confirmButtonText: "Thử lại",
      });
    }
  };
};

export const capNhatNguoiDungAction = (user) => {
  return async (dispatch) => {
    const result = await quanLyNguoiDungService.capNhatNguoiDung(user);

    try {
      if (result.data.statusCode === 200) {
        await Swal.fire({
          title: "Cập nhật thành công!",
          icon: "success",
          confirmButtonText: "Ok",
        });
        await dispatch(layDanhSachNguoiDungAction());
        await history.goBack();
      }
    } catch (errors) {
      Swal.fire({
        title: "Có lỗi xảy ra!",
        text: errors.response.data.content,
        icon: "error",
        confirmButtonText: "Đã hiểu!",
      });
    }
  };
};

export const capNhatNguoiDungActionForUser = (user) => {
  return async (dispatch) => {
    const result = await quanLyNguoiDungService.capNhatNguoiDung(user);

    try {
      if (result.data.statusCode === 200) {
        await Swal.fire({
          title: "Cập nhật thành công! ",
          text: "Đăng nhập lại để xem thay đổi",
          icon: "success",
          confirmButtonText: "Ok",
        });
        await dispatch({
          type: CLOSE_MODAL_USER,
        });

        history.push("/login");
      }
    } catch (errors) {
      Swal.fire({
        title: "Có lỗi xảy ra!",
        text: errors.response.data.content,
        icon: "error",
        confirmButtonText: "Đã hiểu!",
      });
    }
  };
};

export const xoaNguoiDungAction = (taiKhoan) => {
  return async (dispatch) => {
    try {
      const result = await quanLyNguoiDungService.xoaNguoiDung(taiKhoan);
      if (result.data.statusCode === 200) {
        Swal.fire("Đã xoá", "Người dùng đã được xoá", "success");
        dispatch(layDanhSachNguoiDungAction());
      }
    } catch (errors) {
      Swal.fire({
        title: "Có lỗi xảy ra!",
        text: errors.response.data.content,
        icon: "error",
        confirmButtonText: "Đã hiểu!",
      });
    }
  };
};
