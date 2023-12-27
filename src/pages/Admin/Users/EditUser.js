import React, { useEffect } from "react";
import { Form, Input, Button, Select } from "antd";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import {
  capNhatNguoiDungAction,
  layDanhSachLoaiNguoiDungAction,
  timKiemNguoiDungAction,
} from "../../../redux/actions/QuanLyNguoiDungAction";
import { GROUPID } from "../../../util/settings/config";

export default function EditUser(props) {
  const dispatch = useDispatch();
  let { tk } = props.match.params;
  const { arrTypeUser } = useSelector((state) => state.QuanLyNguoiDungReducer);
  const { userInfo } = useSelector((state) => state.QuanLyNguoiDungReducer);
  useEffect(() => {
    dispatch(layDanhSachLoaiNguoiDungAction());
    dispatch(timKiemNguoiDungAction(tk));
  }, [dispatch, tk]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      taiKhoan: userInfo.taiKhoan,
      matKhau: userInfo.matKhau,
      email: userInfo.email,
      hoTen: userInfo.hoTen,
      soDt: userInfo.soDt,
      maNhom: GROUPID,
      maLoaiNguoiDung: userInfo.maLoaiNguoiDung,
    },
    onSubmit: (values) => {
      dispatch(capNhatNguoiDungAction(values));
    },
  });

  return (
    <div>
      <h2 className="text-center text-4xl mb-10 text-blue-500">
        Chỉnh sửa người dùng
      </h2>
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
          <Input ame="hoTen" value={formik.values.hoTen} onChange={formik.handleChange} />
        </Form.Item>

        <Form.Item label="Số điện thoại">
          <Input name="soDt" value={formik.values.soDt} onChange={formik.handleChange}/>
        </Form.Item>

        <Form.Item label="Mã nhóm">
          <Select value={formik.values.maNhom} onChange={(value) => formik.setFieldValue("maNhom", value)} >
              <Select.Option value="GP00">GP00</Select.Option>
              <Select.Option value="GP01">GP01</Select.Option>
            </Select>
        </Form.Item>

        <Form.Item label="Loại tài khoản">
          <Select value={formik.values.maLoaiNguoiDung} onChange={(value) => formik.setFieldValue("maLoaiNguoiDung", value)}>
            {arrTypeUser.map((type, index) => {
              return (
                <Select.Option key={index} value={type.maLoaiNguoiDung}>
                  {type.tenLoai}
                </Select.Option>
              );
            })}
          </Select>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 10 }}>
          <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
            Cập nhật
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
