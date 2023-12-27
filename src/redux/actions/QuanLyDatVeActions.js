import { quanLyDatVeService } from "../../services/QuanLyDatVeService";
import { ThongTinDatVe } from "../../_core/models/ThongTinDatVe";
import { connection } from "../../index";
import {
  DAT_VE,
  DAT_VE_HOAN_TAT,
  SET_CHI_TIET_PHONG_VE,
} from "./types/QuanLyDatVeType";
import Swal from "sweetalert2";
import { layThongTinUserAction } from "./QuanLyNguoiDungAction";

export const layChiTietPhongVeAction = (maLichChieu) => {
  return async (dispatch) => {
    try {
      const result = await quanLyDatVeService.layChiTietPhongVe(maLichChieu);

      if (result.status === 200) {
        dispatch({
          type: SET_CHI_TIET_PHONG_VE,
          chiTietPhongVe: result.data.content,
        });
      }
    } catch (error) {
      console.log("error", error.response?.data);
    }
  };
};

export const datVeAction = (thongTinDatVe = new ThongTinDatVe()) => {
  return async (dispatch, getState) => {
    try {
      const result = await quanLyDatVeService.datVe(thongTinDatVe);
      if (result.status === 200) {
        let timerInterval;
        await Swal.fire({
          title: "Đặt vé thành công",
          html: "Chúc bạn xem phim vui vẻ nhé!",
          timer: 3000,
          timerProgressBar: true,
          willClose: () => {
            clearInterval(timerInterval);
          },
        });
        await dispatch({
          type: DAT_VE_HOAN_TAT,
        });
        await dispatch(layChiTietPhongVeAction(thongTinDatVe.maLichChieu));
        await dispatch(layThongTinUserAction());

        let userLogin = getState().QuanLyNguoiDungReducer.userLogin;
        connection.invoke(
          "datGheThanhCong",
          userLogin.taiKhoan,
          thongTinDatVe.maLichChieu
        );
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: error.response.data,
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
  };
};

export const datGheAction = (ghe, maLichChieu) => {
  return async (dispatch, getState) => {
    await dispatch({
      type: DAT_VE,
      gheDuocChon: ghe,
    });

    //Lấy dữ liệu từ redux về thông qua getState
    let danhSachGheDangDat = getState().QuanLyDatVeReducer.danhSachGheDangDat;
    let taiKhoan = getState().QuanLyNguoiDungReducer.userLogin.taiKhoan;

    //Biến mảng thành chuỗi
    danhSachGheDangDat = JSON.stringify(danhSachGheDangDat);

    //Call api signalR
    connection.invoke("datGhe", taiKhoan, danhSachGheDangDat, maLichChieu);
  };
};
