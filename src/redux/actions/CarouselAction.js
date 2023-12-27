
import axios from 'axios';
import { DOMAIN } from '../../util/settings/config';
import { SET_CAROUSE } from './types/CarouselType';
import {quanLyPhimService} from '../../services/QuanLyPhimService'

export const getCarouselAction = () =>{
    return async(dispatch) =>{
        try {
            // const result = await axios({
            //     url:`${DOMAIN}/api/QuanLyPhim/LayDanhSachBanner`,
            //     method:'GET'
            // });

            const result = await quanLyPhimService.layDanhSachBanner();
            
            dispatch({
                type: SET_CAROUSE,
                arrImg:result.data.content
            })
        } catch (errors) {
            console.log('errors',errors);
        }
    };

}