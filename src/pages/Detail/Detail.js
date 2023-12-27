import React, { useEffect, useState } from 'react'
import { CustomCard } from '@tsamantanis/react-glassmorphism'
import '@tsamantanis/react-glassmorphism/dist/index.css'
import '../../assets/styles/circle.css'

import { Radio, Space, Tabs, Rate, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { layThongTinChiTietPhim } from '../../redux/actions/QuanLyRapActions';
import moment from 'moment';
import { NavLink } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import {PlayCircleOutlined} from "@ant-design/icons"
const { TabPane } = Tabs;
export default function Detail(props) {

  const filmDetail = useSelector(state => state.QuanLyPhimReducer.filmDetail);
  const [show, setShow] = useState(false);
  console.log('filmDetail',filmDetail);
  const dispatch = useDispatch();

  useEffect(() => {
    let { id } = props.match.params;

    dispatch(layThongTinChiTietPhim(id))


  });

  return (
    <div   style={{ backgroundImage: `url(${filmDetail.hinhAnh})`, backgroundSize: 'cover', backgroundPosition: 'center', minHeight: '100vh' }} >
      <CustomCard
        style={{ paddingTop: 150, minHeight: '100vh' }}
        effectColor="#fff" // required
        color="fff" // default color is white
        blur={5} // default blur value is 10px
        borderRadius={0} // default border radius value is 10px
      >
        <div className='grid grid-cols-12'>
          <div className='col-span-5 col-start-3'>
            <div className='grid grid-cols-3 '>
              <img className='col-span-1 cursor-pointer'  src={filmDetail.hinhAnh} style={{ widt:'100%', height: 300 }} alt='123' />
              {/* <button onClick={() => setShow(true)} className="play-btn-carousel">
                  <PlayCircleOutlined style={{ width: '100%', height: 300 }}/>
              </button> */}

              <div className='col-span-2 ml-5 text-white' style={{ marginTop: '10%' }}>
                <p className='text-sm'>Ngày chiếu : {moment(filmDetail.ngayKhoiChieu).format('DD.MM.YYYY')}</p>
                <p className='text-2xl '>{filmDetail.tenPhim}</p>
                <p> {filmDetail.moTa?.length > 50 ? filmDetail.moTa.substr(0, 200) + " ..." : filmDetail.moTa}</p>
                {/* <p>{filmDetail.moTa}</p> */}
              </div>
              <Button onClick={() => setShow(true)} className="mb-5 pb-2 mt-3"  type="danger" shape="round" size={"large"} >
                  Trailer
                </Button>
            </div>
          </div>
          <div className='col-span-4 mr-2'>
            <div style={{ marginLeft: '15%', color: 'yellow', fontWeight: 'bold', fontSize: 15 }}>Đánh giá</div>
            <h1 style={{ marginLeft: '5%' }} className="text-green-400 text-2xl"> <Rate
              allowHalf
              value={filmDetail.danhGia / 2}
              style={{ fontSize: 30 }}
            /></h1>
            <div className={`c100 p${filmDetail.danhGia * 10} big`}>
              <span className='text-white'>{filmDetail.danhGia * 10}%</span>
              <div className="slice">
                <div className="bar"></div>
                <div className="fill"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-10 container ml-60 w-2/3  bg-white px-5 py-5">
          <Tabs defaultActiveKey='1' centered>
            <TabPane tab="Lịch chiếu" key="1" style={{minHeight:300}}>
              <div>
                <Tabs tabPosition={'left'} >
                  {filmDetail.heThongRapChieu?.map((htr, index) => {
                    return <TabPane
                      tab={<div>
                        <img src={htr.logo} className="rounded-full" width={50} alt={htr.logo} />
                        {htr.tenHeThongRap}
                      </div>}
                      key={index}>
                      {htr.cumRapChieu?.map((cumRap,index)=>{
                        return <div className='mt-5' key={index}>
                            <div className='flex flex-row'>
                                <img style={{width:50,height:50}} src="https://picsum.photos/250/200"  alt="123"/>
                                <div className='ml-2'>
                                    <p style={{fontWeight:'bold',fontSize:20,lineHeight:1}} >{cumRap.tenCumRap}</p>
                                    <p className='text-green-300' style={{marginTop:0}}>{cumRap.tenCumRap}</p>
                                    {cumRap.lichChieuPhim?.slice(0,12).map((lichChieu,index)=>{
                                    return <NavLink to={`/checkout/${lichChieu.maLichChieu}`} key={index} className="col-span-1 text-green-800 hover:text-red-500 font-bold  border border-green-800-600 hover:border-red-500 p-2 text-center rounded-lg">
                                        {moment( lichChieu.ngayChieuGioChieu).format('hh:mm A')}
                                    </NavLink>
                                  })}
                                </div>
                            </div>
                            {/* <div className='thong-tin-lich-chieu grid grid-cols-4'>
                                  {cumRap.lichChieuPhim?.slice(0,12).map((lichChieu,index)=>{
                                    return <NavLink to={`/checkout/${lichChieu.maLichChieu}`} key={index} className="col-span-1 text-green-800 hover:text-red-500 font-bold  border border-green-800-600 hover:border-red-500 p-1 text-center rounded-lg">
                                        {moment( lichChieu.ngayChieuGioChieu).format('hh:mm A')}
                                    </NavLink>
                                  })}
                            </div> */}
                        </div>
                      })}
                    </TabPane>
                  })}
                </Tabs>
              </div>
            </TabPane>

            <TabPane tab="Thông tin" key="2" style={{minHeight:300}}>
             <h1> Thông tin phim : </h1>
              <p>{filmDetail.moTa}</p>
            </TabPane>
            {/* <TabPane tab="Đánh giá" key="3" style={{minHeight:300}}>
                <div style={{ marginLeft: '15%', color: 'green', fontWeight: 'bold', fontSize: 15 }}>Đánh giá</div>
                <h1 style={{ marginLeft: '5%' }} > <Rate className="text-green-400 text-2xl"
                  allowHalf
                  value={filmDetail.danhGia / 2}
                  style={{ fontSize: 30 }}
                /></h1>
            </TabPane> */}
          </Tabs>
        </div>

      </CustomCard>
       <CSSTransition in={show} unmountOnExit timeout={{ enter: 0, exit: 300 }}>
       <div className="modal " onClick={() => setShow(false)}>
          <iframe title="title1" allowfullscreen="true" width="994px" height="500px"
          src={filmDetail.trailer} frameborder="0" ></iframe>
          </div>
          {/* <iframe width="560" height="315" src="https://www.youtube.com/embed/G1Mrk6pFqVI" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> */}
       </CSSTransition>
    </div>
  )
}
