// import React, { useState } from 'react';
// import { Radio, Space, Tabs } from 'antd';


// const { TabPane } = Tabs;
// export default class HomeMenu extends React.Component {
//     state= {
//         tabPosition: 'left',
//     };

//     changeTabPosition = e => {
//         this.setState({ tabPosition: e.target.value });
//     };
//     render(){
//         const { tabPosition } = state;
//         return (
//             <>
//                 {/* <Space style={{ marginBottom: 24 }}>
//                     Tab position:
//                     <Radio.Group value={tabPosition} onChange={changeTabPosition}>
//                         <Radio.Button value="top">top</Radio.Button>
//                         <Radio.Button value="bottom">bottom</Radio.Button>
//                         <Radio.Button value="left">left</Radio.Button>
//                         <Radio.Button value="right">right</Radio.Button>
//                     </Radio.Group>
//                 </Space> */}
//                 <Tabs tabPosition={tabPosition}>
//                     <TabPane tab={ <img src="https://picsum.photos/100" className="rounded-full" />} key="1">

//                     </TabPane>
//                     <TabPane tab={ <img src="https://picsum.photos/100" className="rounded-full" />} key="2">

//                     </TabPane>
//                     <TabPane tab={ <img src="https://picsum.photos/100" className="rounded-full" />} key="3">

//                     </TabPane>
//                 </Tabs>
//             </>

//         );
//     }

// }

import React from "react";
import { Tabs } from "antd";
import { NavLink } from "react-router-dom";
import moment from "moment";
import '../../../App.css';
const { TabPane } = Tabs;

export default class Demo extends React.PureComponent {
    state = {
        tabPosition: "left",
    };

    changeTabPosition = (e) => {
        this.setState({ tabPosition: e.target.value });
    };

    renderHeThongRap = () => {
        return this.props.heThongRapChieu?.map((heThongRap, index) => {
            let { tabPosition } = this.state;
            return (
                <TabPane style={{ height: "600px" }} tab={<img alt="" src={heThongRap.logo} className="rounded-full" width="50" />} key={index} >
                    <Tabs tabPosition={tabPosition}> {heThongRap.lstCumRap.slice(0,6)?.map((cumRap, index) => {
                        return (
                            <TabPane tab={<div style={{ width: "320px", display: "flex", }}>
                                <img className="rounded-lg" alt="" src="https://s3img.vcdn.vn/123phim/2018/09/ddc-dong-da-15379624326697.jpg" width="50" />
                                <div className="cursor-pointer text-left ml-3">
                                    {cumRap.tenCumRap}
                                </div>
                            </div>
                            } key={index} >
                                {cumRap.danhSachPhim.slice(0, 3).map((phim, index) => {
                                    return (
                                        <div key={index}>
                                            <div className="py-4">
                                                <div style={{ display: "flex" }}>
                                                    <img className="mr-2" style={{ height: 75, width: 75, borderRadius: 12, }} src={phim.hinhAnh} alt={phim.tenPhim}
                                                        onError={(e) => {
                                                            e.target.onerror = null;
                                                            e.target.src = "https://picsum.photos/75/75";
                                                        }}
                                                    />

                                                    <div className="ml-2">
                                                        <h1 className="text-lg ">
                                                            <span className="text-white text-sm bg-yellow-400 px-1 py-0.5 mr-2 rounded-md">
                                                                C13
                                                            </span>
                                                            {phim.tenPhim}
                                                        </h1>
                                                        <p className="text-gray-400">{cumRap.diaChi}</p>
                                                        <div className="grid grid-cols-4 gap-3">
                                                            {phim.lstLichChieuTheoPhim?.slice(0, 8).map((lichChieu, index) => {
                                                                return (
                                                                    <NavLink className="text-1xl mua-ve hover:text-yellow-500 border border-indigo-600 hover:border-yellow-500 p-1 rounded-md" to={`/checkout/${lichChieu.maLichChieu}`} key={index} >
                                                                        {moment( lichChieu.ngayChieuGioChieu).format("hh:mm A")}
                                                                    </NavLink>
                                                                );
                                                            })}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <hr />
                                        </div>
                                    );
                                })}
                            </TabPane>
                        );
                    })}
                    </Tabs>
                </TabPane>
            );
        });
    };

    render() {
        const { tabPosition } = this.state;
        return (
            <>
                <div className="container mb-20">
                    <Tabs tabPosition={tabPosition}>
                        {this.renderHeThongRap()}
                    </Tabs>
                </div>
            </>
        );
    }
}
