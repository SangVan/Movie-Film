import moment from 'moment';
import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { datVeAction, layChiTietPhongVeAction, datGheAction } from '../../redux/actions/QuanLyDatVeActions';
import './Checkout.css';
import { CloseOutlined, UserOutlined, CheckOutlined, HomeOutlined, DownOutlined } from '@ant-design/icons'
import { Tabs, Menu, Dropdown } from "antd";
import { connection } from "../..";
import { ThongTinDatVe } from "../../_core/models/ThongTinDatVe";
import style from "./Checkout.module.css";
import { DAT_GHE, DAT_VE } from '../../redux/actions/types/QuanLyDatVeType';
import { layThongTinUserAction } from '../../redux/actions/QuanLyNguoiDungAction';
import { TOKEN, USER_LOGIN } from "../../util/settings/config";
import { history } from "../../App";
import { NavLink } from 'react-router-dom';
import _ from 'lodash';
import Swal from 'sweetalert2';
function Checkout(props) {

    const { userLogin } = useSelector(state => state.QuanLyNguoiDungReducer);

    const { chiTietPhongVe,danhSachGheKhachDangDat, danhSachGheDangDat } = useSelector(state => state.QuanLyDatVeReducer);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(layChiTietPhongVeAction(props.match.params.id));
        connection.on("datVeThanhCong", () => {
            dispatch(layChiTietPhongVeAction(props.match.params.id));
        });
        connection.invoke("loadDanhSachGhe", props.match.params.id);
        connection.on("loadDanhSachGheDaDat", (dsGheKhachDat) => {
            dsGheKhachDat = dsGheKhachDat.filter(
                (item) => item.taiKhoan !== userLogin.taiKhoan
            );

            let arrGheKhachDat = dsGheKhachDat.reduce((result, item, index) => {
                let arrGhe = JSON.parse(item.danhSachGhe);

                return [...result, ...arrGhe];
            }, []);

            arrGheKhachDat = _.uniqBy(arrGheKhachDat, "maGhe");

            dispatch({
                type: DAT_GHE,
                arrGheKhachDat,
            });
        });

        window.addEventListener("beforeunload", clearGhe);

        return () => {
            clearGhe();
            window.removeEventListener("beforeunload", clearGhe);
        };

    }, []);
    const clearGhe = function (event) {
        connection.invoke("huyDat", userLogin.taiKhoan, props.match.params.id);
    };

    const { thongTinPhim, danhSachGhe } = chiTietPhongVe;
    console.log({ chiTietPhongVe });


    const renderSeats = () => {
        return danhSachGhe.map((ghe, index) => {
            let classGheVip = ghe.loaiGhe === "Vip" ? "gheVip" : "";
            let classGheDaDat = ghe.daDat ? "gheDaDat" : "";
            let classGheDangDat = "";
            let classGheDaDuocDat = "";
            let classGheKhachDangDat = "";
            //Kiểm tra từng ghế render xem có trong mảng ghế đang đặt hay không
            let indexGheDD = danhSachGheDangDat.findIndex(gheDD => gheDD.maGhe === ghe.maGhe);

            if (userLogin.taiKhoan === ghe.taiKhoanNguoiDat) {
                classGheDaDuocDat = 'gheDaDuocDat';
            }

            if (indexGheDD != -1) {
                classGheDaDat = 'gheDangDat';
            }

            let indexGheKDD = danhSachGheKhachDangDat.findIndex(
                (GheKDD) => GheKDD.maGhe === ghe.maGhe
              );
            if (indexGheKDD !== -1) {
                classGheKhachDangDat = "gheKhachDangDat";
            }
            return (<Fragment key={index}>
                <button onClick={() => {
                    dispatch({
                        type: DAT_VE,
                        gheDuocChon: ghe
                    })
                }} className={`ghe ${classGheVip} ${classGheDaDat} ${classGheDangDat} ${classGheDaDuocDat} ${classGheKhachDangDat} text-center`} >
                    {ghe.daDat ? classGheDaDuocDat != '' ? <UserOutlined style={{ marginBottom: 7.5 }} /> : <CloseOutlined style={{ marginBottom: 7.5 }} /> : ghe.stt}
                </button>
                {(index + 1) % 16 === 0 ? <br /> : ''}
            </Fragment>

            );
        });
    };
    return (
        <div className=" min-h-screen mt-5">
            <div className="grid grid-cols-12">
                <div className="col-span-9">
                    <div className="flex flex-col items-center mt-5">
                        <div className="bg-green-300 rounded-lg mt-3" style={{ width: "80%", height: 30 }}>
                            <h1 className="text-white text-center" style={{ lineHeight: "30px" }}>Màn hình</h1>
                        </div>
                        <div className={`${style['trapezoid']} text-center`}></div>
                        <div className="mt-5">{renderSeats()}</div>
                    </div>
                    <div className="mt-5 flex justify-center items-start">
                        <table className=" divide-y divide-gray-200 w-2/3">
                            <thead className="bg-gray-50 p-5">
                                <tr>
                                    <th>Chưa đặt</th>
                                    <th>Đang đặt</th>
                                    <th >VIP</th>
                                    <th className="pl-1">Đã đặt</th>
                                    <th>Bạn đã đặt</th>
                                    <th>Khách khác đang đặt</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                <tr>
                                    <td>
                                        <button className="ghe text-center">
                                            <CheckOutlined style={{ marginBottom: 7.5, fontWeight: "bold" }} />{" "}
                                        </button>{" "}
                                    </td>
                                    <td>
                                        <button className="ghe gheDangDat text-center">
                                            <CheckOutlined style={{ marginBottom: 7.5, fontWeight: "bold" }} />
                                        </button>{" "}
                                    </td>
                                    <td>
                                        <button className="ghe gheVip text-center">
                                            <CheckOutlined style={{ marginBottom: 7.5, fontWeight: "bold" }} />
                                        </button>{" "}
                                    </td>
                                    <td>
                                        <button className="ghe gheDaDat text-center">
                                            {" "} <CloseOutlined style={{ marginBottom: 7.5, fontWeight: "bold" }} />{" "}
                                        </button>{" "}
                                    </td>
                                    <td>
                                        <button className="ghe gheDaDuocDat text-center">
                                            {" "}<UserOutlined style={{ marginBottom: 7.5, fontWeight: "bold" }} />{" "}
                                        </button>{" "}
                                    </td>
                                    <td className="pl-8">
                                        <button className="ghe gheKhachDangDat text-center">
                                            {" "}<CheckOutlined style={{ marginBottom: 7.5, fontWeight: "bold" }} />{" "}
                                        </button>{" "}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="col-span-3 ">
                    <h3 className="text-green-400 text-center text-2xl">Thanh toán</h3>
                    <hr />
                    <h3 className="text-xl">{thongTinPhim?.tenPhim}</h3>
                    <p>Tên cụm rạp : {thongTinPhim.tenCumRap}</p>
                    <p>Địa điểm : {thongTinPhim.diaChi}</p>
                    <p>Ngày chiếu: {thongTinPhim.ngayChieu} -  Giờ chiếu: {thongTinPhim.gioChieu}</p>
                    {/* <p>Giờ chiếu: {moment(thongTinPhim.gioChieu).format('hh:mm A')}</p> */}
                    <hr />
                    <div className="flex flex-row my-5">
                        <div className="w-4/5">
                            <span className="text-red-400 text-lg">Ghế  </span>

                            {_.sortBy(danhSachGheDangDat, ['stt']).map((gheDD, index) => {
                                return <span key={index} className="text-green-500 text-xl"> {gheDD.stt}</span>
                            })}
                        </div>
                        <div className="text-right">
                            <span className="text-green-800 text-lg">
                                {danhSachGheDangDat.reduce((tongTien, ghe, index) => {
                                    return tongTien += ghe.giaVe;
                                }, 0).toLocaleString()}
                            </span>
                            <span>đ</span>
                        </div>
                    </div>
                    <hr />
                    <div className="my-5">
                        <i>Email : </i><br />
                        {userLogin.email}
                    </div>
                    <hr />
                    <div className="my-5">
                        <i>Phone : </i><br />
                        {userLogin.soDT}
                    </div>
                    <hr />
                    <div className="mb-0 h-full flex flex-col justify-start items-center" style={{ marginBottom: 0 }}>
                        <button onClick={() => {

                            const thongTinDatVe = new ThongTinDatVe();
                            thongTinDatVe.maLichChieu = props.match.params.id;
                            thongTinDatVe.danhSachVe = danhSachGheDangDat;
                            if (_.isEmpty(danhSachGheDangDat)) {
                            Swal.fire({
                                title: "Chọn tối thiểu 1 ghế để đặt vé",
                                icon: "error",
                                confirmButtonText: "Đã hiểu",
                            });
                            } else {
                            dispatch(datVeAction(thongTinDatVe));
                            }
                            // console.log(thongTinDatVe);
                            // dispatch(datVeAction(thongTinDatVe));
                        }} className="bg-green-500 text-white w-full text-center py-3 font-bold text-2xl cursor-pointer rounded-xl">
                            ĐẶT VÉ
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}



const { TabPane } = Tabs;

export default function CheckoutTab(props) {
    const { userLogin } = useSelector((state) => state.QuanLyNguoiDungReducer);
    const menu = (
        <Menu>
            <Menu.Item>
                <button onClick={() => { 
                    localStorage.removeItem(USER_LOGIN); 
                    localStorage.removeItem(TOKEN);  
                    history.push('/home');
                    window.location.reload() }}>
                    Đăng xuất
                </button>
            </Menu.Item>
        </Menu>
    );

    const operations = (
        <div className="ml-5">
            {!_.isEmpty(userLogin) ? (
                <div>
                    <NavLink to="/" className="text-black">
                        <HomeOutlined className="text-xl mr-4 hover:text-green-500" style={{marginBottom:9}}  />
                    </NavLink>
                    <Dropdown overlay={menu}>
                        <button className="ant-dropdown-link text-xl" onClick={(e) => e.preventDefault()}>
                            {userLogin.taiKhoan} <DownOutlined />
                        </button>
                       
                    </Dropdown>
                </div>
            ) : ("")}
        </div>
    );

    return (
    
            <div className="mt-2 ml-10 mr-10">
            <Tabs tabBarExtraContent={operations} defaultActiveKey="1">
                <TabPane tab="CHỌN GHẾ VÀ THANH TOÁN" key="1">
                    <Checkout {...props} />
                </TabPane>
                <TabPane tab="LỊCH SỬ ĐẶT VÉ" key="2">
                    <KetQuaDatVe />
                </TabPane>
                {/* <TabPane tab={<NavLink to="/" className="text-xl">Home</NavLink>} key="3">
                </TabPane> */}
            </Tabs>

            </div>
       
    );
}

function KetQuaDatVe() {
    const dispatch = useDispatch();
    const { userData } = useSelector((state) => state.QuanLyNguoiDungReducer);

    useEffect(() => {
        dispatch(layThongTinUserAction());
    }, [dispatch]);

    const renderTicketItem = function () {
        return userData.thongTinDatVe?.map((ticket, index) => {
            const seats = _.first(ticket.danhSachGhe);

            return (
                <div className="p-2 lg:w-1/3 md:w-1/2 w-full" key={index}>
                    <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
                        <img alt="team" className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4" src={ticket.hinhAnh} />
                        <div className="flex-grow">
                            <h2 className="text-pink-500 title-font font-medium text-2xl">
                                {ticket.tenPhim}
                            </h2>
                            <p className="text-gray-500">
                                <span className="font-bold">Giờ chiếu:</span>{" "}
                                {moment(ticket.ngayDat).format("hh:mm A")} -{" "}
                                <span className="font-bold">Ngày chiếu:</span>{" "}
                                {moment(ticket.ngayDat).format("DD-MM-YYYY")} .
                            </p>
                            <p>
                                <span className="font-bold">Địa điểm:</span>{" "}
                                {seats.tenHeThongRap} -
                                <span className="font-bold"> Số rạp:</span> {seats.tenCumRap}
                            </p>
                            <span className="font-bold">Ghế đã đặt: </span>
                            {ticket.danhSachGhe.map((ghe, index) => {
                                return (<span className="text-green-500 text-xl" key={index}>
                                    {`${ghe.tenGhe}, `}
                                </span>
                                );
                            })}
                        </div>
                    </div>
                </div>
            );
        });
    };

    return (
        <div className="p-5">
            <section className="text-gray-600 body-font">
                <div className="container px-5  mx-auto">
                    <div className="flex flex-col text-center w-full mb-20">
                        <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4  text-purple-600 ">
                            Lịch sử đặt vé của bạn
                        </h1>
                        <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
                            Xem lại danh sách các vé đã đặt và thời gian để không bõ lỡ phút
                            giây nào của phim bạn nhé!
                        </p>
                    </div>
                    <div className="flex flex-wrap -m-2">{renderTicketItem()}</div>
                </div>
            </section>
        </div>
    );
}
