import { quanLyPhimService } from "../../services/QuanLyPhimService";
import {
  GET_DANH_SACH_PHIM_KEYWORD,
  SET_DANH_SACH_PHIM,
  SET_THONG_TIN_PHIM,
} from "./types/QuanLyPhimType";
import Swal from "sweetalert2";
import { history } from "../../App";
// import history from '../history';
// export const layDanhSachPhimAction = () => {
//   return async (dispatch) => {
//     try {
//       const result = await quanLyPhimService.layDanhSachPhim();
//       dispatch({
//         type: SET_DANH_SACH_PHIM,
//         arrFilm: result.data.content,
//       });
//     } catch (errors) {
//       console.log("errors", errors);
//     }
//   };
// };
export const layDanhSachPhimAction = (tenPhim='') => {
  return async (dispatch) => {
    try {
      const result = await quanLyPhimService.layDanhSachPhim(tenPhim);
      dispatch({
        type: SET_DANH_SACH_PHIM,
        arrFilm: result.data.content,
      });
    } catch (errors) {
      console.log("errors", errors);
    }
  };
};


export const layDanhSachPhimKeyWordAction = (keyWord) => {
  return async (dispatch) => {
    try {
      const result = await quanLyPhimService.layDanhSachPhimKeyWord(keyWord);

      dispatch({
        type: GET_DANH_SACH_PHIM_KEYWORD,
        arrFilmSearch: result.data.content,
      });
    } catch (errors) {
      console.log("errors", errors);
    }
  };
};

export const themMoiPhimAction = (formData) => {
  return async () => {
    try {
      const result = await quanLyPhimService.themMoiPhim(formData);
      if (result.data.statusCode === 200) {
        await Swal.fire({
          title: "Thêm mới thành công!",
          icon: "success",
          html: "Tự động chuyển sang danh sách phim sau 3 giây",
          timer: 3000,
          timerProgressBar: true,
          confirmButtonText: "Ok",
        });
        // history.goBack();
        history.back();
      }
    } catch (errors) {
      Swal.fire({
        title: "Error!",
        text: errors.response.data,
        icon: "error",
        confirmButtonText: "Thử lại",
      });
    }
  };
};

export const capNhatPhimAction = (formData) => {
  return async (dispatch) => {
    try {
      const result = await quanLyPhimService.capNhatPhimUpload(formData);
      if (result.data.statusCode === 200) {
        await Swal.fire({
          title: "Cập nhật thành công!",
          icon: "success",
          html: "Tự động chuyển sang danh sách phim sau 3 giây",
          timer: 3000,
          timerProgressBar: true,
          confirmButtonText: "Ok",
        });
        await dispatch(layDanhSachPhimAction());
        history.push("/admin/films");
      }
    } catch (errors) {
      Swal.fire({
        title: "Error!",
        text: errors.response.data.content,
        icon: "error",
        confirmButtonText: "Thử lại",
      });
    }
  };
};

export const layThongTinPhimAction = (maPhim) => {
  return async (dispatch) => {
    try {
      const result = await quanLyPhimService.layThongTinPhim(maPhim);

      dispatch({
        type: SET_THONG_TIN_PHIM,
        thongTinPhim: result.data.content,
      });
    } catch (errors) {
      console.log("errors", errors);
    }
  };
};

export const xoaPhimAction = (maPhim) => {
  return async (dispatch) => {
    try {
      Swal.fire({
        title: "Bạn chắc chắn xoá phim này?",
        text: "Thao tác sẽ không thể hoàn lại",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Chắc chắn",
      }).then((result) => {
        if (result.isConfirmed) {
          quanLyPhimService.xoaPhim(maPhim);
          Swal.fire("Đã xoá", "Phim của bạn đã được xoá", "success");
          dispatch(layDanhSachPhimAction());
        }
      });
    } catch (errors) {
      Swal.fire({
        title: "Error!",
        text: errors.response.data.content,
        icon: "error",
        confirmButtonText: "Thử lại",
      });
    }
  };
};
