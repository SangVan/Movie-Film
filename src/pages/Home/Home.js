import React, { useEffect } from 'react';
import HomeMenu from './HomeMenu/HomeMenu';
//Kết nối redux
import { useSelector,useDispatch } from 'react-redux';
import Film from '../../components/Film/Film';
import MultipleRowSclick from '../../components/RSlick/MultipleRowSclick';
import { layDanhSachPhimAction } from '../../redux/actions/QuanLyPhimActions';
import { layDanhSachHeThongRapAction } from '../../redux/actions/QuanLyRapActions';
import HomeCarousel from '../../templates/HomeTemplate/Layout/HomeCarousel/HomeCarousel';
import UserModal from "../../components/Modal/UserModal"

export default function Home(props) {

    const {arrFilm} = useSelector(state => state.QuanLyPhimReducer);
    const {heThongRapChieu} = useSelector(state => state.QuanLyRapReducer);
    const dispatch = useDispatch();
    console.log('propsName',props);

    // const renderFilms =()=>{
    //     return arrFilm.map((phim,index)=>{
    //         return  <Film key={index} />

    //     })
    // }

    useEffect(()=>{
        const action = layDanhSachPhimAction();
        dispatch(action);

        dispatch(layDanhSachHeThongRapAction());

    },[])
    return (
        <div >
            {/* <MultipleRowSclick /> */}
            <HomeCarousel />
            {/* <UserModal /> */}
          <div className='container'>
          <section className="text-gray-600 body-font">
                <div className="container px-5 py-24 mx-auto">
                    <MultipleRowSclick arrFilm={arrFilm} />
                    {/* <MultipleRowS /> */}
                    {/* <div className="flex flex-wrap -m-4" style={{justifyContent:'center'}}>
                        {renderFilms()}
                    </div>  */}
                </div>
            </section>
          </div>

            <div className='mx-6'>
                <HomeMenu heThongRapChieu={heThongRapChieu} />
            </div>
        </div>
    );
}

