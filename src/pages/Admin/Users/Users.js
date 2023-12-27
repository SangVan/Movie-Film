import React, { useEffect, useRef, useState } from "react";
import { AutoComplete, Button, Popconfirm, Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  layDanhSachNguoiDungAction,
  timKiemNguoiDungAction,
  xoaNguoiDungAction,
} from "../../../redux/actions/QuanLyNguoiDungAction";
import { NavLink } from "react-router-dom";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { history } from "../../../App";

export default function Users() {
  
  const { arrUser } = useSelector((state) => state.QuanLyNguoiDungReducer);
  const { arrUserSearch } = useSelector(
    (state) => state.QuanLyNguoiDungReducer
  );
  const [value, setValue] = useState("");
  const searchRef = useRef(null);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(layDanhSachNguoiDungAction());
  }, [dispatch]);

  const columns = [
    {
      title: "Tài khoản",
      dataIndex: "taiKhoan",
    },
    {
      title: "Họ và Tên",
      dataIndex: "hoTen",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Số điện thoại",
      dataIndex: "soDt",
    },

    {
      title: "Mật khẩu",
      dataIndex: "matKhau",
    },
    {
      title: "Hành động",
      dataIndex: "hanhDong",
      render: (text, user) => {
        return (
          <div>
            <NavLink key={1} className=" mr-2  text-2xl" to={`/admin/users/edit/${user.taiKhoan}`}>
              <EditOutlined style={{ color: "blue" }} />{" "}
            </NavLink>

            <Popconfirm title="Bạn chắc chắn muốn xoá người dùng này" onConfirm={() => {
                dispatch(xoaNguoiDungAction(user.taiKhoan));
              }} cancelText="Huỷ"
              okText="Chắn chắn" >
              <span className="btn btn-danger">
                <DeleteOutlined
                  style={{ fontSize: 24, color: "red", cursor: "pointer" }}
                />
              </span>
            </Popconfirm>
          </div>
        );
      },
      sortDirections: ["descend", "ascend"],
    },
  ];

  function onChange(pagination, filters, sorter, extra) {
    console.log("params", pagination, filters, sorter, extra);
  }

  return (
    <div>
      <div className="flex justify-between">
        <h3 className="text-4xl text-blue-400 mb-5">Quản lý người dùng</h3>

        <Button className="mb-5 pb-2" onClick={() => {
          history.push("/admin/users/addnew");
          }} type="danger" shape="round" icon={<PlusOutlined />} size={"large"}>
            Thêm người dùng mới
        </Button>
      </div>
      <AutoComplete className="mb-5 w-25" placeholder="Nhập vào tài khoản người dùng cần tìm" value={value}
        onChange={(text) => {
          setValue(text);
        }}
        options={arrUserSearch?.map((user, index) => {
          return {
            key: index,
            label: user.taiKhoan,
            value: user.taiKhoan,
          };
        })}
        onSelect={(valueSelect, option) => {
          setValue(option.label);
          dispatch(timKiemNguoiDungAction(valueSelect));
        }}
        onSearch={(value) => {
          if (searchRef.current) {
            clearTimeout(searchRef.current);
          }
          searchRef.current = setTimeout(() => {
            if (value === "") {
              dispatch(layDanhSachNguoiDungAction());
            } else {
              dispatch(timKiemNguoiDungAction(value));
            }
          }, 800);
        }}
        style={{ width: "100%", height: 40 }}
      />
      <Table columns={columns} dataSource={arrUser} onChange={onChange} />
    </div>
  );
}
