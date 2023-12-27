/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Form, Button, Select } from "antd";
import { DatePicker } from "antd";
import { InputNumber } from "antd";
import { quanLyRapService } from "../../../services/QuanLyRapService";
import { useFormik } from "formik";
import moment from "moment";
import { quanLyDatVeService } from "../../../services/QuanLyDatVeService";
import Swal from "sweetalert2";
import { history } from "../../../App";

export default function ShowTime(props) {
  const [state, setState] = useState({
    heThongRapChieu: [],
    cumRapChieu: [],
  });

  const formik = useFormik({
    initialValues: {
      maPhim: props.match.params.id,
      ngayChieuGioChieu: "",
      maRap: "",
      giaVe: "",
    },
    onSubmit: async (values) => {
      try {
        const result = await quanLyDatVeService.taoLichChieu(values);
        if (result.data.statusCode === 200) {
          await Swal.fire({
            title: "Tạo lịch chiếu mới thành công!",
            icon: "success",
            html: "Tự động chuyển sang danh sách phim sau 3 giây",
            timer: 3000,
            timerProgressBar: true,
            confirmButtonText: "Ok",
          });
          await history.push("/admin/films");
        }
      } catch (errors) {
        Swal.fire({
          title: "Error!",
          text: errors.response.data.content,
          icon: "error",
          confirmButtonText: "Thử lại",
        });
      }
    },
  });


  useEffect(async () => {
    try {
      let result = await quanLyRapService.layThongTinHeThongRap();
      setState({
        ...state,
        heThongRapChieu: result.data.content,
      });
    } catch (error) {}
  }, []);

  const handleChangeHeThongRap = async (value) => {
    try {
      let result = await quanLyRapService.layThongTinCumRap(value);
      setState({
        ...state,
        cumRapChieu: result.data.content,
      });
    } catch (error) {
      console.log("error", error.response?.data);
    }
  };

  const handleChangeCumRap = (value) => {
    formik.setFieldValue("maRap", value);
  };

  const onChangeOkDate = (values) => {
    formik.setFieldValue(
      "ngayChieuGioChieu",
      moment(values).format("DD/MM/YYYY hh:mm:ss")
    );
  };
  const onchangeInputNumber = (value) => {
    formik.setFieldValue("giaVe", value);
  };

  const convertSelectHTR = () => {
    return state.heThongRapChieu?.map((htr) => {
      return { label: htr.tenHeThongRap, value: htr.maHeThongRap };
    });
  };

  return (
    <div className="container">
      <h3 className="text-2xl text-blue-400 text-center mb-10">
        Tạo lịch chiếu - {props.match.params.tenphim}
      </h3>
      <Form name="basic" labelCol={{ span: 6 }} wrapperCol={{ span: 14 }} onSubmitCapture={formik.handleSubmit}>
        <Form.Item label="Hệ thống rạp">
          <Select options={convertSelectHTR()} onChange={handleChangeHeThongRap} placeholder="Chọn hệ thống rạp"/>
        </Form.Item>

        <Form.Item label="Cụm rạp">
          <Select options={state.cumRapChieu?.map((cumRap) => ({
              label: cumRap.tenCumRap,
              value: cumRap.maCumRap,
            }))} onChange={handleChangeCumRap} placeholder="Chọn cụm rạp"/>
        </Form.Item>

        <Form.Item label="Ngày chiếu giờ chiếu">
          <DatePicker format="DD/MM/YYYY hh:mm:ss" showTime onChange={onChangeOkDate} onOk={onChangeOkDate}/>
        </Form.Item>

        <Form.Item label="Giá vé">
          <InputNumber onChange={onchangeInputNumber} />
        </Form.Item>
        <Form.Item label="Chức năng">
          <Button htmlType="submit">Tạo lịch chiếu</Button>
        </Form.Item>
      </Form>
    </div>
  );
}
