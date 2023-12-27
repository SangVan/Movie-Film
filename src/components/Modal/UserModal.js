import React, { useEffect, useState } from "react";
import { CSSTransition } from "react-transition-group";
import { useFormik } from "formik";
import { Form, Input, Button, Select, Tabs, Avatar } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { CLOSE_MODAL_USER } from "../../redux/actions/types/QuanLyNguoiDungType";
import {
  capNhatNguoiDungActionForUser,
  layThongTinUserAction,
} from "../../redux/actions/QuanLyNguoiDungAction";
import { GROUPID } from "../../util/settings/config";
import _ from "lodash";
import moment from "moment";

export default function UserModal() {
  const closeOnEscapeKeyDown = (e) => {
    if ((e.charCode || e.keyCode) === 27) {
      dispatch({ type: CLOSE_MODAL_USER });
    }
  };

  const dispatch = useDispatch();
  const { TabPane } = Tabs;

  const { isVisibleModal } = useSelector(
    (state) => state.QuanLyNguoiDungReducer
  );

  const { userData } = useSelector((state) => state.QuanLyNguoiDungReducer);
  const { userLogin } = useSelector((state) => state.QuanLyNguoiDungReducer);
  const [isShowForm, setShowForm] = useState(false);

  useEffect(() => {
    dispatch(layThongTinUserAction());
    document.body.addEventListener("keydown", closeOnEscapeKeyDown);
    return function cleanup() {
      document.body.removeEventListener("keydown", closeOnEscapeKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderTicketItem = function () {
    return userData.thongTinDatVe?.slice(0, 3).map((ticket, index) => {
      const seats = _.first(ticket.danhSachGhe);

      return (
        <div className="p-2 lg:w-1/3 md:w-1/2 w-full" key={index}>
          <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
            <div className="flex-grow">
              <h2 className="text-blue-500 title-font font-medium text-xl">
                {ticket.tenPhim}
              </h2>
              <p className="text-gray-500">
                <span className="font-bold">Giờ chiếu: </span>
                {moment(ticket.ngayDat).format("hh:mm A")}
              </p>
              <p className="text-gray-500">
                <span className="font-bold">Ngày chiếu: </span>
                {moment(ticket.ngayDat).format("DD-MM-YYYY")}
              </p>

              <p>
                <span className="font-bold">Địa điểm: </span>
                {seats.tenHeThongRap}
              </p>

              <div className="flex justify-between">
                <div className="">
                  <p>
                    <span className="font-bold">Số rạp: </span> {seats.tenCumRap}
                  </p>
                  <span className="font-bold">Ghế đã đặt: </span>
                  {ticket.danhSachGhe.map((ghe, index) => {
                    return (
                      <span className="text-gray-500" key={index}>
                        {`${ghe.tenGhe} `}
                      </span>
                    );
                  })}
                </div>

                <img alt="team" className="w-16 h-16 bg-gray-100 object-cover rounded-full" src={ticket.hinhAnh} />
              </div>
            </div>
          </div>
        </div>
      );
    });
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      taiKhoan: userLogin.taiKhoan,
      matKhau: userLogin.matKhau,
      email: userLogin.email,
      hoTen: userLogin.hoTen,
      soDT: userLogin.soDT,
      maLoaiNguoiDung: userLogin.maLoaiNguoiDung,
      maNhom: GROUPID,
    },
    onSubmit: (values) => {
      dispatch(capNhatNguoiDungActionForUser(values));
    },
  });

  return (
    <div>
      <CSSTransition
        in={isVisibleModal}
        onClick={() => {
          setShowForm(false);
          dispatch({ type: CLOSE_MODAL_USER });
        }}
        unmountOnExit
        timeout={{ enter: 0, exit: 300 }}
      >
        <div className="modal">
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-body">
              <Tabs defaultActiveKey="1">
                <TabPane tab="Thông tin cá nhân" key="1">
                  {isShowForm ? (
                    <Form name="basic" labelCol={{ span: 8 }} wrapperCol={{ span: 10 }} onSubmitCapture={formik.handleSubmit}>
                      <Form.Item label="Tài khoản">
                        <Input disabled value={formik.values.taiKhoan} name="taiKhoan" onChange={formik.handleChange} />
                      </Form.Item>

                      <Form.Item label="Mật khẩu">
                        <Input.Password name="matKhau" value={formik.values.matKhau} onChange={formik.handleChange} />
                      </Form.Item>

                      <Form.Item label="Email" type="email">
                        <Input name="email" value={formik.values.email} onChange={formik.handleChange} />
                      </Form.Item>

                      <Form.Item label="Họ và Tên">
                        <Input name="hoTen" value={formik.values.hoTen} onChange={formik.handleChange} />
                      </Form.Item>

                      <Form.Item label="Số điện thoại">
                        <Input name="soDT" value={formik.values.soDT} onChange={formik.handleChange} />
                      </Form.Item>

                      <Form.Item label="Mã nhóm">
                        <Select value={formik.values.maNhom} onChange={(value) => formik.setFieldValue("maNhom", value)}>
                          <Select.Option value="GP00">GP00</Select.Option>
                          <Select.Option value="GP01">GP01</Select.Option>
                        </Select>
                      </Form.Item>

                      <Form.Item wrapperCol={{ offset: 8, span: 10 }}>
                        <div className="flex">
                          <Button type="primary" htmlType="submit" style={{ width: "50%" }}>
                            Cập nhật
                          </Button>
                          <Button onClick={() => { setShowForm(false); }} type="danger" style={{ width: "50%" }}>
                            Huỷ
                          </Button>
                        </div>
                      </Form.Item>
                    </Form>
                  ) : (
                    <div>
                      <div className="p-2 flex justify-around">
                        <div className="border-gray-200 border py-5 px-10 rounded-lg">
                          <div className="text-lg ">
                            <p>
                              <span className="font-bold">Tài khoản: </span>
                              {userLogin.taiKhoan}
                            </p>
                            <p>
                              <span className="font-bold">Họ tên: </span>
                              {userLogin.hoTen}
                            </p>
                            <p>
                              <span className="font-bold">Email: </span>
                              {userLogin.email}
                            </p>
                            <p>
                              <span className="font-bold">Số điện thoại: </span>
                              {userLogin.soDT}
                            </p>
                            <p>
                              <span className="font-bold">Email: </span>
                              {userLogin.email}
                            </p>
                            <button onClick={() => {
                              setShowForm(true);
                            }}
                              className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white mr-2 py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                            >
                              Thay đổi thông tin
                            </button>
                          </div>
                        </div>
                        <div className="mt-5">
                          <Avatar size={300} src="https://joeschmoe.io/api/v1/random" style={{ backgroundColor: "gray" }} />
                        </div>
                      </div>
                    </div>
                  )}
                </TabPane>

                <TabPane tab="Lịch sử đặt vé" key="2">
                  <section className="text-gray-600 body-font">
                    <div className="flex flex-wrap ">{renderTicketItem()}</div>
                  </section>
                </TabPane>
              </Tabs>
            </div>
            <div className="modal-footer flex justify-end">
              <button
                onClick={() => {
                  dispatch({ type: CLOSE_MODAL_USER });
                  setShowForm(false);
                }}
                className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white mr-2 py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                Đóng
              </button>
            </div>
          </div>
        </div>
      </CSSTransition>
    </div>
  );
}
