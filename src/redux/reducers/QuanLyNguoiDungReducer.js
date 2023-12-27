import { TOKEN, USER_LOGIN } from "../../util/settings/config";
import {
  CLOSE_MODAL_USER,
  DANG_NHAP_ACTION,
  LAY_DANH_SACH_LOAI_NGUOI_DUNG,
  LAY_DANH_SACH_NGUOI_DUNG,
  LAY_DANH_SACH_NGUOI_DUNG_KEYWORD,
  LAY_THONG_TIN_USER,
  OPEN_MODAL_USER,
} from "../actions/types/QuanLyNguoiDungType";

let user = {};
if (localStorage.getItem(USER_LOGIN)) {
  user = JSON.parse(localStorage.getItem(USER_LOGIN));
}

const stateDefault = {
  userLogin: user,
  userData: {},
  arrUser: [],
  arrUserSearch: [],
  arrTypeUser: [],
  userInfo: {},
  isVisibleModal: false,
};

export const QuanLyNguoiDungReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case DANG_NHAP_ACTION: {
      const { thongTinDangNhap } = action;
      localStorage.setItem(USER_LOGIN, JSON.stringify(thongTinDangNhap));
      localStorage.setItem(TOKEN, thongTinDangNhap.accessToken);
      return { ...state, userLogin: thongTinDangNhap };
    }

    case LAY_THONG_TIN_USER: {
      return { ...state, userData: action.userData };
    }

    case LAY_DANH_SACH_NGUOI_DUNG: {
      return { ...state, arrUser: action.arrUser };
    }

    case LAY_DANH_SACH_NGUOI_DUNG_KEYWORD: {
      state.arrUserSearch = action.arrUserSearch;
      state.arrUser = state.arrUserSearch;
      state.userInfo = state.arrUserSearch[0];
      return { ...state };
    }

    case LAY_DANH_SACH_LOAI_NGUOI_DUNG: {
      return { ...state, arrTypeUser: action.arrTypeUser };
    }

    case OPEN_MODAL_USER: {
      return { ...state, isVisibleModal: true };
    }

    case CLOSE_MODAL_USER: {
      return { ...state, isVisibleModal: false };
    }

    default:
      return { ...state };
  }
};
